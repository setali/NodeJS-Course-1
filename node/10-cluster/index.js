const cluster = require('cluster')
const http = require('http')
const os = require('os')

const numCPUs = os.cpus().length

if (cluster.isMaster) {
  console.log('Master pid:', process.pid)

  for (let i = 0; i < 20; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`)
  })
} else {
  // Cluster Can share TCP connection between workers
  http
    .createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.end(process.pid + '')
    })
    .listen(3000, () => console.log('Server is running on', process.pid))
}
