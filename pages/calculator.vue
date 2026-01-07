<template>
  <div>
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold text-primary-900 dark:text-primary-50 mb-3 tracking-tight">
          Market Cap Calculator
        </h1>
        <p class="text-base text-primary-600 dark:text-primary-300 max-w-2xl mx-auto">
          Analyze cryptocurrency market capitalization scenarios with real-time data
        </p>
      </header>

      <!-- Progress Indicator -->
      <div class="flex items-center justify-center mb-10">
        <div class="flex items-center space-x-3">
          <div :class="[
            'flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold',
            currentStep >= 1 ? 'bg-accent-500 text-white' : 'bg-primary-200 dark:bg-primary-700 text-primary-500'
          ]">
            1
          </div>
          <div :class="[
            'w-12 h-0.5',
            currentStep >= 2 ? 'bg-accent-500' : 'bg-primary-200 dark:bg-primary-700'
          ]"></div>
          <div :class="[
            'flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold',
            currentStep >= 2 ? 'bg-accent-500 text-white' : 'bg-primary-200 dark:bg-primary-700 text-primary-500'
          ]">
            2
          </div>
          <div :class="[
            'w-12 h-0.5',
            currentStep >= 3 ? 'bg-accent-500' : 'bg-primary-200 dark:bg-primary-700'
          ]"></div>
          <div :class="[
            'flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold',
            currentStep >= 3 ? 'bg-accent-500 text-white' : 'bg-primary-200 dark:bg-primary-700 text-primary-500'
          ]">
            3
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="space-y-10">
        <!-- Step 1: Coin Selection -->
        <div>
          <CoinSelector @select="handleCoinSelect" />
        </div>

        <!-- Step 2: Coin Summary (appears after selection) -->
        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 translate-y-4"
          enter-to-class="transform opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="transform opacity-100 translate-y-0"
          leave-to-class="transform opacity-0 translate-y-4"
        >
          <div v-if="selectedCoin && coinDetails">
            <CoinSummaryCard
              :coin-name="coinDetails.name"
              :coin-symbol="coinDetails.symbol"
              :current-price="coinDetails.currentPrice"
              :circulating-supply="coinDetails.circulatingSupply"
              :market-cap="coinDetails.marketCap"
            />
          </div>
        </transition>

        <!-- Mode Toggle (appears after coin summary) -->
        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 translate-y-4"
          enter-to-class="transform opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="transform opacity-100 translate-y-0"
          leave-to-class="transform opacity-0 translate-y-4"
        >
          <div v-if="coinDetails" class="flex justify-center">
            <CalculationModeToggle v-model="calculationMode" />
          </div>
        </transition>

        <!-- Step 3: Input (appears after mode selection) -->
        <transition
          mode="out-in"
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 translate-y-4"
          enter-to-class="transform opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="transform opacity-100 translate-y-0"
          leave-to-class="transform opacity-0 translate-y-4"
        >
          <div v-if="coinDetails">
            <TargetPriceInput v-if="calculationMode === 'price'" v-model="targetPrice" />
            <TargetMarketCapInput v-else v-model="targetMarketCap" />
          </div>
        </transition>

        <!-- Calculate Button -->
        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 translate-y-4"
          enter-to-class="transform opacity-100 translate-y-0"
        >
          <div v-if="canCalculate" class="flex justify-center">
            <button
              @click="calculateMarketCap"
              :disabled="calculating || !canCalculate"
              class="px-8 py-3 bg-accent-500 hover:bg-accent-600 disabled:bg-primary-300 dark:disabled:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
            >
              <span v-if="calculating" class="flex items-center space-x-2">
                <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ buttonText }}</span>
              </span>
              <span v-else>{{ buttonText }}</span>
            </button>
          </div>
        </transition>

        <!-- Error Display -->
        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 translate-y-4"
          enter-to-class="transform opacity-100 translate-y-0"
        >
          <div v-if="error" class="bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg p-4">
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-danger-600 dark:text-danger-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="text-sm font-medium text-danger-800 dark:text-danger-200">{{ error }}</p>
              </div>
            </div>
          </div>
        </transition>

        <!-- Step 4: Results (appears after calculation) -->
        <transition
          enter-active-class="transition ease-out duration-500"
          enter-from-class="transform opacity-0 translate-y-8"
          enter-to-class="transform opacity-100 translate-y-0"
        >
          <div v-if="results">
            <MarketCapResults :results="results" />
          </div>
        </transition>
      </div>

      <!-- Footer -->
      <footer class="mt-16 pt-8 border-t border-primary-200 dark:border-primary-700 text-center">
        <p class="text-xs text-primary-500 dark:text-primary-400">
          Market data powered by CoinMarketCap. Calculations are for informational purposes only and should not be considered financial advice.
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CoinListItem, CalculationResult } from '~/types/coinmarketcap'

const { name } = useBrand()

useHead({
  title: `Market Cap Calculator - ${name}`,
  meta: [
    {
      name: 'description',
      content: 'Calculate crypto market cap from target price or price from target market cap. Professional bidirectional analysis tool.'
    }
  ]
})

type CalculationMode = 'price' | 'marketCap'

const selectedCoin = ref<CoinListItem | null>(null)
const coinDetails = ref<{
  id: number
  name: string
  symbol: string
  currentPrice: number
  circulatingSupply: number
  marketCap: number
  volume24h: number
  percentChange24h: number
} | null>(null)
const calculationMode = ref<CalculationMode>('price')
const targetPrice = ref<number | null>(null)
const targetMarketCap = ref<number | null>(null)
const results = ref<CalculationResult | null>(null)
const calculating = ref(false)
const loadingDetails = ref(false)
const error = ref<string | null>(null)

// Reset inputs when mode changes
watch(calculationMode, () => {
  targetPrice.value = null
  targetMarketCap.value = null
  results.value = null
  error.value = null
})

const currentStep = computed(() => {
  if (results.value) return 3
  if (coinDetails.value && (targetPrice.value || targetMarketCap.value)) return 3
  if (coinDetails.value) return 2
  if (selectedCoin.value) return 2
  return 1
})

const buttonText = computed(() => {
  if (calculating.value) return 'Calculating...'
  return calculationMode.value === 'price' ? 'Calculate Market Cap' : 'Calculate Price'
})

const canCalculate = computed(() => {
  if (!coinDetails.value) return false
  if (calculationMode.value === 'price') {
    return targetPrice.value !== null && targetPrice.value > 0
  } else {
    return targetMarketCap.value !== null && targetMarketCap.value > 0
  }
})

async function handleCoinSelect(coin: CoinListItem) {
  selectedCoin.value = coin
  coinDetails.value = null
  targetPrice.value = null
  targetMarketCap.value = null
  results.value = null
  error.value = null
  loadingDetails.value = true

  try {
    const details = await $fetch<{
      id: number
      name: string
      symbol: string
      currentPrice: number
      circulatingSupply: number
      marketCap: number
      volume24h: number
      percentChange24h: number
    }>(`/api/coins/${coin.slug}`)

    coinDetails.value = details
  } catch (e: any) {
    error.value = e.data?.message || 'Failed to load coin details. Please try again.'
    console.error('Error fetching coin details:', e)
  } finally {
    loadingDetails.value = false
  }
}

async function calculateMarketCap() {
  if (!selectedCoin.value) return

  calculating.value = true
  error.value = null
  results.value = null

  try {
    if (calculationMode.value === 'price') {
      if (!targetPrice.value) return
      const result = await $fetch<CalculationResult>('/api/market-cap', {
        params: {
          slug: selectedCoin.value.slug,
          price: targetPrice.value,
          mode: 'price'
        }
      })
      results.value = result
    } else {
      if (!targetMarketCap.value) return
      const result = await $fetch<CalculationResult>('/api/market-cap', {
        params: {
          slug: selectedCoin.value.slug,
          marketCap: targetMarketCap.value,
          mode: 'marketCap'
        }
      })
      results.value = result
    }
  } catch (e: any) {
    error.value = e.data?.message || 'Failed to calculate. Please try again.'
    console.error('Error calculating:', e)
  } finally {
    calculating.value = false
  }
}
</script>
