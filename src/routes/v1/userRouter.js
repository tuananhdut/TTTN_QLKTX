import express from 'express'
import UserController from '~/controllers/userControler'
import { authMiddleware, authorize } from '~/middlewares/authMiddleware'
import { validateLogin, validateUpdateUser } from '~/validations/userValidation'
import upload from '~/middlewares/uploadMiddleware'

const router = express.Router()

router.post('/login', validateLogin, UserController.loginUser)  // done

router.get('/logout', authMiddleware, UserController.logoutUser) // done

router.get('/', authMiddleware, authorize(["admin"]), UserController.getAllUsers) //done

router.get('/profile', authMiddleware, authorize(["user", "admin"]), UserController.getUserByToken) //done

router.put('/update-profile', authMiddleware, authorize(["user"]), upload.single("avatar"), UserController.updateAccountUser) //done

router.put('/update-user/:id', authMiddleware, authorize(["admin"]), upload.single("avatar"), UserController.updateAccountAdmin)

router.delete('/:id', authMiddleware, authorize(["admin"]), UserController.deleteUser) // done

router.put('/password', UserController.changePasssUser)

// router.post('/', UserController.createUser)

export default router