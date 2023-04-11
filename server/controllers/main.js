import config from 'config'
import httpStatus from 'http-status'
import { getTasksService, createTaskService, deleteTaskService } from '../services/main.js'

const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksService(req.user.userId)
    res.status(httpStatus.OK).json({ tasks })
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message })
  }
}

const createTask = async (req, res) => {
  try {
    const tasks = await createTaskService(req.body.task, req.user.userId)
    res.status(httpStatus.CREATED).json({ tasks })
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const isDeleted = await deleteTaskService(req.body.id, req.user.userId)
    if (isDeleted) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(httpStatus.OK).json({ message: config.get('deleteTaskMessage') })
    }
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message })
  }
}

export {
  getTasks,
  createTask,
  deleteTask
}