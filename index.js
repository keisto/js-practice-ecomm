const express = require('express')
const bodyParser = require('body-parser')

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

app.post('/', (req, res) => {
  console.log(req.body)
  res.send('Account created!')
})

app.listen(3000, () => {
  console.log('Listening')
})
