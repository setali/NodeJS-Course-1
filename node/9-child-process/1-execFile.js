const { execFile } = require('child_process')

execFile('python3', ['--version'], (error, stdout) => {
  if (error) {
    console.error(error)
  } else {
    console.log('stdout', stdout)
  }
})

execFile('ls', ['-l'], (error, stdout) => {
  if (error) {
    console.error(error)
  } else {
    console.log('stdout', stdout)
  }
})
