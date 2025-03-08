import express from 'express'
import roomRouter from './roomRouter'
import userRouter from './userRouter'
import contractRouter from './contractRouter'
import authRouter from './authRouter'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/rooms', roomRouter)
router.use('/contracts', contractRouter)

export default router