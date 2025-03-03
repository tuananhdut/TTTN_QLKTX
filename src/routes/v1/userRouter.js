import express from 'express'
import { getAllUsers, getUserById, updateUser, deleteUser } from '~/controllers/userControler'
import { authMiddleware } from '~/middlewares/authMiddleware'

const router = express.Router()

router.get('/users', authMiddleware, getAllUsers)

router.get('/users/:id', authMiddleware, getUserById)

router.put('/users/:id', authMiddleware, updateUser)

router.delete('/users/:id', authMiddleware, deleteUser)

export default router