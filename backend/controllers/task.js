const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  const task = await Task.create({ title, description, priority, userId: req.user });
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.userId.toString() !== req.user) return res.status(404).json({ message: 'Task not found' });

  task.status = task.status === 'complete' ? 'incomplete' : 'complete';
  await task.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.userId.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

