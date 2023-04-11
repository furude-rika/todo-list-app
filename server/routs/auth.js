import { Router } from 'express'
import { register, login } from '../controllers/auth.js'

const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/login', login)

export default authRoute