import express from 'express'
import authRoutes from './authRouter'
import userRoutes from './userRouter'

const router = express.Router()
router.use('/auth', authRoutes)
router.use('/', userRoutes)

export default router