const { spawn } = require('child_process')
const path = require('path')

console.log(process.pid)
process.title = 'Node - Parent'

const child = spawn('node', [path.resolve(__dirname, 'child.js')])

console.log('Child ID = ', child.pid)

child.stdout.on('data', data => console.log('stdout:', data.toString()))

child.stderr.on('data', data => console.error(data.toString()))

child.on('close', code => console.log(`Child exited by code : ${code}`))

process.on('SIGINT', code => {
  console.log('salam')
})

setTimeout(() => {}, 20000)
