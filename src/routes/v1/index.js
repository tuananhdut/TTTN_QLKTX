import express from 'express'
import roomRouter from './roomRouter'
import userRouter from './userRouter'
import contractRouter from './contractRouter'

const router = express.Router()

router.use('/users', userRouter)

router.use('/rooms', roomRouter)

router.use('/contracts', contractRouter)

export default router