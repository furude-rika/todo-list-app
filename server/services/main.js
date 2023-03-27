const Task = require('../models/Task')
const User = require('../models/User')

async function getTasks(userId) {
  try {
    const tasks = await Task.find({ user: userId })
    return tasks
  } catch (err) {
    throw new Error('Something went wrong')
  }
}

async function createTask(task, userId) {
  const newTask = new Task({
    description: task,
    user: userId
  })

  try {
    await newTask.save()

    const user = await User.findOne({ _id: userId })
    user.tasks.push({ taskId: newTask._id })
    await user.save()

    const allUserTasks = await getTasks(userId)
    return allUserTasks
  } catch (err) {
    throw new Error('Something went wrong')
  }
}

async function deleteTask(taskId, userId) {
  try {
    await Task.findByIdAndRemove(taskId)

    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { tasks: { taskId: taskId } } },
      { new: true }
    )

    return true
  } catch (err) {
    throw new Error('Something went wrong')
  }
}

module.exports = {
  getTasks,
  createTask,
  deleteTask
}
