import express from 'express'
// import authRoutes from './authRouter'
import userRoutes from './userRouter'
import waterRoutes from './waterReadingRouter'
import electricRoutes from './electricityReadingRouter'

const router = express.Router()
// router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/waters', waterRoutes)
router.use('/electric', electricRoutes)


export default router