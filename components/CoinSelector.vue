<template>
  <div class="relative">
    <label for="coin-search" class="block text-xs font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-2">
      Select Cryptocurrency
    </label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        id="coin-search"
        v-model="searchQuery"
        type="text"
        placeholder="Search by name or symbol..."
        class="w-full pl-10 pr-4 py-3 text-base border border-primary-200 dark:border-primary-700 rounded-lg bg-white dark:bg-primary-800 text-primary-900 dark:text-primary-50 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
        @focus="showDropdown = true"
        @keydown.down.prevent="navigateDown"
        @keydown.up.prevent="navigateUp"
        @keydown.enter.prevent="selectHighlighted"
        @keydown.esc="closeDropdown"
        aria-label="Search for cryptocurrency"
        aria-autocomplete="list"
        :aria-expanded="showDropdown"
        aria-controls="coin-list"
      />
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="showDropdown && searchQuery.length > 0"
        id="coin-list"
        class="absolute z-10 mt-2 w-full bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg shadow-lg max-h-80 overflow-auto"
        role="listbox"
      >
        <div v-if="loading" class="px-4 py-8 text-center text-primary-500">
          <div class="inline-block animate-spin rounded-full h-6 w-6 border-2 border-primary-300 border-t-accent-500"></div>
          <p class="mt-2 text-sm">Loading cryptocurrencies...</p>
        </div>

        <div v-else-if="filteredCoins.length === 0" class="px-4 py-8 text-center text-primary-500">
          <svg class="mx-auto h-12 w-12 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="mt-2 text-sm">No cryptocurrencies found</p>
          <p class="text-xs text-primary-400 mt-1">Try a different search term</p>
        </div>

        <ul v-else class="py-2">
          <li
            v-for="(coin, index) in filteredCoins.slice(0, 50)"
            :key="coin.id"
            :class="[
              'px-4 py-3 cursor-pointer transition-colors',
              index === highlightedIndex
                ? 'bg-accent-50 dark:bg-primary-700'
                : 'hover:bg-primary-50 dark:hover:bg-primary-700'
            ]"
            @click="selectCoin(coin)"
            @mouseenter="highlightedIndex = index"
            role="option"
            :aria-selected="index === highlightedIndex"
          >
            <div class="flex items-center justify-between">
              <div>
                <span class="font-semibold text-primary-900 dark:text-primary-50">{{ coin.name }}</span>
                <span class="ml-2 text-sm text-primary-500 dark:text-primary-400">{{ coin.symbol }}</span>
              </div>
              <span v-if="coin.rank" class="text-xs text-primary-400 dark:text-primary-500">#{{ coin.rank }}</span>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CoinListItem } from '~/types/coinmarketcap'

const emit = defineEmits<{
  select: [coin: CoinListItem]
}>()

const searchQuery = ref('')
const showDropdown = ref(false)
const highlightedIndex = ref(0)
const coins = ref<CoinListItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

let debounceTimer: NodeJS.Timeout | null = null

const filteredCoins = computed(() => {
  if (!searchQuery.value) return []

  const query = searchQuery.value.toLowerCase().trim()
  return coins.value.filter(coin =>
    coin.name.toLowerCase().includes(query) ||
    coin.symbol.toLowerCase().includes(query)
  )
})

watch(searchQuery, (newValue) => {
  if (newValue.length > 0) {
    showDropdown.value = true
    highlightedIndex.value = 0

    if (coins.value.length === 0) {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(fetchCoins, 300)
    }
  } else {
    showDropdown.value = false
  }
})

async function fetchCoins() {
  if (coins.value.length > 0) return

  loading.value = true
  error.value = null

  try {
    coins.value = await $fetch<CoinListItem[]>('/api/coins/list')
  } catch (e: any) {
    error.value = e.message || 'Failed to fetch coins'
    console.error('Error fetching coins:', e)
  } finally {
    loading.value = false
  }
}

function selectCoin(coin: CoinListItem) {
  emit('select', coin)
  searchQuery.value = `${coin.name} (${coin.symbol})`
  showDropdown.value = false
}

function selectHighlighted() {
  if (filteredCoins.value.length > 0 && highlightedIndex.value >= 0) {
    selectCoin(filteredCoins.value[highlightedIndex.value])
  }
}

function navigateDown() {
  if (highlightedIndex.value < Math.min(filteredCoins.value.length - 1, 49)) {
    highlightedIndex.value++
  }
}

function navigateUp() {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--
  }
}

function closeDropdown() {
  showDropdown.value = false
}
</script>
