const http = require('http')

const server = http.createServer((req, res) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*')
  //   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  res.end('Hello')
})

server.listen(3000, () => console.log('Server is running'))
