const fs = require('fs')
const path = require('path')
const https = require('https')

const data = fs.readFileSync(path.resolve(__dirname, 'files.txt'), 'utf-8')

const files = data.split('\n')

const dirPath = path.resolve(__dirname, 'downloads')

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath)
}

files.forEach(file => {
  const fileUrl = decodeURI(file)
  const fileName = path.basename(fileUrl).replace(/\s/g, '')

  const fileStream = fs.createWriteStream(path.resolve(dirPath, fileName))

  https.get(file, response => {
    response.pipe(fileStream)

    response.on('end', () => {
      fileStream.close()
      console.log(`${fileName} downloaded`)
    })
  })
})
