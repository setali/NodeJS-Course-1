const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')

const staticDir = 'public'

function staticServe (req, res) {
  const { pathname } = URL.parse(req.url)

  const filePath = path.resolve(__dirname, staticDir, ...pathname.split('/'))

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath)
    res.end(data)
    return true
  }
}

const server = http.createServer((req, res) => {
  const { pathname } = URL.parse(req.url)

  if (pathname === '/') {
    const data = fs.readFileSync(path.resolve(__dirname, 'index.html'))
    return res.end(data)
  }

  const status = staticServe(req, res)

  if (status) {
    return
  }

  res.statusCode = 404
  res.end('Not found')
})

server.listen(3000, () => {
  console.clear()
  console.log('Server is running')
})
