import config from 'config'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import httpStatus from 'http-status'
import { validationResult } from 'express-validator'
import { findUserByEmail, createUser } from '../services/auth.js'

const register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body
    const userToFind = await findUserByEmail(email)

    if (userToFind) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: config.get('registerUserError') })
    } else {
      const hashedPassword = await bcryptjs.hash(password, config.get('solt'))
      await createUser({
        name,
        email,
        password: hashedPassword,
        tasks: []
      })

      return res.status(httpStatus.CREATED).json({ message: config.get('createUserMessage') })
    }
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: config.get('serverErrorMessage') })
  }
}

const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    const userToFind = await findUserByEmail(email)
    const isPassMatched = await bcryptjs.compare(password, userToFind.password)

    if (!userToFind || !isPassMatched) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: config.get('wrongCredentialsError') })
    }

    const token = jwt.sign(
      { userId: userToFind.id },
      config.get('jwtSecret')
    )

    res.json({ token, userId: userToFind.id })
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: config.get('serverErrorMessage') })
  }
}

export {
  register,
  login
}