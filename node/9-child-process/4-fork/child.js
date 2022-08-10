const heavyProcess = require('./heavy-process')

console.log('Child', process.pid)
process.title = 'Node: Child'

process.on('message', data => {
  console.log('Child', data)

  setTimeout(() => {
    console.log('Child', data)
  }, 3000)
})

// process.send({ family: 'Mousavi' })

// process.send({ type: 'processed', data: {} })

// const data = heavyProcess()

// process.send(data)

// setTimeout(() => {
//   process.exit()
// }, 10000)
