const minimist = require('minimist')

const result = minimist(process.argv.splice(2))

console.log(result)
