// Import the UUID library to generate unique task IDs
const { v4: uuidv4 } = require("uuid");

// Task class defines the structure and behavior of an individual task
class Task {
  constructor({ title, description = "" }) {
    this.id = uuidv4(); // Generate a unique ID for the task
    this.title = title; // Required task title
    this.description = description; // Optional task description
    this.status = "pending"; // Default status for new tasks
    this.createdAt = new Date(); // Timestamp when the task is created
    this.updatedAt = new Date(); // Timestamp when the task was last updated
  }

  // Update the task properties with new data
  update(data) {
    if (data.title !== undefined) this.title = data.title; // Update title if provided
    if (data.description !== undefined) this.description = data.description; // Update description if provided
    if (data.status !== undefined) this.status = data.status; // Update status if provided
    this.updatedAt = new Date(); // Update the updatedAt timestamp
  }
}

// TaskManager class handles storing and managing multiple tasks in memory
class TaskManager {
  constructor() {
    this.tasks = []; // Initialize an empty array to store tasks
  }

  // Create and add a new task to the list
  createTask({ title, description }) {
    const newTask = new Task({ title, description }); // Create new Task instance
    this.tasks.push(newTask); // Add task to the internal array
    return newTask; // Return the created task
  }

  // Find a task by its ID
  findTask(id) {
    return this.tasks.find((task) => task.id === id); // Return the task if found, otherwise undefined
  }

  // Update a task's data by ID
  updateTask(id, data) {
    const task = this.findTask(id); // Find task to update
    if (!task) {
      throw new Error(`Task with ID ${id} not found`); // Throw error if not found
    }

    task.update(data); // Use the task's update method to apply changes
    return task; // Return the updated task
  }

  // Delete a task by ID
  deleteTask(id) {
    const index = this.tasks.findIndex((task) => task.id === id); // Find index of task
    if (index === -1) {
      throw new Error(`Task with ID ${id} not found`); // Throw error if not found
    }

    this.tasks.splice(index, 1); // Remove task from array
    return true; // Indicate successful deletion
  }
}

// Export a single shared instance of TaskManager
module.exports = new TaskManager();
