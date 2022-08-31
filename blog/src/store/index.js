import mysql from 'mysql2'

console.log(process.env.DATABASE_PORT)

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
})

connection.connect()

export class BaseModel {
  constructor ({ id, ...params }) {
    this.id = id
    this.fieldNames.forEach(field => {
      this[field] = params[field]
    })
  }

  get fields () {
    return this.constructor.fields
  }

  get fieldNames () {
    return this.fields.map(f => f.name)
  }

  get entityName () {
    return this.constructor.entityName
  }

  save () {
    const q = this.id
      ? `UPDATE ${this.entityName} SET ${this.fieldNames
          .map(
            name =>
              `${name} = ${
                this[name] === undefined ? 'NULL' : `'${this[name]}'`
              }
            `
          )
          .join(', ')}
          WHERE id = ${this.id}
          `
      : `INSERT INTO ${this.entityName} (${this.fieldNames.join(', ')})
            VALUES (${this.fieldNames
              .map(name =>
                this[name] === undefined ? 'NULL' : `'${this[name]}'`
              )
              .join(', ')})
      `

    return query(q)
  }

  remove () {
    return this.constructor.remove(this.id)
  }

  static findAll () {
    return query(`SELECT * FROM ${this.entityName}`)
  }

  static async find (id) {
    const results = await query(
      `SELECT * FROM ${this.entityName} WHERE id = ${id} LIMIT 1`
    )

    return results[0] ? new this(results[0]) : undefined
  }

  static remove (id) {
    return query(`DELETE FROM ${this.entityName} WHERE id = ${id}`)
  }
}

function query (q) {
  return new Promise((resolve, reject) => {
    connection.query(q, (err, results) => {
      err ? reject(err) : resolve(results)
    })
  })
}

export function create (Entity) {
  query(`SHOW TABLES LIKE '${Entity.entityName}'`).then(results => {
    if (results.length === 0) {
      query(`CREATE TABLE IF NOT EXISTS ${Entity.entityName} 
        (id INT NOT NULL AUTO_INCREMENT,
          ${Entity.fields
            .map(
              field =>
                `${field.name} ${field.type} ${
                  field.null === false ? 'NOT NULL' : ''
                }`
            )
            .join(', ')},
            PRIMARY KEY (id)
        );`).then(() => console.log(`${Entity.entityName} table created`))
    }
  })

  return Entity
}
