const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    return res.end('HomePage')
  }

  if (req.url === '/about') {
    const filePath = path.resolve(__dirname, 'about.html')
    const data = fs.readFileSync(filePath, 'utf-8')

    return res.end(data)
  }

  if (req.url === '/favicon.ico') {
    return res.end(fs.readFileSync(path.resolve(__dirname, 'favicon.ico')))
  }

  res.statusCode = 404
  res.end('Not Found')
})

const port = 3000

server.listen(port, () => {
  console.clear()
  console.log(`Server is running on port ${port}`)
})
