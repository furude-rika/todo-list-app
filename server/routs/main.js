const { Router } = require('express')
const router = Router()
const tasksController = require('../controllers/main')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/', authMiddleware, tasksController.getTasks)
router.post('/', authMiddleware, tasksController.createTask)
router.delete('/delete', authMiddleware, tasksController.deleteTask)

module.exports = router
