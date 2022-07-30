const http = require('http')
const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, 'music.mp3')

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(filePath, { highWaterMark: 1024 })

  stream.pipe(res)

  setTimeout(() => {
    stream.pause()
  }, 100)

  setTimeout(() => {
    stream.resume()
  }, 30000)
})

server.listen(3000, () => {
  console.clear()
  console.log('Server is running')
})
