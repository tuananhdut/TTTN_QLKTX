import express from 'express'
import authRoutes from './authRouter'
import userRoutes from './userRouter'
import roomRouter from './roomRouter'

const router = express.Router()
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
// router.use('/room', roomRouter)


export default router