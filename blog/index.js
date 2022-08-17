const express = require('express')

const app = express()

const port = 8000

app.use('/about', (req, res, next) => {
  console.log('Middleware 1')
  req.ali = 'Mousavi'
  //   res.send('Error')
  next()
})

app.use((req, res, next) => {
  console.log('Middleware 2')
  next()
})

// app.use((req, res, next) => {
//   throw new Error('Custom error')
// })

app.get('/', (req, res) => {
  console.log(req.ali)
  res.status(200).send('HomePage')
})

app.get('/about', (req, res) => {
  res.status(200).send('AboutPage')
})

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
