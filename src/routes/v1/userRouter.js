import express from 'express'
import UserController from '~/controllers/userControler'
import { authMiddleware, authorize } from '~/middlewares/authMiddleware'
import { validateLogin, validateUpdateUser } from '~/validations/userValidation'

const router = express.Router()

router.post('/login', validateLogin, UserController.loginUser)  // done

router.get('/logout', authMiddleware, UserController.logoutUser) // done

router.get('/', authMiddleware, authorize(["admin"]), UserController.getAllUsers) //done

router.get('/profile', authMiddleware, authorize(["user", "admin"]), UserController.getUserByToken) //done

router.put('/:id', validateUpdateUser, authMiddleware, authorize(["user", "admin"]), UserController.updateUser)

router.delete('/:id', authMiddleware, authorize(["admin"]), UserController.deleteUser) // done

router.put('/password', UserController.changePasssUser)

export default router