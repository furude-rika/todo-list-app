const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const config = require('config')
const authService = require('../services/auth')

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body
    const userToFind = await authService.findUserByEmail(email)

    if (userToFind) {
      return res.status(400).json({ message: 'This user is already registered' })
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10)
      const user = await authService.createUser({
        name,
        email,
        password: hashedPassword,
        tasks: []
      })

      return res.status(201).json({ message: 'User is created' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    const userToFind = await authService.findUserByEmail(email)
    const isPassMatched = await bcryptjs.compare(password, userToFind.password)

    if (!userToFind || !isPassMatched) {
      return res.status(400).json({ message: 'Wrong email or password, please try again' })
    }

    const token = jwt.sign(
      { userId: userToFind.id },
      config.get('jwtSecret')
    )

    res.json({ token, userId: userToFind.id })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}
