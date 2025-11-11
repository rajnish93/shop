<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <img
            src="/logos/buhler-logo.svg"
            alt="Logo"
            class="h-10 md:h-12 cursor-pointer hover:opacity-80 transition-opacity"
            style="max-width: 200px; height: auto"
          />
        </router-link>

        <!-- Date and Time -->
        <div class="flex-1 flex justify-center">
          <div class="text-gray-700 font-medium">
            {{ currentDateTime }}
          </div>
        </div>

        <!-- Cart -->
        <router-link
          to="/checkout"
          class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <i class="pi pi-shopping-cart text-xl"></i>
          <span class="font-semibold">Cart ({{ cartStore.itemCount }})</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const currentDateTime = ref('')

// Update date/time display every second
const updateDateTime = () => {
  const now = new Date()
  currentDateTime.value = now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

let intervalId: number | undefined

onMounted(() => {
  updateDateTime()
  intervalId = window.setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
