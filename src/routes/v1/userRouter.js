import express from 'express'
import { getAllUsers, getUserById, updateUser, deleteUser } from '~/controllers/userControler'
import { authMiddleware, authorize } from '~/middlewares/authMiddleware'
import { validateUpdateUser } from '~/validations/userValidation'

const router = express.Router()

router.get('/', authMiddleware, authorize(["user", "admin"]), getAllUsers)

router.get('/:id', authMiddleware, authorize(["user", "admin"]), getUserById)

router.put('/:id', validateUpdateUser, authMiddleware, authorize(["user", "admin"]), updateUser)

router.delete('/:id', authMiddleware, deleteUser)

export default router