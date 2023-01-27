const express = require('express')
const bodyParser = require('body-parser')
const userRepo = require('./repositories/users')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method="post">
        <input type="text" placeholder="Email" name="email"/>
        <input type="password" placeholder="Password" name="password">
        <input type="password" placeholder="Password Confirmation" name="passwordConfirmation">
        <button type="submit">Sign Up</button>
      </form>
    </div>
  `)
})

app.post('/', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body
  const existingUser = await userRepo.getOneBy({ email })

  if (existingUser) {
    return res.send('Email in use.')
  }

  if (password !== passwordConfirmation) {
    return res.send('Passwords do not match.')
  }

  res.send('Account created!')
})

app.listen(3000, () => {
  console.log('Listening...')
})
