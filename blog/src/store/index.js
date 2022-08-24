const store = {}

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
    return store[this.entityName]
  }

  static get data () {
    return store[this.entityName]
  }

  generateId () {
    return Date.now()
  }

  save () {
    if (this.id) {
      const entity = this.data.find(el => el.id === this.id)

      this.fields.forEach(field => {
        entity[field] = this[field]
      })
    } else {
      const entity = {}

      this.fields.forEach(field => {
        entity[field] = this[field]
      })

      entity.id = this.generateId()

      this.data.push(entity)
    }
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
    const index = this.data.findIndex(el => el.id === id)
    if (index >= 0) {
      this.data.splice(index, 1)
    }
  }
}

export function create (Entity) {
  if (!store[Entity.entityName]) {
    store[Entity.entityName] = []
  }

  return Entity
}
