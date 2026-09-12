# Springs Mini Mart

A React + Vite e-commerce mini-mart storefront inspired by Springs Store's clean
white-and-maroon grocery aesthetic. Built mobile-first, fully responsive, and
ready for a one-click Vercel deploy.

## Stack

- React 18 + Vite
- Tailwind CSS
- lucide-react icons
- Context API for cart and category/search filter state
- Fetch-based API client with automatic fallback to local mock data

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Connecting a real backend

Copy `.env.example` to `.env` and set your API's base URL:

```
VITE_API_BASE_URL=https://your-api.com
```

The client expects two endpoints:

- `GET /api/categories` → array of `{ id, name, discountLabel, image }`
- `GET /api/products?category=&search=` → array of
  `{ id, name, category, price, oldPrice, discountPercent, unit, image, inStock }`

If `VITE_API_BASE_URL` is unset, the request times out, or the response isn't
OK, the app silently falls back to the realistic mock data in
`src/data/mockData.js` — so the storefront always renders something, even
offline or before your backend is live.

## Project structure

```
src/
  api/client.js          fetch + mock fallback logic
  data/mockData.js        local product/category seed data
  context/CartContext.jsx     cart state (add/remove/qty/total)
  context/FilterContext.jsx   active category + search query + menu state
  components/              Header, SearchBar, MenuDrawer, Hero,
                            CategoryGrid, ProductCard, ProductGrid,
                            CartDrawer, WhatsAppButton, Footer
  App.jsx                  page composition + data fetching
```

## Deploying to Vercel

1. Push this project to a Git repository.
2. Import it in Vercel — the Vite framework preset is auto-detected.
3. Add `VITE_API_BASE_URL` under Project Settings → Environment Variables if
   you have a live backend (optional — the app works without one).
4. Deploy. Build command `npm run build`, output directory `dist`.

## Customizing

- **WhatsApp number**: update `WHATSAPP_NUMBER` in
  `src/components/WhatsAppButton.jsx` and the links in `Footer.jsx`.
- **Brand colors/fonts**: edit the `maroon`/`cream`/`ink`/`gold` palette and
  `display`/`sans` font families in `tailwind.config.js`.
- **Categories & products**: edit `src/data/mockData.js`, or point
  `VITE_API_BASE_URL` at a live API.
