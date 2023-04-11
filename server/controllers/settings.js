import config from 'config'
import bcryptjs from 'bcryptjs'
import User from '../models/User.js'
import httpStatus from 'http-status'
import { changePasswordService, deleteUserService } from '../services/settings.js'

const changePassword = async (req, res) => {
  try {
    const { password } = req.body
    const userToFind = await User.findOne({ _id: req.user.userId })

    const hashedPassword = await bcryptjs.hash(password, config.get('solt'))
    await changePasswordService(userToFind, hashedPassword)

    res.status(httpStatus.CREATED).json({ message: config.get('changePassMessage') })
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: config.get('serverErrorMessage') })
  }
}

const deleteUser = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*')
    await deleteUserService(req.user.userId)

    res.status(httpStatus.OK).json({ message: config.get('deleteUserMessage') })
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: config.get('serverErrorMessage') })
  }
}

export {
  changePassword,
  deleteUser
}