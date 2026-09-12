import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // [{ product, qty }]
  const [isCartOpen, setCartOpen] = useState(false)

  const addToCart = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + qty } : item
        )
      }
      return [...prev, { product, qty }]
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const updateQty = useCallback((productId, qty) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId))
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, qty } : item))
    )
  }, [])

  const getQty = useCallback(
    (productId) => items.find((item) => item.product.id === productId)?.qty ?? 0,
    [items]
  )

  const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items])
  const cartTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [items]
  )

  const clearCart = useCallback(() => setItems([]), [])

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    getQty,
    cartCount,
    cartTotal,
    isCartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
