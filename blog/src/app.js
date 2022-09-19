import express from 'express'
import router from './routes'
import errorHandler from './middleware/error-handler'
import path from 'path'
import bodyParser from 'body-parser'
import overrideMethod from './middleware/override-method'
import { sequelize } from './config/database'
import session from 'express-session'
import connectRedis from 'connect-redis'
import auth from './middleware/auth'
import socketIO from 'socket.io'
import http from 'http'
import chatApp from './chat'
import { redisClient } from './config/redis'

export async function bootstrap () {
  const app = express()

  app.set('views', path.resolve(__dirname, 'views'))
  app.set('view engine', 'ejs')

  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(overrideMethod)

  const RedisStore = connectRedis(session)

  const store = new RedisStore({ client: redisClient })

  const sessionMiddleware = session({
    store,
    secret: 'my secret',
    resave: false
  })

  app.use(sessionMiddleware)

  app.use(auth)

  const port = process.env.PORT

  app.use(router)

  app.use(errorHandler)

  await sequelize.authenticate()

  await sequelize.sync({ alter: true })

  const server = http.createServer(app)

  const io = new socketIO.Server(server)

  io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next)
  })

  io.use((socket, next) => {
    auth(socket.request, {}, next)
  })

  io.on('connection', socket => chatApp(io, socket))

  server.listen(8000, () => {
    console.log(`Server is running on port ${port}`)
  })
}
