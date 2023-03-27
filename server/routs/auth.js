const { Router } = require('express')
const router = Router()
const { register, login } = require('../controllers/auth')
const { registerValidators, loginValidators } = require('../services/auth')

router.post('/register', registerValidators, register)
router.post('/login', loginValidators, login)

module.exports = router
