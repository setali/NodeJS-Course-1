import express from 'express'
import router from './routes'
import errorHandler from './middleware/error-handler'
import path from 'path'
import fs from 'fs'

const app = express()

app.engine('ali', (filePath, params, callback) => {
  let view = fs.readFileSync(filePath, 'utf-8')

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'string') {
      view = view.replace(`#${key}#`, value)
    }
  })

  return callback(null, view)
})

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ali')

app.use(express.static('public'))

const port = 8000

app.use(router)

app.use(errorHandler)

app.listen(8000, () => {
  console.log(`Server is running on port ${port}`)
})
