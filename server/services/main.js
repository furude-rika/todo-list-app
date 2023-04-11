import config from 'config'
import Task from '../models/Task.js'
import User from '../models/User.js'

const getTasksService = async (userId) => {
  try {
    const tasks = await Task.find({ user: userId })
    return tasks
  } catch (err) {
    throw new Error(config.get('serverErrorMessage'))
  }
}

const createTaskService = async (task, userId) => {
  const newTask = new Task({
    description: task,
    user: userId
  })

  try {
    await newTask.save()

    const user = await User.findOne({ _id: userId })
    user.tasks.push({ taskId: newTask._id })
    await user.save()

    const allUserTasks = await getTasksService(userId)
    return allUserTasks
  } catch (err) {
    throw new Error(config.get('serverErrorMessage'))
  }
}

const deleteTaskService = async (taskId, userId) => {
  try {
    await Task.findByIdAndRemove(taskId)

    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { tasks: { taskId: taskId } } },
      { new: true }
    )

    return true
  } catch (err) {
    throw new Error(config.get('serverErrorMessage'))
  }
}

export {
  getTasksService,
  createTaskService,
  deleteTaskService
}