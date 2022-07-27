const Stream = require('stream')
const fs = require('fs')
const path = require('path')

const result = []
const writableStream = new Stream.Writable({
  write: (chunk, encoding, next) => {
    result.push(chunk)
    next()
  }
})

const readableStream = new Stream.Readable({
  read: () => {}
})

readableStream.pipe(writableStream)

readableStream.on('close', () => writableStream.end())
writableStream.on('close', () => {
  console.log('Writable stream ended')
  const newFilePath = path.resolve(__dirname, 'new-image.jpg')
  fs.writeFileSync(newFilePath, Buffer.concat(result))
})

const filePath = path.resolve(__dirname, 'image.jpg')

const data = fs.readFileSync(filePath)

const chunkSize = 2 ** 10

const chunkCount = parseInt(data.length / chunkSize) + 1

for (let i = 0; i < chunkCount; i++) {
  const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize)
  readableStream.push(chunk)
  console.log(i, chunk.length)
}

readableStream.destroy()
