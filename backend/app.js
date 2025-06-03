require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const app = express();

app.use(express.json());
app.use(cors()); 

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; 
const LLM_URL = process.env.LLM_URL; 

async function callLLM(userPrompt) {
  const payload = {
    model: "llama3",
    system: "Answer concisely and directly. Provide the exact name of one place where the requested item can be found.",
    prompt: userPrompt,
    stream: false
  };

  const response = await axios.post(LLM_URL, payload, {
    headers: { 'Content-Type': 'application/json' }
  });

  console.log('LLM Response:', response.data); 

  if (response.data && response.data.response) {
    return response.data.response.trim(); 
  }
  throw new Error('LLM did not return a valid response');
}

async function getPlaceDetails(placeName) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
  const params = {
    query: placeName,
    key: GOOGLE_API_KEY,
  };

  const response = await axios.get(url, { params });
  console.log(`Google Places API response for "${placeName}":`, response.data);

  if (response.data.status === 'OK' && response.data.results.length > 0) {
    return response.data.results[0]; 
  }
  throw new Error(`Place not found for query: ${placeName}`);
}

app.post('/search', async (req, res) => {
  try {
    const userPrompt = req.body.prompt;
    if (!userPrompt) return res.status(400).json({ error: 'Prompt required' });

    const placeSuggestion = await callLLM(userPrompt);
    console.log(`Place suggestion from LLM: ${placeSuggestion}`);

    const placeDetails = await getPlaceDetails(placeSuggestion);

    const placeId = placeDetails.place_id;
    const name = placeDetails.name;
    const location = placeDetails.geometry.location;

    const mapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=place_id:${placeId}`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}&travelmode=driving`;

    res.json({
      placeName: name,
      mapsEmbedUrl,
      directionsUrl
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.BACKEND_PORT || 4000; 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});