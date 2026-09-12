const express = require('express')
const { getProducts, getProductById } = require('../data/mockData')

const router = express.Router()

// GET /api/products?category=&search=&limit=
router.get('/', (req, res) => {
  const { category, search, limit } = req.query
  const data = getProducts({ category, search, limit })
  res.json({ data, count: data.length })
})

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = getProductById(req.params.id)

  if (!product) {
    return res.status(404).json({
      error: { message: `No product found with id "${req.params.id}"` },
    })
  }

  res.json({ data: product })
})

module.exports = router
