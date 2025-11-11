import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const itemCount = computed(() => {
    return items.value.reduce((total: number, item: CartItem) => total + item.quantity, 0)
  })

  // Total price: sum of (price * quantity) for all items
  const total = computed(() => {
    return items.value.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
  })

  const addToCart = (product: Product) => {
    const existingItem = items.value.find((item: CartItem) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (productId: string) => {
    const index = items.value.findIndex((item: CartItem) => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const item = items.value.find((item: CartItem) => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    itemCount,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
})
