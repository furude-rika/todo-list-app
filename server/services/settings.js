const User = require('../models/User')
const Task = require('../models/Task')

async function changePassword(user, hashedPassword) {
  user.password = hashedPassword
  await user.save()
}

async function deleteUser(userId) {
  await User.findOneAndRemove({ _id: userId })
  await Task.deleteMany({ user: userId })
}

module.exports = {
  changePassword,
  deleteUser
}
