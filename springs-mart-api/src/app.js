require('dotenv').config()

const express = require('express')
const cors = require('cors')

const categoriesRoutes = require('./routes/categories.routes')
const productsRoutes = require('./routes/products.routes')
const ordersRoutes = require('./routes/orders.routes')
const healthRoutes = require('./routes/health.routes')
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler')

const app = express()

// --- CORS ---------------------------------------------------------------
// Configure allowed origins via ALLOWED_ORIGINS (comma-separated) so the
// deployed React frontend can call this API. Defaults cover common local
// Vite/CRA dev ports. Use "*" in ALLOWED_ORIGINS to allow any origin.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const corsOptions = {
  origin(origin, callback) {
    const allowAll = allowedOrigins.includes('*')
    // Allow requests with no Origin header (curl, server-to-server, health checks).
    if (!origin || allowAll || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

// --- Routes ---------------------------------------------------------------
app.get('/', (req, res) => {
  res.json({
    name: 'Springs Mini Mart API',
    status: 'running',
    endpoints: [
      'GET /api/health',
      'GET /api/categories',
      'GET /api/products',
      'GET /api/products/:id',
      'POST /api/orders',
    ],
  })
})

app.use('/api/health', healthRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/orders', ordersRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
