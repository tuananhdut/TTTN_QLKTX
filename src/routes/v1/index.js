import express from 'express'
// import authRoutes from './authRouter'
import userRoutes from './userRouter'
import waterRoutes from './waterReadingRouter'
import electricRoutes from './electricityReadingRouter'
import deviceRoutes from './deviceRouter'

const router = express.Router()
// router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/waters', waterRoutes)
router.use('/electric', electricRoutes)
router.use('/devices', deviceRoutes)


export default router