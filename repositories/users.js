const fs = require('fs')
const crypto = require('crypto')
const util = require('util')

const scrypt = util.promisify(crypto.scrypt)

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename')
    }

    this.filename = filename
    try {
      fs.accessSync(this.filename)
    } catch (err) {
      fs.writeFileSync(this.filename, '[]')
    }
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf-8',
      })
    )
  }

  async create(attrs) {
    attrs.id = this.randomId()

    const salt = crypto.randomBytes(8).toString('hex')
    const buf = await scrypt(attrs.password, salt, 64)
    const hashed = `${buf.toString('hex')}.${salt}`

    const records = await this.getAll()
    const record = { ...attrs, password: hashed }
    records.push(record)

    await this.writeAll(records)

    return record
  }

  async getOne(id) {
    const records = await this.getAll()
    return records.find((record) => record.id === id) || null
  }

  async delete(id) {
    const records = await this.getAll()
    await this.writeAll(records.filter((record) => record.id !== id))
  }

  async update(id, attrs) {
    const records = await this.getAll()
    const record = records.find((record) => record.id === id)

    if (!record) {
      throw new Error(`Record with ID: ${id} not found.`)
    }

    Object.assign(record, attrs)
    await this.writeAll(records)
  }

  async getOneBy(filters) {
    const records = await this.getAll()

    for (const record of records) {
      let found = true
      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false
        }
      }

      if (found) {
        return record
      }
    }

    return null
  }

  async comparePasswords(savedHashedPassword, suppliedPassword) {
    const [hashed, salt] = savedHashedPassword.split('.')
    const buf = await scrypt(suppliedPassword, salt, 64)
    const hashedSupplied = buf.toString('hex')

    return hashed === hashedSupplied
  }

  async writeAll(records) {
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex')
  }
}

module.exports = new UsersRepository('users.json')
