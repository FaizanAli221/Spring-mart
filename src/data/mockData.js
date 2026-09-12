// Realistic local mock data used whenever the backend API is unreachable
// or VITE_API_BASE_URL is not configured. Prices are in PKR.

export const mockCategories = [
  { id: 'beauty', name: 'Beauty', discountLabel: 'UP TO 35% OFF', image: 'https://picsum.photos/seed/springs-beauty/300/300' },
  { id: 'k-beauty', name: 'K-Beauty', discountLabel: 'UP TO 35% OFF', image: 'https://picsum.photos/seed/springs-kbeauty/300/300' },
  { id: 'food-cupboard', name: 'Food Cupboard', discountLabel: 'FLAT 10% OFF', image: 'https://picsum.photos/seed/springs-food/300/300' },
  { id: 'drinks', name: 'Drinks', discountLabel: 'FLAT 10% OFF', image: 'https://picsum.photos/seed/springs-drinks/300/300' },
  { id: 'electronics', name: 'Electronics', discountLabel: 'FLAT 15% OFF', image: 'https://picsum.photos/seed/springs-electronics/300/300' },
  { id: 'perfumery', name: 'Perfumery', discountLabel: 'UP TO 35% OFF', image: 'https://picsum.photos/seed/springs-perfume/300/300' },
  { id: 'cosmetics', name: 'Cosmetics', discountLabel: 'FLAT 15% OFF', image: 'https://picsum.photos/seed/springs-cosmetics/300/300' },
  { id: 'baby-food', name: 'Baby & Mom', discountLabel: 'FLAT 10% OFF', image: 'https://picsum.photos/seed/springs-baby/300/300' },
  { id: 'home', name: 'Home & Beyond', discountLabel: 'FLAT 15% OFF', image: 'https://picsum.photos/seed/springs-home/300/300' },
  { id: 'household', name: 'Household', discountLabel: 'FLAT 10% OFF', image: 'https://picsum.photos/seed/springs-household/300/300' },
  { id: 'frozen', name: 'Frozen', discountLabel: 'FLAT 10% OFF', image: 'https://picsum.photos/seed/springs-frozen/300/300' },
  { id: 'pet', name: 'Pet', discountLabel: 'FLAT 10% OFF', image: 'https://picsum.photos/seed/springs-pet/300/300' },
]

export const mockProducts = [
  { id: 'p1', name: 'Nescafe Gold Iced Coffee Sachets', category: 'Drinks', price: 890, oldPrice: 990, discountPercent: 10, unit: '10 sachets', image: 'https://picsum.photos/seed/springs-p1/400/400', inStock: true },
  { id: 'p2', name: 'Clinique Moisture Surge Gel Cream', category: 'Beauty', price: 6450, oldPrice: 9900, discountPercent: 35, unit: '50ml', image: 'https://picsum.photos/seed/springs-p2/400/400', inStock: true },
  { id: 'p3', name: 'Medicube Zero Pore Pad', category: 'K-Beauty', price: 3200, oldPrice: 4200, discountPercent: 24, unit: '70 pads', image: 'https://picsum.photos/seed/springs-p3/400/400', inStock: true },
  { id: 'p4', name: 'Takis Fuego Rolled Tortilla Chips', category: 'Food Cupboard', price: 450, oldPrice: 500, discountPercent: 10, unit: '92.3g', image: 'https://picsum.photos/seed/springs-p4/400/400', inStock: true },
  { id: 'p5', name: 'Heinz Tomato Ketchup', category: 'Food Cupboard', price: 620, oldPrice: 690, discountPercent: 10, unit: '910g', image: 'https://picsum.photos/seed/springs-p5/400/400', inStock: true },
  { id: 'p6', name: 'Philips Bean-to-Cup Coffee Machine', category: 'Electronics', price: 89999, oldPrice: 105999, discountPercent: 15, unit: '1 unit', image: 'https://picsum.photos/seed/springs-p6/400/400', inStock: true },
  { id: 'p7', name: 'Dior Sauvage Eau de Toilette', category: 'Perfumery', price: 24500, oldPrice: 31000, discountPercent: 21, unit: '100ml', image: 'https://picsum.photos/seed/springs-p7/400/400', inStock: true },
  { id: 'p8', name: 'MAC Hyper Real SkinCanvas Balm', category: 'Cosmetics', price: 7200, oldPrice: 8500, discountPercent: 15, unit: '30ml', image: 'https://picsum.photos/seed/springs-p8/400/400', inStock: true },
  { id: 'p9', name: 'Rimmel Stay Matte Pressed Powder', category: 'Cosmetics', price: 1450, oldPrice: 1700, discountPercent: 15, unit: '14g', image: 'https://picsum.photos/seed/springs-p9/400/400', inStock: true },
  { id: 'p10', name: 'Aveeno Baby Ultra Air Sunscreen', category: 'Baby & Mom', price: 2650, oldPrice: 2950, discountPercent: 10, unit: '85g', image: 'https://picsum.photos/seed/springs-p10/400/400', inStock: true },
  { id: 'p11', name: 'Babi Mila Organic Puree Pouch', category: 'Baby & Mom', price: 380, oldPrice: 420, discountPercent: 10, unit: '90g', image: 'https://picsum.photos/seed/springs-p11/400/400', inStock: true },
  { id: 'p12', name: 'Tide Instant White Liquid Detergent', category: 'Household', price: 1150, oldPrice: 1280, discountPercent: 10, unit: '1.5L', image: 'https://picsum.photos/seed/springs-p12/400/400', inStock: true },
  { id: 'p13', name: 'Vanish Oxi Action Stain Remover', category: 'Household', price: 980, oldPrice: 1090, discountPercent: 10, unit: '500g', image: 'https://picsum.photos/seed/springs-p13/400/400', inStock: true },
  { id: 'p14', name: 'Movenpick Almond Magnum Ice Cream', category: 'Frozen', price: 720, oldPrice: 800, discountPercent: 10, unit: '4 pack', image: 'https://picsum.photos/seed/springs-p14/400/400', inStock: true },
  { id: 'p15', name: 'Deline Frozen Chicken Nuggets', category: 'Frozen', price: 890, oldPrice: 990, discountPercent: 10, unit: '400g', image: 'https://picsum.photos/seed/springs-p15/400/400', inStock: true },
  { id: 'p16', name: 'Josi Dog Active Adult Dry Food', category: 'Pet', price: 4200, oldPrice: 4650, discountPercent: 10, unit: '15kg', image: 'https://picsum.photos/seed/springs-p16/400/400', inStock: true },
  { id: 'p17', name: 'Whiskas Chicken & Salmon Wet Food', category: 'Pet', price: 320, oldPrice: 355, discountPercent: 10, unit: '85g', image: 'https://picsum.photos/seed/springs-p17/400/400', inStock: true },
  { id: 'p18', name: 'Springs Bakery Sourdough Loaf', category: 'Food Cupboard', price: 550, oldPrice: 550, discountPercent: 0, unit: '1 loaf', image: 'https://picsum.photos/seed/springs-p18/400/400', inStock: true },
  { id: 'p19', name: 'The Ordinary Niacinamide 10% Serum', category: 'Beauty', price: 2100, oldPrice: 2600, discountPercent: 19, unit: '30ml', image: 'https://picsum.photos/seed/springs-p19/400/400', inStock: true },
  { id: 'p20', name: 'WD-40 Multi-Use Spray', category: 'Household', price: 890, oldPrice: 990, discountPercent: 10, unit: '311g', image: 'https://picsum.photos/seed/springs-p20/400/400', inStock: false },
]

export const mockQuickLinks = ['Cafe', 'Bakery', 'Stores']

export const mockDrawerCategories = [
  'Health & Beauty',
  'Food Cupboard',
  'Drinks',
  'Electronics',
  'Perfumery',
  'Cosmetic Range',
  'Pharmacy',
  'Pet Products',
  'Home & Entertainment',
  'Fresh Food & Dairy',
  'Frozen Food',
]

export const popularSearches = [
  'Chocolates', 'Candies, Gums & Mints', 'Chips, Snacks & Popcorn', 'Biscuits, Wafers & Cakes',
  'Cereals, Oats & Granolas', 'Sauces, Pickles & Pastes', 'Masala, Herbs & Seasoning',
  'Grains, Beans & Pulses', 'Dry Fruits, Nuts & Seeds', 'Ketchups & Mayonnaise', 'Oil & Ghee',
  'Fresh Fruits', 'Fresh Vegetables', 'Frozen Food', 'Ice Cream & Ice Lollies',
]
