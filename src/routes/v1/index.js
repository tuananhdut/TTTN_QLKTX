import express from 'express'
import roomRouter from './roomRouter'
import userRouter from './userRouter'

const router = express.Router()

router.use('/users', userRouter)

router.use('/rooms', roomRouter)

export default router