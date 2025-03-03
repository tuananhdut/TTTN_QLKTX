import express from 'express'
import authRoutes from './authRouter'
import userRoutes from './userRouter'

const router = express.Router()
router.use('/auth', authRoutes)
router.use('/users', userRoutes)

export default router