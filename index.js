const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const authRouter = require('./routes/admin/auth')
const productsRouter = require('./routes/admin/products')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cookieSession({
    keys: ['571744f3-f3de-4c18-8174-ad4dbcbd265a-tk-oss'],
  })
)

app.use(authRouter)
app.use(productsRouter)

app.listen(3000, () => {
  console.log('Listening...')
})
