const { parentPort, workerData } = require('worker_threads')

console.log(process.pid)

parentPort.on('message', message => {
  console.log(message)
})

console.log((workerData.a ** workerData.b).toString().length)

parentPort.postMessage('terminate')
