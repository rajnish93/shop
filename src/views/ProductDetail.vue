<template>
  <div class="product-detail">
    <Button
      label="Back to Products"
      icon="pi pi-arrow-left"
      @click="$router.push('/')"
      class="mb-6 p-button-text"
    />

    <div v-if="loading" class="text-center py-12">
      <i class="pi pi-spin pi-spinner text-4xl text-blue-600"></i>
      <p class="mt-4 text-gray-600">Loading product...</p>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="product" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="md:flex">
        <div class="md:w-1/2">
          <img :src="product.imageUrl" :alt="product.name" class="w-full h-96 object-cover" />
        </div>
        <div class="md:w-1/2 p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>
          <p class="text-lg text-gray-600 mb-2">
            <span class="font-semibold">Category:</span> {{ formatCategory(product.category) }}
          </p>
          <div class="mt-6 mb-8">
            <span class="text-4xl font-bold text-blue-600">
              ${{ formatPrice(product.price) }}
            </span>
          </div>
          <div v-if="productCartQuantity > 0" class="flex items-center gap-3">
            <Button
              icon="pi pi-minus"
              @click="handleDecreaseQuantity()"
              class="p-button-rounded p-button-text p-button-lg"
            />
            <span class="w-12 text-center text-xl font-medium text-gray-700">{{
              productCartQuantity
            }}</span>
            <Button
              icon="pi pi-plus"
              @click="handleIncreaseQuantity()"
              class="p-button-rounded p-button-text p-button-lg"
            />
          </div>
          <Button
            v-else
            label="Add to Cart"
            icon="pi pi-shopping-cart"
            @click="addToCart"
            class="p-button-lg w-full md:w-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { useCartStore } from '@/stores/cart'
import type { Product, ProductsData } from '@/types/product'
import { formatCategory, formatPrice } from '@/utils/formatters'
import {
  getCartQuantity,
  addToCartWithNotification,
  increaseProductQuantity,
  decreaseProductQuantity,
} from '@/utils/cart'

const route = useRoute()
const cartStore = useCartStore()
const toast = useToast()
const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchProduct = async () => {
  try {
    loading.value = true
    const response = await fetch('/products.json')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const data: ProductsData = await response.json()
    const productId = route.params.id as string

    const found = data.find((p: Product) => p.id === productId)
    if (found) {
      product.value = found
    } else {
      error.value = 'Product not found'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
}

const productCartQuantity = computed(() => {
  if (!product.value) return 0
  return getCartQuantity(product.value.id, cartStore)
})

const addToCart = () => {
  if (product.value) {
    addToCartWithNotification(product.value, cartStore, toast)
  }
}

const handleIncreaseQuantity = () => {
  if (product.value) {
    increaseProductQuantity(product.value.id, cartStore)
  }
}

const handleDecreaseQuantity = () => {
  if (product.value) {
    decreaseProductQuantity(product.value.id, cartStore)
  }
}

onMounted(() => {
  fetchProduct()
})
</script>
