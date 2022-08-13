require('./loadEnv')()

console.log(process.env.DATABASE_URL)
console.log(process.env.NODE_ENV)
console.log(process.env.DATABASE_PASSWORD)
