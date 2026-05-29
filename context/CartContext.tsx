'use client'

import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import type { CartItem, CartAction } from '@/types'

interface CartState {
  items: CartItem[]
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  dispatch: React.Dispatch<CartAction>
  openCart: () => void
  closeCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, color, quantity } = action.payload
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.size === size && i.color === color
      )
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id && i.size === size && i.color === color
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        }
      }
      return { items: [...state.items, action.payload] }
    }

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (i) =>
            !(
              i.product.id === action.payload.productId &&
              i.size === action.payload.size &&
              i.color === action.payload.color
            )
        ),
      }

    case 'UPDATE_QUANTITY': {
      const { productId, size, color, quantity } = action.payload
      if (quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.size === size && i.color === color)
          ),
        }
      }
      return {
        items: state.items.map((i) =>
          i.product.id === productId && i.size === size && i.color === color
            ? { ...i, quantity }
            : i
        ),
      }
    }

    case 'CLEAR_CART':
      return { items: [] }

    default:
      return state
  }
}

const STORAGE_KEY = 'apparel-ec-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [isOpen, setIsOpen] = useState(false)

  // localStorage から復元
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const items = JSON.parse(stored) as CartItem[]
        items.forEach((item) => dispatch({ type: 'ADD_ITEM', payload: item }))
      }
    } catch { /* ignore */ }
  }, [])

  // localStorage へ保存
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch { /* ignore */ }
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items:      state.items,
        isOpen,
        dispatch,
        openCart:   () => setIsOpen(true),
        closeCart:  () => setIsOpen(false),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
