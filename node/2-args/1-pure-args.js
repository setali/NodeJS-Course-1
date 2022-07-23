const args = process.argv.splice(2)

const tuples = args.map(el => el.split('='))

const result = {}

for (const [key, value] of tuples) {
  result[key] = value
}

const arguments = Object.fromEntries(tuples)

console.log(arguments)
