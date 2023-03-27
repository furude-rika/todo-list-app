const { Router } = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth.middleware')
const UserController = require('../controllers/settings')

router.patch('/change', authMiddleware, UserController.changePassword)
router.delete('/delete', authMiddleware, UserController.deleteUser)

module.exports = router
