const crypto = require('crypto')
const util = require('util')
const Repository = require('./Repository')

const scrypt = util.promisify(crypto.scrypt)

class UsersRepository extends Repository {
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

  async comparePasswords(savedHashedPassword, suppliedPassword) {
    const [hashed, salt] = savedHashedPassword.split('.')
    const buf = await scrypt(suppliedPassword, salt, 64)
    const hashedSupplied = buf.toString('hex')

    return hashed === hashedSupplied
  }
}

module.exports = new UsersRepository('users.json')
