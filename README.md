# Map Project

This project is a web application that allows users to search for places based on their prompts and view them on a map. It consists of a frontend interface and a backend API that integrates with the Google Maps Places API.

## Project Structure

```
map-project
├── frontend
│   ├── index.html        # HTML structure for the user interface
│   └── styles
│       └── style.css     # CSS for styling the frontend UI
├── backend
│   ├── app.js            # Main entry point for the backend application
│   ├── package.json      # Configuration file for npm
│   └── .env              # Environment variables (e.g., Google Maps API key)
└── README.md             # Documentation for the project
```

## Setup Instructions

### Frontend

1. Navigate to the `frontend` directory.
2. Open `index.html` in a web browser to view the application.

### Backend

1. Navigate to the `backend` directory.
2. Create a `.env` file and add your Google Maps API key:
   ```
   GOOGLE_MAPS_API_KEY=your_api_key_here
   ```
3. Install the required dependencies:
   ```
   npm install
   ```
4. Start the backend server:
   ```
   node app.js
   ```

## Usage

1. Enter a prompt in the input field (e.g., "Find me a sushi place nearby").
2. Click the "Search" button.
3. The application will display the suggested place name, an embedded Google Maps iframe, and a link for directions.

## Notes

- Ensure that you have a valid Google Maps API key and that it is enabled for the Places API.
- The local LLM output is currently simulated; consider integrating an actual LLM for real-time suggestions.