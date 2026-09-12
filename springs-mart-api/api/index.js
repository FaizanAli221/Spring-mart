// Vercel entry point: the Express app instance is itself a valid
// (req, res) request handler, so it can be exported directly as a
// serverless function. All routes are matched internally by Express
// using the full req.url (e.g. /api/products), which is why vercel.json
// rewrites every request through this single file.
const app = require('../src/app')

module.exports = app
