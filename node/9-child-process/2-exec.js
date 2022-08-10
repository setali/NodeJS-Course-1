const { exec } = require('child_process')

exec('ls | grep .json', (error, stdout) => {
  if (error) {
    console.error(error)
  } else {
    console.log('stdout', stdout)
  }
})

exec('python3 --version', (error, stdout) => {
  if (error) {
    console.error(error)
  } else {
    console.log('stdout', stdout)
  }
})
