import User from '../models/User.js'

const findUserByEmail = async (email) => {
  return User.findOne({ email })
}

const createUser = async (user) => {
  const newUser = new User(user)
  await newUser.save()
  return newUser
}

export {
  findUserByEmail,
  createUser
}