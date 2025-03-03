import express from 'express'
import { getAllUsers, getUserById, updateUser, deleteUser } from '~/controllers/userControler'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { validateUpdateUser } from '~/validations/userValidation'

const router = express.Router()

router.get('/', authMiddleware, getAllUsers)

router.get('/:id', authMiddleware, getUserById)

router.put('/:id', validateUpdateUser, authMiddleware, updateUser)

router.delete('/:id', authMiddleware, deleteUser)

export default router