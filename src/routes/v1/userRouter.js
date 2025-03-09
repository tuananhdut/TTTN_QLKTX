import express from 'express'
import { getAllUsers, getUserByToken, updateUser, deleteUser, loginUser, logoutUser, changePasssUser } from '~/controllers/userControler'
import { authMiddleware, authorize } from '~/middlewares/authMiddleware'
import { validateLogin, validateUpdateUser } from '~/validations/userValidation'

const router = express.Router()

router.post('/login', validateLogin, loginUser)  // done

router.get('/logout', authMiddleware, logoutUser) // done

router.get('/', authMiddleware, authorize(["admin"]), getAllUsers) //done

router.get('/profile', authMiddleware, authorize(["user", "admin"]), getUserByToken) //done

router.put('/:id', validateUpdateUser, authMiddleware, authorize(["user", "admin"]), updateUser)

router.delete('/:id', authMiddleware, authorize(["admin"]), deleteUser) // done

router.put('/password', changePasssUser)

export default router;