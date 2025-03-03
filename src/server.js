import express from 'express'
import { env } from './config/environment'
import apiRoutes from './routes/v1/index'
import { connectDB } from './config/database'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import clientRedis from './config/redis'
import passport from './config/passport'

const START_SERVER = () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static('public'))

  app.use(passport.initialize())

  app.use('/api/v1', apiRoutes)

  // xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.listen(env.PORT, env.HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`I am running at http://${env.HOST}:${env.PORT}/`)
  })
}

clientRedis
connectDB()
START_SERVER()