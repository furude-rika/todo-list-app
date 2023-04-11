import User from '../models/User.js'
import Task from '../models/Task.js'

const changePasswordService = async (user, hashedPassword) => {
  user.password = hashedPassword
  await user.save()
}

const deleteUserService = async (userId) => {
  await User.findOneAndRemove({ _id: userId })
  await Task.deleteMany({ user: userId })
}

export {
  changePasswordService,
  deleteUserService
}