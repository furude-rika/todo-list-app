const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const userService = require('../services/settings')

async function changePassword(req, res) {
  try {
    const { password } = req.body
    const userToFind = await User.findOne({ _id: req.user.userId })

    const hashedPassword = await bcryptjs.hash(password, 10)
    await userService.changePassword(userToFind, hashedPassword)

    res.status(201).json({ message: 'Password was successfully changed' })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

async function deleteUser(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*')
    await userService.deleteUser(req.user.userId)

    res.status(200).json({message: 'User was deleted'})
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

module.exports = {
  changePassword,
  deleteUser
}
