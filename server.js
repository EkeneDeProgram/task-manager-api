// Import the Express app from the app.js file
const app = require("./app");

// Set the port for the server, defaulting to 3000 if not specified in environment variables
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message indicating that the server is up and running
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

