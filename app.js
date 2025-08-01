// Import the Express module to create the server
const express = require("express");
const app = express(); // Initialize an Express application

// Import route handlers and middlewares
const taskRoutes = require("./routes/task.routes"); // Routes for handling task-related requests
const logger = require("./middlewares/logger"); // Custom middleware for logging requests
const errorHandler = require("./middlewares/errorHandler"); // Custom middleware for handling errors

// Swagger setup
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

app.use(express.json());
app.use(logger);

// Serve Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Routes
app.use("/tasks", taskRoutes);

// Error handling
app.use(errorHandler);

// Define a route handler for the root URL ("/") of the API
app.get("/", (req, res) => {
  // Respond with a simple message indicating the API is live
  res.send("Task Manager API is live!");
});

// Export the Express application instance
module.exports = app;
