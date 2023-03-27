const { body } = require('express-validator')
const User = require('../models/User')

exports.findUserByEmail = async (email) => {
  return User.findOne({ email })
}

exports.createUser = async (user) => {
  const newUser = new User(user)
  await newUser.save()
  return newUser
}

exports.registerValidators = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
]

exports.loginValidators = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
]
