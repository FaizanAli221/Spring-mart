# Springs Mini Mart API

A lightweight Express REST API for the Springs Mini Mart grocery app. Ships
with realistic in-memory mock data (PKR pricing, Unsplash images, stock
status) and deploys instantly to Vercel as a serverless function, or to
Render/Railway/any Node host as a normal long-running server.

## Stack

- Node.js + Express
- `cors` with an allow-list driven by an env var
- `dotenv` for local config
- In-memory data store (no database required)

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

The API runs at `http://localhost:4000` by default.

## Endpoints

| Method | Path                  | Description                                   |
|--------|-----------------------|------------------------------------------------|
| GET    | `/api/health`         | `{ status: "ok", timestamp }`                  |
| GET    | `/api/categories`     | List of categories with banner/discount info   |
| GET    | `/api/products`       | List products; supports `?category=&search=&limit=` |
| GET    | `/api/products/:id`   | Single product, 404 if not found               |
| POST   | `/api/orders`         | Create a Cash-on-Delivery order                |

All successful responses are wrapped as `{ data: ... }` (list endpoints also
include `count`). Errors are wrapped as `{ error: { message, details? } }`.

### `POST /api/orders`

Request body:

```json
{
  "customer": { "name": "Ayesha Khan", "phone": "03001234567", "address": "House 12, DHA Phase 5, Karachi" },
  "items": [{ "productId": "p1", "quantity": 2 }],
  "totalAmount": 1240
}
```

The server validates the customer fields and each `productId`/`quantity`,
then **recomputes the subtotal, delivery fee, and total from its own product
data** (the client-supplied `totalAmount` is accepted but never trusted for
the final charge). A flat delivery fee applies below PKR 3,000; orders at or
above that are free delivery. Response:

```json
{
  "data": {
    "orderId": "SPR-MTY4...-IF2N7",
    "status": "Order Confirmed (Cash on Delivery)",
    "paymentMethod": "Cash on Delivery",
    "customer": { "...": "..." },
    "items": [{ "productId": "p1", "name": "...", "unitPrice": 620, "quantity": 2, "lineTotal": 1240 }],
    "subtotal": 1240,
    "deliveryFee": 150,
    "total": 1390,
    "currency": "PKR",
    "createdAt": "2026-09-12T08:14:57.815Z"
  }
}
```

## CORS

Set `ALLOWED_ORIGINS` in `.env` (or your host's environment settings) to a
comma-separated list of origins allowed to call this API, e.g.:

```
ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:5173
```

Use `ALLOWED_ORIGINS=*` to allow any origin (fine for quick demos, not
recommended once you have real customer data flowing through orders).

## Project structure

```
api/index.js            Vercel serverless entry point (exports the Express app)
server.js               Local/Render/Railway entry point (app.listen)
src/app.js               Express app: CORS, JSON body parsing, route mounting
src/data/mockData.js     In-memory categories + products
src/routes/              categories, products, orders, health route handlers
src/middleware/          404 + centralized error handler
src/utils/               order ID generator
```

## Deploying

### Vercel (serverless)

1. Push this project to a Git repository.
2. Import it in Vercel. `vercel.json` rewrites every request to
   `api/index.js`, which exports the Express app directly (an Express app
   instance is itself a valid `(req, res)` handler, so no adapter package is
   needed).
3. Add `ALLOWED_ORIGINS` under Project Settings → Environment Variables.
4. Deploy — no build step required.

### Render / Railway (long-running Node server)

1. Push to Git and create a new Web Service pointing at this repo.
2. Build command: `npm install`. Start command: `npm start`.
3. Set `ALLOWED_ORIGINS` (and optionally `PORT`, though both platforms inject
   their own) in the service's environment variables.

## Connecting the React frontend

Point the frontend's `VITE_API_BASE_URL` at this API's deployed URL (no
trailing slash). The frontend already calls `/api/categories` and
`/api/products`, which match this API's routes exactly.
