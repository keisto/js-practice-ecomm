const express = require('express')
const multer = require('multer')

const { handleErrors } = require('./middlewares')
const productsRepo = require('../../repositories/products')
const productsNewTemplate = require('../../views/admin/products/new')
const productsIndexTemplate = require('../../views/admin/products/index')
const { requireTitle, requirePrice } = require('../../routes/admin/validators')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/admin/products', async (req, res) => {
  const products = await productsRepo.getAll()
  res.send(productsIndexTemplate({ products }))
})

router.get('/admin/products/new', (req, res) => {
  res.send(productsNewTemplate({}))
})

// Note: Multer needs to come first to parse and populate req.body
router.post(
  '/admin/products/new',
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const { title, price } = req.body
    const image = req.file.buffer.toString('base64')
    await productsRepo.create({ title, price, image })

    res.redirect('/admin/products')
  }
)

module.exports = router
