import winston from 'winston'
import 'winston-mongodb'

export const mongoTransport = new winston.transports.MongoDB({
  db: process.env.MONGO_URL,
  collection: process.env.MONGO_LOG_COLLECTION,
  options: {
    useUnifiedTopology: true
  }
})

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [mongoTransport]
})

function log (options) {
  logger.log({ level: 'info', ...options })
}

export default log
