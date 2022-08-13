const fs = require('fs')
const path = require('path')

function config () {
  const filePath = path.resolve(process.cwd(), '.env')

  fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter(el => el)
    .map(el => el.split('='))
    .forEach(([key, value]) => {
      process.env[key] = value
    })
}

module.exports = config
