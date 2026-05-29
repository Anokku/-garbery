export interface Product {
  id: string
  name: string
  nameEn: string
  price: number
  category: string
  description: string
  images: string[]
  sizes: string[]
  colors: Color[]
  isNew?: boolean
  rankingPosition?: number
}

export interface Color {
  name: string
  hex: string
}

export interface CartItem {
  product: Product
  size: string
  color: string
  quantity: number
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: 'CLEAR_CART' }
