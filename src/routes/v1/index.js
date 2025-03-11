import express from 'express'
import roomRouter from './roomRouter'
import userRouter from './userRouter'
import contractRouter from './contractRouter'
import authRouter from './authRouter'
import waterRoutes from './waterReadingRouter'
import electricRoutes from './electricityReadingRouter'
import deviceRoutes from './deviceRouter'
import serviceRouter from './serviceRateRouter'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/rooms', roomRouter)
router.use('/contracts', contractRouter)
router.use('/waters', waterRoutes)
router.use('/electric', electricRoutes)
router.use('/devices', deviceRoutes)
router.use('/services', serviceRouter)

export default router