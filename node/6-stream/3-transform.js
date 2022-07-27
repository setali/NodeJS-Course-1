const Stream = require('stream')

const transformStream = new Stream.Transform()

transformStream._transform = (chunk, encoding) => {
  transformStream.push(chunk.toString().toUpperCase())
}

process.stdin.pipe(transformStream).pipe(process.stdout)
