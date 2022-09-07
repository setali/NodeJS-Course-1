import express from 'express'
import router from './routes'
import errorHandler from './middleware/error-handler'
import path from 'path'
import bodyParser from 'body-parser'
import overrideMethod from './middleware/override-method'
import { sequelize } from './config/database'
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import auth from './middleware/auth'

export async function bootstrap () {
  const app = express()

  app.set('views', path.resolve(__dirname, 'views'))
  app.set('view engine', 'ejs')

  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(overrideMethod)

  const RedisStore = connectRedis(session)

  const redisClient = new Redis(6371)

  const store = new RedisStore({ client: redisClient })

  app.use(
    session({
      store,
      secret: 'my secret',
      resave: false
    })
  )

  app.use(auth)

  const port = process.env.PORT

  app.use(router)

  app.use(errorHandler)

  await sequelize.authenticate()

  await sequelize.sync({ alter: true })

  app.listen(8000, () => {
    console.log(`Server is running on port ${port}`)
  })
}
