<template>
  <div class="checkout">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <i class="pi pi-shopping-cart text-6xl text-gray-300 mb-4"></i>
      <p class="text-xl text-gray-600 mb-4">Your cart is empty</p>
      <Button label="Browse Products" icon="pi pi-arrow-left" @click="$router.push('/')" />
    </div>

    <div v-else>
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subtotal</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in cartStore.items"
                :key="item.id"
                class="border-b border-gray-200 hover:bg-gray-50"
              >
                <td class="px-6 py-4">
                  <img
                    :src="item.imageUrl"
                    :alt="item.name"
                    class="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td class="px-6 py-4">
                  <router-link
                    :to="`/products/${item.id}`"
                    class="text-blue-600 hover:underline font-medium"
                  >
                    {{ item.name }}
                  </router-link>
                </td>
                <td class="px-6 py-4 text-gray-600">{{ formatCategory(item.category) }}</td>
                <td class="px-6 py-4 text-gray-700">${{ formatPrice(item.price) }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <Button
                      icon="pi pi-minus"
                      @click="decreaseQuantity(item.id)"
                      class="p-button-rounded p-button-text p-button-sm"
                      :disabled="item.quantity <= 1"
                    />
                    <span class="w-12 text-center text-gray-700">{{ item.quantity }}</span>
                    <Button
                      icon="pi pi-plus"
                      @click="increaseQuantity(item.id)"
                      class="p-button-rounded p-button-text p-button-sm"
                    />
                  </div>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-800">
                  ${{ formatPrice(item.price * item.quantity) }}
                </td>
                <td class="px-6 py-4">
                  <Button
                    icon="pi pi-trash"
                    @click="removeItem(item.id)"
                    class="p-button-danger p-button-text"
                    aria-label="Remove from cart"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <span class="text-xl font-semibold text-gray-700">Total:</span>
          <span class="text-3xl font-bold text-blue-600">
            ${{ formatPrice(cartStore.total) }}
          </span>
        </div>
        <div class="flex gap-4 mt-6">
          <Button
            label="Continue Shopping"
            icon="pi pi-arrow-left"
            @click="$router.push('/')"
            class="p-button-outlined flex-1"
          />
          <Button label="Place Order" icon="pi pi-check" class="flex-1" @click="placeOrder" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'primevue/usetoast'
import { formatCategory, formatPrice } from '@/utils/formatters'
import {
  increaseProductQuantity,
  decreaseProductQuantity,
  removeItemWithNotification,
} from '@/utils/cart'

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const removeItem = (productId: string) => {
  removeItemWithNotification(productId, cartStore, toast)
}

const increaseQuantity = (productId: string) => {
  increaseProductQuantity(productId, cartStore)
}

const decreaseQuantity = (productId: string) => {
  decreaseProductQuantity(productId, cartStore)
}

// Place order: show success message, clear cart, redirect to home
const placeOrder = () => {
  toast.add({
    severity: 'success',
    summary: 'Order Placed',
    detail: `Your order of $${formatPrice(cartStore.total)} has been placed successfully!`,
    life: 5000,
  })
  cartStore.clearCart()
  // Redirect to home after 2 seconds
  setTimeout(() => {
    router.push('/')
  }, 2000)
}
</script>
