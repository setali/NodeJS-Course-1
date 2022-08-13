const { Worker } = require('worker_threads')
const path = require('path')

console.log(process.pid)

const workerPath = path.resolve(__dirname, 'worker.js')

function makePowerWorker (a, b) {
  const worker = new Worker(workerPath, { workerData: { a, b } })

  worker.postMessage('salam')

  worker.on('message', message => {
    if (message === 'terminate') {
      worker.terminate()
    }
  })

  worker.on('error', console.log)

  worker.on('exit', code => {
    console.log('Stopped with code:', code)
  })
}

makePowerWorker(9999999n, 999999n)
makePowerWorker(99999999n, 999999n)
makePowerWorker(999999n, 999999n)
makePowerWorker(999999999n, 999999n)
makePowerWorker(99999n, 9999999n)

// setInterval(() => {
//   console.log(Date.now())
// }, 1000)

