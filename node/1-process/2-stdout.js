process.stdout.write('Salam\n')

function log (...args) {
  args.forEach(data => {
    process.stdout.write(`${data}\n`)
  })
}

log('Ali', 'Eli', 'Qoli')

process.stdout.write('ali', 'base64')
