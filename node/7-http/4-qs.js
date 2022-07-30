const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')
const qs = require('qs')

function initApp (req, res) {
  const url = URL.parse(req.url)
  const { pathname, query } = url

  req.query = qs.parse(query)

  req.pathname = pathname

  res.json = data => res.end(JSON.stringify(data))
}

const server = http.createServer((req, res) => {
  initApp(req, res)

  const { pathname } = req

  // console.log(qs.parse('brands%5B0%5D=18&brands%5B1%5D=1662&price%5Bmax%5D=111153701&price%5Bmin%5D=30000000&sort=1'))

  if (pathname === '/') {
    const data = fs.readFileSync(path.resolve(__dirname, 'form-get.html'))
    return res.end(data)
  }

  if (pathname === '/contact') {
    return res.json(req.query)
  }

  res.statusCode = 404
  res.end('Not found')
})

server.listen(3000, () => {
  console.clear()
  console.log('Server is running')
})
