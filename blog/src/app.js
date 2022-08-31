import 'express-async-errors'
import express from 'express'
import router from './routes'
import errorHandler from './middleware/error-handler'
import path from 'path'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import overrideMethod from './middleware/override-method'

dotenv.config()

const app = express()

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(overrideMethod)

const port = 8000

app.use(router)

app.use(errorHandler)

app.listen(8000, () => {
  console.log(`Server is running on port ${port}`)
})
