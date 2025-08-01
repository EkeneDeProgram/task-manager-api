// Import the Swagger UI middleware for Express
const swaggerUI = require("swagger-ui-express");

// Import the YAML parser to load the OpenAPI docs from a .yaml file
const yaml = require("yamljs");

// Import the 'path' module to safely handle file paths across different environments
const path = require("path");

// Load the YAML-based OpenAPI documentation file (task.yaml) from the current directory
const swaggerSpec = yaml.load(path.join(__dirname, "task.yaml"));

// Export the loaded Swagger specification so it can be used in the main app (e.g., in app.js)
module.exports = swaggerSpec;

