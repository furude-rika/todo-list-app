import { Router } from 'express'
import { changePassword, deleteUser } from '../controllers/settings.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const settingsRoute = Router()

settingsRoute.patch('/change', authMiddleware, changePassword)
settingsRoute.delete('/delete', authMiddleware, deleteUser)

export default settingsRoute