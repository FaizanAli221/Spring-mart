const express = require('express')
const { getCategories } = require('../data/mockData')

const router = express.Router()

// GET /api/categories
router.get('/', (req, res) => {
  res.json({ data: getCategories() })
})

module.exports = router
