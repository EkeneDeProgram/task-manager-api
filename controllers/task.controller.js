// Import the in-memory task manager module
const taskManager = require("../models/task.model");

// Controller to get all tasks, optionally filtered by status and paginated
exports.getAllTasks = (req, res) => {
  // Clone all tasks to avoid mutating the original
  let results = [...taskManager.tasks];

  // Extract query parameters for status filtering and pagination
  const { status, page = 1, limit = 10 } = req.query;

  // If a status filter is provided (e.g., "pending" or "completed"), filter the tasks
  if (status) {
    results = results.filter((t) => t.status === status);
  }

  // Calculate pagination start index
  const start = (page - 1) * limit;

  // Get the paginated subset of results
  const paginated = results.slice(start, start + +limit); // `+limit` ensures it's treated as a number

  // Send the response with pagination metadata and the filtered task data
  res.json({
    total: results.length, // total tasks after filtering
    page: +page,           // current page
    limit: +limit,         // limit per page
    data: paginated,       // actual tasks returned
  });
};

// Controller to get a single task by its ID
exports.getTaskById = (req, res, next) => {
  try {
    // Find the task by ID
    const task = taskManager.findTask(req.params.id);

    // If the task is not found, return 404 error
    if (!task) {
      const error = new Error("Task not found");
      error.status = 404;
      return next(error); // Pass the error to the error handling middleware
    }

    // Return the task if found
    res.json(task);
  } catch (err) {
    // Handle unexpected errors
    next(err);
  }
};

// Controller to create a new task
exports.createNewTask = (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Use task manager to create a new task
    const task = taskManager.createTask({ title, description });

    // Return the new task with 201 Created status
    res.status(201).json(task);
  } catch (err) {
    // Forward any unexpected errors
    next(err);
  }
};

// Controller to update an existing task by ID
exports.updateTaskById = (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    // Use task manager to update the task
    const task = taskManager.updateTask(req.params.id, { title, description, status });

    // If the task is not found, return 404 error
    if (!task) {
      const error = new Error("Task not found");
      error.status = 404;
      return next(error);
    }

    // Return the updated task
    res.json(task);
  } catch (err) {
    // Forward errors to error handler
    next(err);
  }
};

// Controller to delete a task by its ID
exports.deleteTaskById = (req, res, next) => {
  try {
    // Delete the task using the task manager
    const deleted = taskManager.deleteTask(req.params.id);

    // If no task was deleted, it means it wasn't found
    if (!deleted) {
      const error = new Error("Task not found");
      error.status = 404;
      return next(error);
    }

    // If successfully deleted, return 204 No Content
    res.status(204).send();
  } catch (err) {
    // Forward any unexpected errors
    next(err);
  }
};
