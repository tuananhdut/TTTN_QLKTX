import express from 'express'
import UserController from '~/controllers/userControler'
import { authMiddleware, authorize } from '~/middlewares/authMiddleware'
import { validateLogin, validateUpdateUser } from '~/validations/userValidation'

const router = express.Router()

router.post('/logout', authMiddleware, UserController.logoutUser) // done
router.post('/login', validateLogin, UserController.loginUser)  // done


export default router