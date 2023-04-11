import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { getTasks, createTask, deleteTask } from '../controllers/main.js'

const mainRoute = Router()

mainRoute.get('/', authMiddleware, getTasks)
mainRoute.post('/', authMiddleware, createTask)
mainRoute.delete('/delete', authMiddleware, deleteTask)

export default mainRoute