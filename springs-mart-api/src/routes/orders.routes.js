const express = require('express')
const { getProductById } = require('../data/mockData')
const { generateOrderId } = require('../utils/generateOrderId')

const router = express.Router()

const DELIVERY_FEE = 150
const FREE_DELIVERY_THRESHOLD = 3000

function validateOrderPayload(body) {
  const errors = []
  const { customer, items } = body || {}

  if (!customer || typeof customer !== 'object') {
    errors.push('customer is required')
  } else {
    if (!customer.name || typeof customer.name !== 'string') {
      errors.push('customer.name is required')
    }
    if (!customer.phone || typeof customer.phone !== 'string') {
      errors.push('customer.phone is required')
    }
    if (!customer.address || typeof customer.address !== 'string') {
      errors.push('customer.address is required')
    }
  }

  if (!Array.isArray(items) || items.length === 0) {
    errors.push('items must be a non-empty array')
  } else {
    items.forEach((item, i) => {
      if (!item.productId) {
        errors.push(`items[${i}].productId is required`)
        return
      }
      if (!getProductById(item.productId)) {
        errors.push(`items[${i}].productId "${item.productId}" does not exist`)
      }
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        errors.push(`items[${i}].quantity must be a positive integer`)
      }
    })
  }

  return errors
}

// POST /api/orders
router.post('/', (req, res) => {
  const errors = validateOrderPayload(req.body)

  if (errors.length > 0) {
    return res.status(400).json({ error: { message: 'Invalid order payload', details: errors } })
  }

  const { customer, items } = req.body

  // Recompute totals server-side from trusted product data —
  // the client-supplied totalAmount is never trusted for the final charge.
  const lineItems = items.map(({ productId, quantity }) => {
    const product = getProductById(productId)
    return {
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity,
      lineTotal: product.price * quantity,
    }
  })

  const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0)
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee

  const order = {
    orderId: generateOrderId(),
    status: 'Order Confirmed (Cash on Delivery)',
    paymentMethod: 'Cash on Delivery',
    customer: {
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
    },
    items: lineItems,
    subtotal,
    deliveryFee,
    total,
    currency: 'PKR',
    createdAt: new Date().toISOString(),
  }

  res.status(201).json({ data: order })
})

module.exports = router
