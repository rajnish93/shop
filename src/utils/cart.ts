import { useCartStore, type CartItem } from '@/stores/cart'
import type { Product } from '@/types/product'
import type { ToastServiceMethods } from 'primevue/toastservice'

// Get quantity of a product in cart, returns 0 if not found
export const getCartQuantity = (
  productId: string,
  cartStore: ReturnType<typeof useCartStore>
): number => {
  const cartItem = cartStore.items.find((item: CartItem) => item.id === productId)
  return cartItem?.quantity || 0
}

// Add product to cart and show success toast
export const addToCartWithNotification = (
  product: Product,
  cartStore: ReturnType<typeof useCartStore>,
  toast: ToastServiceMethods
): void => {
  cartStore.addToCart(product)
  toast.add({
    severity: 'success',
    summary: 'Added to Cart',
    detail: `${product.name} has been added to your cart`,
    life: 3000,
  })
}

// Increase quantity for a product in cart
export const increaseProductQuantity = (
  productId: string,
  cartStore: ReturnType<typeof useCartStore>
): void => {
  const item = cartStore.items.find((item: CartItem) => item.id === productId)
  if (item) {
    cartStore.updateQuantity(productId, item.quantity + 1)
  }
}

// Decrease quantity, removes item if quantity reaches 0
export const decreaseProductQuantity = (
  productId: string,
  cartStore: ReturnType<typeof useCartStore>
): void => {
  const item = cartStore.items.find((item: CartItem) => item.id === productId)
  if (item) {
    if (item.quantity > 1) {
      cartStore.updateQuantity(productId, item.quantity - 1)
    } else {
      // Remove from cart when quantity is 1 and user decreases
      cartStore.removeFromCart(productId)
    }
  }
}

// Remove item from cart and show notification
export const removeItemWithNotification = (
  productId: string,
  cartStore: ReturnType<typeof useCartStore>,
  toast: ToastServiceMethods
): void => {
  cartStore.removeFromCart(productId)
  toast.add({
    severity: 'info',
    summary: 'Removed',
    detail: 'Product removed from cart',
    life: 3000,
  })
}
