import config from 'config'
import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'

export const authMiddleware = (req, res, next) => {
  if (req.method === config.get('optionsMethod')) {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: config.get('serverErrorMessage') })
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()

  } catch (err) {
    res.status(httpStatus.UNAUTHORIZED).json({ message: config.get('serverErrorMessage') })
  }
}