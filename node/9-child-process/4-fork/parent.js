const { fork } = require('child_process')
const path = require('path')
const heavyProcess = require('./heavy-process')
process.title = 'Node: Parent'

const subprocess = fork(path.resolve(__dirname, 'child.js'))

console.log('Parent', process.pid)

const data = { name: 'Ali' }

subprocess.send(data)

setTimeout(() => {
  console.log('Change obj property not effect on subprocess')
  data.name = 'Hasan'
}, 1000)

subprocess.on('message', data => {
  console.log('Parent', data)
})

// console.log(heavyProcess())

// setTimeout(() => console.log(heavyProcess()), 0) // wrong

setInterval(() => console.log('Parent', Date.now()), 1000)
