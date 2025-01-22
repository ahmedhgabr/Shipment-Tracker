# Shipment Tracking Page

A single page React application for tracking shipments, allowing users to view shipment details and monitor delivery progress.

## Setup
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the application
4. Open `http://localhost:5173` in your browser

## Features

### Shipment Search
- A search bar where users can input a Shipment Tracking Number to retrieve shipment details.

### Shipment Details
- Display shipment information after searching

### Delivery Timeline
- Display a progress timeline for the shipment stages.
- Visually highlight the current stage and its timestamp.

### Localization
- Add support for multiple languages, starting with English and Arabic.

### Error Handling
- Provide a user-friendly error message for invalid or missing tracking numbers.
- Handle network errors gracefully with fallback UI elements or notifications.

### API Integration
- Use the provided mock API to fetch shipment data based on the tracking number
- Tracking Number Samples: `36406704`, `69171493`, `7234258`, `9442984`, `1094442`.

### Styling and Responsiveness
- The application is styled and responsive for various screen sizes.

