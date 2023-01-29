const express = require('express')
const cartsRepo = require('../repositories/carts')

const router = express.Router()

router.post('/cart/products', async (req, res) => {
  let cart
  if (req.session.cartId) {
    // cart found
    cart = await cartsRepo.getOne(req.session.cartId)
  } else {
    // create new cart
    cart = await cartsRepo.create({ items: [] })
    req.session.cartId = cart.id
  }

  const existingItem = cart.items.find((item) => item.id === req.body.productId)

  if (existingItem) {
    // increment quantity
    existingItem.quantity++
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 })
  }

  await cartsRepo.update(cart.id, { items: cart.items })

  res.send('Product added')
})
module.exports = router
