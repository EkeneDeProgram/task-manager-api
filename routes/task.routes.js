// Import Express
const express = require("express");
const router = express.Router(); // Create a new router instance

// Import controller methods for task operations
const taskController = require("../controllers/task.controller");

// Import validation middleware for request data
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../utils/validateTask");

// Route to get all tasks
router.get("/", taskController.getAllTasks);

// Route to get a specific task by ID
router.get("/:id", taskController.getTaskById);

// Route to create a new task with validation
router.post("/", validateCreateTask, taskController.createNewTask);

// Route to update a task by ID with validation
router.put("/:id", validateUpdateTask, taskController.updateTaskById);

// Route to delete a task by ID
router.delete("/:id", taskController.deleteTaskById);

// Export the router so it can be used in the main app
module.exports = router;
