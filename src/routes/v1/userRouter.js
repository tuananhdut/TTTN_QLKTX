import express from 'express'
import UserController from '~/controllers/userControler'
import { authMiddleware, authorize } from '~/middlewares/authMiddleware'
import { validateLogin, validateUpdateUser } from '~/validations/userValidation'
import upload from '~/middlewares/uploadMiddleware'

const router = express.Router()

router.get('/', authMiddleware, authorize(["admin"]), UserController.getAllUsers) //done
router.get('/me', authMiddleware, authorize(["user", "admin"]), UserController.getUserByToken) //done
router.patch('/me', authMiddleware, upload.single("avatar"), UserController.updateAccountUser) //done
router.patch('/:id', authMiddleware, authorize(["admin"]), upload.single("avatar"), UserController.updateAccountAdmin)
router.delete('/:id', authMiddleware, authorize(["admin"]), UserController.deleteUser) // done
router.post('/me/change-password', authMiddleware, UserController.changePasssUser)

export default router