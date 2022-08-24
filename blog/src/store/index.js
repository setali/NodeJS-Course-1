import fs from 'fs'
import path from 'path'

export class BaseModel {
  constructor ({ id, ...params }) {
    this.id = id
    this.fields.forEach(field => {
      this[field] = params[field]
    })
  }

  get fields () {
    return this.constructor.fields
  }

  get entityName () {
    return this.constructor.entityName
  }

  get data () {
    return getContent(this.entityName)
  }

  static get data () {
    return getContent(this.entityName)
  }

  generateId () {
    return Date.now()
  }

  save () {
    const data = this.data

    if (this.id) {
      const entity = data.find(el => el.id === this.id)

      this.fields.forEach(field => {
        entity[field] = this[field]
      })
    } else {
      const entity = {}

      this.fields.forEach(field => {
        entity[field] = this[field]
      })

      entity.id = this.generateId()

      data.push(entity)
    }

    saveContent(this.entityName, data)
  }

  static findAll () {
    return this.data
  }

  static find (id) {
    const data = this.data.find(el => el.id === id)
    if (data) {
      return new this(data)
    }
  }

  static remove (id) {
    const data = this.data
    const index = data.findIndex(el => el.id === id)
    if (index >= 0) {
      data.splice(index, 1)
      saveContent(this.entityName, data)
    }
  }
}

export function create (Entity) {
  const filePath = getFilePath(Entity.entityName)

  if (!fs.existsSync(filePath)) {
    saveContent(Entity.entityName, [])
  }

  return Entity
}

function getFilePath (entityName) {
  return path.resolve(__dirname, `${entityName}.data`)
}

function saveContent (entityName, data) {
  const filePath = getFilePath(entityName)
  fs.writeFileSync(filePath, JSON.stringify(data))
}

function getContent (entityName) {
  const filePath = getFilePath(entityName)
  const data = fs.readFileSync(filePath)

  return JSON.parse(data)
}
