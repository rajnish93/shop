<template>
  <div class="product-list">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>

    <div v-if="loading" class="text-center py-12">
      <i class="pi pi-spin pi-spinner text-4xl text-blue-600"></i>
      <p class="mt-4 text-gray-600">Loading products...</p>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <div v-else>
      <div v-for="section in groupedProducts" :key="section.category" class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-blue-500 pb-2">
          {{ section.categoryName }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="product in section.products"
            :key="product.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <router-link :to="`/products/${product.id}`">
              <img :src="product.imageUrl" :alt="product.name" class="w-full h-48 object-cover" />
            </router-link>
            <div class="p-4">
              <router-link :to="`/products/${product.id}`">
                <h3 class="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600">
                  {{ product.name }}
                </h3>
              </router-link>
              <p class="text-gray-600 text-sm mb-2">{{ formatCategory(product.category) }}</p>
              <div class="flex items-center justify-between mt-4">
                <span class="text-2xl font-bold text-blue-600">
                  ${{ formatPrice(product.price) }}
                </span>
                <div v-if="getProductCartQuantity(product) > 0" class="flex items-center gap-2">
                  <Button
                    icon="pi pi-minus"
                    @click="handleDecreaseQuantity(product.id)"
                    class="p-button-rounded p-button-text p-button-sm"
                  />
                  <span class="w-8 text-center font-medium text-gray-700">{{
                    getProductCartQuantity(product)
                  }}</span>
                  <Button
                    icon="pi pi-plus"
                    @click="handleIncreaseQuantity(product.id)"
                    class="p-button-rounded p-button-text p-button-sm"
                  />
                </div>
                <Button
                  v-else
                  label="Add to Cart"
                  icon="pi pi-shopping-cart"
                  @click="addToCart(product)"
                  class="p-button-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { useCartStore } from '@/stores/cart'
import type { ProductsData, Product } from '@/types/product'
import { formatCategory, formatPrice } from '@/utils/formatters'
import {
  getCartQuantity,
  addToCartWithNotification,
  increaseProductQuantity,
  decreaseProductQuantity,
} from '@/utils/cart'

const cartStore = useCartStore()
const toast = useToast()
const productsData = ref<ProductsData | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Group products by category for display
const groupedProducts = computed(() => {
  if (!productsData.value) return []

  const groups = new Map<string, Product[]>()

  productsData.value.forEach(product => {
    if (!groups.has(product.category)) {
      groups.set(product.category, [])
    }
    groups.get(product.category)!.push(product)
  })

  // Convert map to array with formatted category names
  return Array.from(groups.entries()).map(([category, products]) => ({
    category,
    categoryName: formatCategory(category),
    products,
  }))
})

const fetchProducts = async () => {
  try {
    loading.value = true
    const response = await fetch('/products.json')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    productsData.value = await response.json()
    error.value = null
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
}

const getProductCartQuantity = (product: Product): number => {
  return getCartQuantity(product.id, cartStore)
}

const addToCart = (product: Product) => {
  addToCartWithNotification(product, cartStore, toast)
}

const handleIncreaseQuantity = (productId: string) => {
  increaseProductQuantity(productId, cartStore)
}

const handleDecreaseQuantity = (productId: string) => {
  decreaseProductQuantity(productId, cartStore)
}

onMounted(() => {
  fetchProducts()
})
</script>
