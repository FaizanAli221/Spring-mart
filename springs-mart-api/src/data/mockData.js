// In-memory mock data store. Replace with a real database when ready —
// the route handlers only depend on the shape of these arrays/functions.

const categories = [
  {
    id: 'food-cupboard',
    name: 'Food Cupboard',
    slug: 'food-cupboard',
    discountLabel: 'FLAT 10% OFF',
    image: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    slug: 'drinks',
    discountLabel: 'FLAT 10% OFF',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'beauty',
    name: 'Beauty',
    slug: 'beauty',
    discountLabel: 'UP TO 35% OFF',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'bakery',
    name: 'Bakery',
    slug: 'bakery',
    discountLabel: 'FLAT 15% OFF',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'household',
    name: 'Household',
    slug: 'household',
    discountLabel: 'FLAT 10% OFF',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'frozen',
    name: 'Frozen',
    slug: 'frozen',
    discountLabel: 'FLAT 10% OFF',
    image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&w=400&q=80',
  },
]

let products = [
  {
    id: 'nano-banana',
    name: 'Organic Nano Bananas (Mini Sweet Baby Bananas)',
    category: 'Food Cupboard',
    price: 380,
    oldPrice: 480,
    discountPercent: 21,
    unit: '500g bunch',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 42,
    image: '/images/nano-banana.jpg',
    description:
      'Fresh, vibrant, certified organic Nano Bananas. Naturally sweet, bite-sized mini bananas packed with potassium and vitamins. Perfect for healthy snacking, lunchboxes, smoothies, and breakfast bowls.',
  },
  {
    id: 'gemini-elixir',
    name: 'Gemini Sparkling Banana & Citrus Elixir',
    category: 'Drinks',
    price: 450,
    oldPrice: 600,
    discountPercent: 25,
    unit: '330ml can',
    inStock: true,
    featured: true,
    rating: 5.0,
    reviewsCount: 88,
    image: '/images/gemini-banana-drink.jpg',
    description:
      'Refreshing luxury sparkling energy elixir infused with real organic banana puree, citrus botanicals, and zero artificial sugar. Powered by natural electrolytes to refresh your mind and energize your day.',
  },
  { id: 'p1', name: 'Heinz Tomato Ketchup', category: 'Food Cupboard', price: 620, oldPrice: 690, discountPercent: 10, unit: '910g', inStock: true, image: 'https://images.unsplash.com/photo-1607301405390-d831c242f59b?auto=format&fit=crop&w=400&q=80' },
  { id: 'p2', name: 'Takis Fuego Rolled Tortilla Chips', category: 'Food Cupboard', price: 450, oldPrice: 500, discountPercent: 10, unit: '92.3g', inStock: true, image: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?auto=format&fit=crop&w=400&q=80' },
  { id: 'p3', name: 'Basmati Rice Premium', category: 'Food Cupboard', price: 980, oldPrice: 980, discountPercent: 0, unit: '5kg', inStock: true, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80' },
  { id: 'p4', name: 'Extra Virgin Olive Oil', category: 'Food Cupboard', price: 2450, oldPrice: 2800, discountPercent: 12, unit: '1L', inStock: true, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80' },
  { id: 'p5', name: 'Nescafe Gold Iced Coffee Sachets', category: 'Drinks', price: 890, oldPrice: 990, discountPercent: 10, unit: '10 sachets', inStock: true, image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=400&q=80' },
  { id: 'p6', name: 'Fresh Orange Juice', category: 'Drinks', price: 380, oldPrice: 420, discountPercent: 10, unit: '1L', inStock: true, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80' },
  { id: 'p7', name: 'Sparkling Mineral Water', category: 'Drinks', price: 150, oldPrice: 150, discountPercent: 0, unit: '1.5L', inStock: true, image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=400&q=80' },
  { id: 'p8', name: 'Green Tea Bags', category: 'Drinks', price: 520, oldPrice: 600, discountPercent: 13, unit: '25 bags', inStock: false, image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=400&q=80' },
  { id: 'p9', name: 'The Ordinary Niacinamide 10% Serum', category: 'Beauty', price: 2100, oldPrice: 2600, discountPercent: 19, unit: '30ml', inStock: true, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80' },
  { id: 'p10', name: 'Clinique Moisture Surge Gel Cream', category: 'Beauty', price: 6450, oldPrice: 9900, discountPercent: 35, unit: '50ml', inStock: true, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80' },
  { id: 'p11', name: 'Rimmel Stay Matte Pressed Powder', category: 'Beauty', price: 1450, oldPrice: 1700, discountPercent: 15, unit: '14g', inStock: true, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80' },
  { id: 'p12', name: 'Aveeno Ultra-Calming Moisturizer', category: 'Beauty', price: 2650, oldPrice: 2950, discountPercent: 10, unit: '75ml', inStock: true, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=400&q=80' },
  { id: 'p13', name: 'Springs Bakery Sourdough Loaf', category: 'Bakery', price: 550, oldPrice: 550, discountPercent: 0, unit: '1 loaf', inStock: true, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
  { id: 'p14', name: 'Chocolate Fudge Cake Slice', category: 'Bakery', price: 480, oldPrice: 550, discountPercent: 13, unit: '1 slice', inStock: true, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80' },
  { id: 'p15', name: 'Butter Croissant, pack of 4', category: 'Bakery', price: 620, oldPrice: 700, discountPercent: 11, unit: '4 pcs', inStock: true, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80' },
  { id: 'p16', name: 'Cinnamon Rolls, pack of 6', category: 'Bakery', price: 890, oldPrice: 890, discountPercent: 0, unit: '6 pcs', inStock: true, image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=400&q=80' },
  { id: 'p17', name: 'Tide Instant White Liquid Detergent', category: 'Household', price: 1150, oldPrice: 1280, discountPercent: 10, unit: '1.5L', inStock: true, image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=400&q=80' },
  { id: 'p18', name: 'Vanish Oxi Action Stain Remover', category: 'Household', price: 980, oldPrice: 1090, discountPercent: 10, unit: '500g', inStock: true, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=400&q=80' },
  { id: 'p19', name: 'WD-40 Multi-Use Spray', category: 'Household', price: 890, oldPrice: 990, discountPercent: 10, unit: '311g', inStock: false, image: 'https://images.unsplash.com/photo-1585421514284-efb74320798c?auto=format&fit=crop&w=400&q=80' },
  { id: 'p20', name: 'Movenpick Almond Magnum Ice Cream', category: 'Frozen', price: 720, oldPrice: 800, discountPercent: 10, unit: '4 pack', inStock: true, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80' },
  { id: 'p21', name: 'Deline Frozen Chicken Nuggets', category: 'Frozen', price: 890, oldPrice: 990, discountPercent: 10, unit: '400g', inStock: true, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80' },
  { id: 'p22', name: 'Frozen Mixed Berries', category: 'Frozen', price: 650, oldPrice: 650, discountPercent: 0, unit: '400g', inStock: true, image: 'https://images.unsplash.com/photo-1577003811926-53b288a6e5d0?auto=format&fit=crop&w=400&q=80' },
]

function getCategories() {
  return categories
}

function getProducts({ category, search, limit } = {}) {
  let results = [...products]

  if (category && category.toLowerCase() !== 'all') {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  if (search) {
    const q = search.trim().toLowerCase()
    results = results.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    )
  }

  const parsedLimit = Number.parseInt(limit, 10)
  if (Number.isInteger(parsedLimit) && parsedLimit > 0) {
    results = results.slice(0, parsedLimit)
  }

  return results
}

function getProductById(id) {
  return products.find((p) => p.id === id)
}

module.exports = { categories, products, getCategories, getProducts, getProductById }
