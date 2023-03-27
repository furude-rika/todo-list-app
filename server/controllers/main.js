const tasksService = require('../services/main')

async function getTasks(req, res) {
  try {
    const tasks = await tasksService.getTasks(req.user.userId)
    res.status(200).json({ tasks })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function createTask(req, res) {
  try {
    const tasks = await tasksService.createTask(req.body.task, req.user.userId)
    res.status(201).json({ tasks })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function deleteTask(req, res) {
  try {
    const isDeleted = await tasksService.deleteTask(req.body.id, req.user.userId)
    if (isDeleted) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(200).json({ message: 'Task was removed' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getTasks,
  createTask,
  deleteTask
}
