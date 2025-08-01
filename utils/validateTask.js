// Define the allowed task statuses
const validStatuses = ["pending", "in-progress", "completed"];

/**
 * Logic to validate task creation input
 */
const validateCreateTask = (req, res, next) => {
  const { title, description } = req.body;

  // Validate that the title exists, is a string, and is not empty
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required and must be a non-empty string" });
  }

  // If description is provided, validate that it is a string
  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ error: "Description must be a string if provided" });
  }

  // Pass control to the next middleware or route handler
  next();
};

/**
 * Logic to validate task update input
 */
const validateUpdateTask = (req, res, next) => {
  const { title, description, status } = req.body;

  // Require at least one field to be updated
  if (!title && !description && !status) {
    return res.status(400).json({ error: "At least one field (title, description, or status) must be provided for update" });
  }

  // If title is provided, ensure it's a non-empty string
  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({ error: "Title must be a non-empty string if provided" });
  }

  // If description is provided, ensure it's a string
  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ error: "Description must be a string if provided" });
  }

  // If status is provided, ensure it's one of the valid statuses
  if (status !== undefined && !validStatuses.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(", ")}` });
  }

  // Pass control to the next middleware or route handler
  next();
};

// Export the functions
module.exports = {
  validateCreateTask,
  validateUpdateTask,
};
