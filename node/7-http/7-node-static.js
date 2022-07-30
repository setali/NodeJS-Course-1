const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')
const static = require('node-static')

const staticDir = 'public'

const fileServer = new static.Server(staticDir)

const server = http.createServer((req, res) => {
  const { pathname } = URL.parse(req.url)

  if (pathname === '/') {
    const data = fs.readFileSync(path.resolve(__dirname, 'index.html'))
    return res.end(data)
  }

  fileServer.serve(req, res, function (error, response) {
    if (error && error.status === 404) {
      res.statusCode = 404
      res.end('Not found')
    }
  })
})

server.listen(3000, () => {
  console.clear()
  console.log('Server is running')
})
