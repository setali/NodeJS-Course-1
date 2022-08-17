import express from 'express'
import router from './routes'

const app = express()

const port = 8000

app.use(router)

app.all('*', (req, res) => {
  res.status(404).send('Not found')
})

app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(400).send(err.message)
})

app.listen(8000, () => {
  console.log(`Server is running on port ${port}`)
})
