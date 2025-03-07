import express from 'express'
import RoomController from '../../controllers/roomController'
import upload from '~/middlewares/uploadMiddleware'
import { authMiddleware, authorize } from '~/middlewares/authMiddleware'

const router = express.Router()

router.get('/image/:filename', RoomController.getImageRoom)

router.get('/:id', RoomController.getRoomByIDRoom)

router.get('/', RoomController.getAllRooms)

router.post('/', authMiddleware, authorize(["admin"]), upload.single("file"), RoomController.createRoom)

router.put('/:id', authMiddleware, authorize(["admin"]), upload.single("image"), RoomController.updateRoom)

export default router