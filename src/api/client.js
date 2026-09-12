import { mockCategories, mockProducts } from '../data/mockData'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const REQUEST_TIMEOUT_MS = 5000

function withTimeout(promise, ms) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), ms)
  return { promise: promise(controller.signal), clear: () => clearTimeout(timeout) }
}

async function safeFetch(path) {
  const url = BASE_URL ? `${BASE_URL}${path}` : path
  const { promise, clear } = withTimeout(
    (signal) => fetch(url, { signal, headers: { Accept: 'application/json' } }),
    REQUEST_TIMEOUT_MS
  )
  try {
    const res = await promise
    clear()
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return await res.json()
  } catch (err) {
    clear()
    console.warn(`[api] Falling back to mock data for ${path}:`, err.message)
    return null
  }
}

export async function checkApiHealth() {
  const url = BASE_URL ? `${BASE_URL}/api/health` : '/api/health'
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    if (!res.ok) return { ok: false, status: res.status }
    return { ok: true, ...(await res.json()) }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

export async function fetchCategories() {
  const res = await safeFetch('/api/categories')
  const categories = res?.data ?? res
  return Array.isArray(categories) ? categories : mockCategories
}

export async function fetchProducts({ category, search } = {}) {
  const query = new URLSearchParams()
  if (category) query.set('category', category)
  if (search) query.set('search', search)
  const qs = query.toString() ? `?${query.toString()}` : ''

  const res = await safeFetch(`/api/products${qs}`)
  const products = res?.data ?? res
  if (Array.isArray(products)) return products

  // Client-side filtering over mock data when the API is unavailable.
  let results = mockProducts
  if (category && category !== 'all') {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }
  if (search) {
    const q = search.trim().toLowerCase()
    results = results.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    )
  }
  return results
}

export async function createOrder(orderPayload) {
  const url = BASE_URL ? `${BASE_URL}/api/orders` : '/api/orders'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(orderPayload),
  })
  const json = await response.json()
  if (!response.ok) {
    const errorMessage =
      json?.error?.details?.join(', ') || json?.error?.message || 'Failed to place order'
    throw new Error(errorMessage)
  }
  return json.data
}
