// Define a middleware function 'logger'
// It logs the HTTP method and URL of each request along with a timestamp
const logger = (req, res, next) => {
  // Get the current time in ISO string format
  const time = new Date().toISOString();
    
  // Log the request method and original URL with the timestamp
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
};

// Export the logger function
module.exports = logger;
