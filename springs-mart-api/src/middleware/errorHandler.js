function notFoundHandler(req, res) {
  res.status(404).json({
    error: { message: `Route ${req.method} ${req.originalUrl} not found` },
  })
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err)

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: { message: 'Origin not allowed by CORS policy' } })
  }

  res.status(err.status || 500).json({
    error: { message: err.message || 'Internal server error' },
  })
}

module.exports = { notFoundHandler, errorHandler }
