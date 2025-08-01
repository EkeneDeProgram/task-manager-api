// Define an error-handling middleware function
// It catches errors passed with next(err) or thrown in async handlers
const errorHandler = (err, req, res, next) => {
  // Log the full error stack trace to the console
  console.error(err.stack);

  // Set the response status code
  const status = err.status || 500;
  
  // Send a JSON response with the error message
  res.status(status).json({
    error: err.message || "Internal Server Error",
  });
};

// Export the errorHandler function
module.exports = errorHandler;
