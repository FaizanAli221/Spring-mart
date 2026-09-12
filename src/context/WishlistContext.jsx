import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('springs_wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('springs_wishlist', JSON.stringify(wishlistItems))
    } catch {
      // ignore localStorage errors
    }
  }, [wishlistItems])

  const isWishlisted = useCallback(
    (productId) => wishlistItems.some((item) => item.id === productId),
    [wishlistItems]
  )

  const toggleWishlist = useCallback((product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id)
      if (exists) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [product, ...prev]
    })
  }, [])

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const clearWishlist = useCallback(() => {
    setWishlistItems([])
  }, [])

  const value = {
    wishlistItems,
    wishlistCount: wishlistItems.length,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider')
  return ctx
}
