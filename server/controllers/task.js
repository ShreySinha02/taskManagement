const Task = require('../models/task');

// Create a new task
const handleCreateTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task', message: error.message });
  }
};

// Delete a task
const handleDeleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task', message: error.message });
  }
};

// Create a subtask
const handleCreateSubTask = async (req, res) => {
  try {
    const { taskId, subtask } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $push: { subtasks: subtask } },
      { new: true }
    );
    res.status(201).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error creating subtask', message: error.message });
  }
};

// Delete a subtask
const handleDeleteSubTask = async (req, res) => {
  try {
    const { taskId, subtaskId } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $pull: { subtasks: { _id: subtaskId } } },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting subtask', message: error.message });
  }
};

// Add an assignee to a task
const handleAddAssignee = async (req, res) => {
  try {
    const { taskId, assignee } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $push: { assignedTo: assignee } },
      { new: true }
    );
    res.status(201).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error adding assignee', message: error.message });
  }
};

// Delete an assignee from a task
const handleDeleteAssignee = async (req, res) => {
  try {
    const { taskId, assigneeId } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $pull: { assignedTo: { _id: assigneeId } } },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting assignee', message: error.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving tasks', message: error.message });
  }
};

// Get a task by ID, including subtasks and activities
const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId).populate('subtasks activities');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving task', message: error.message });
  }
};

// Get subtasks by task ID
const getSubtasksByTaskId = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId).select('subtasks');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task.subtasks);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving subtasks', message: error.message });
  }
};

// Get activities by task ID
const getActivitiesByTaskId = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId).select('activities');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task.activities);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving activities', message: error.message });
  }
};

module.exports = {
  handleCreateTask,
  handleDeleteTask,
  handleCreateSubTask,
  handleDeleteSubTask,
  handleAddAssignee,
  handleDeleteAssignee,
  getTasks,
  getTaskById,
  getSubtasksByTaskId,
  getActivitiesByTaskId,
};
