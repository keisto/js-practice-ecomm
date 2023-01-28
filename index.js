const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const usersRepo = require('./repositories/users')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cookieSession({
    keys: ['571744f3-f3de-4c18-8174-ad4dbcbd265a-tk-oss'],
  })
)

app.get('/signup', (req, res) => {
  res.send(`
    <div>
       ${req.session.userId}
      <form method="post">
        <input type="text" placeholder="Email" name="email"/>
        <input type="password" placeholder="Password" name="password">
        <input type="password" placeholder="Password Confirmation" name="passwordConfirmation">
        <button type="submit">Sign Up</button>
      </form>
    </div>
  `)
})

app.post('/signup', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body
  const existingUser = await usersRepo.getOneBy({ email })

  if (existingUser) {
    return res.send('Email in use.')
  }

  if (password !== passwordConfirmation) {
    return res.send('Passwords do not match.')
  }

  // Create user
  const { id } = await usersRepo.create({ email, password })

  // Store id of user in a cookie
  req.session.userId = id

  res.send('Account created!')
})

app.get('/signout', (req, res) => {
  req.session = null
  res.send('You are logged out')
})

app.get('/signin', (req, res) => {
  res.send(`
    <div>
      <form method="post">
        <input type="text" placeholder="Email" name="email"/>
        <input type="password" placeholder="Password" name="password">
        <button type="submit">Sign In</button>
      </form>
    </div>
  `)
})

app.post('/signin', async (req, res) => {
  const { email, password } = req.body
  const user = await usersRepo.getOneBy({ email })

  if (!user) {
    return res.send(`User not found with this email: ${email}`)
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  )
  if (!validPassword) {
    return res.send('Invalid password.')
  }

  req.session.userId = user.id
  res.send('You are signed in!')
})

app.listen(3000, () => {
  console.log('Listening...')
})
