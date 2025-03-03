import express from 'express'
import { loginUser, logoutUser } from '~/controllers/authControler'
import { validateLogin } from '~/validations/userValidation'
import { authMiddleware } from '~/middlewares/authMiddleware'

const router = express.Router()

router.post('/login', validateLogin, loginUser)

router.get('/logout', authMiddleware, logoutUser)

export default router