<template>
  <div class="bg-white dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg shadow-card p-6">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-primary-900 dark:text-primary-50">{{ coinName }}</h2>
      <p class="text-sm text-primary-500 dark:text-primary-400 uppercase tracking-wide">{{ coinSymbol }}</p>
    </div>

    <div class="space-y-4">
      <div class="border-t border-primary-100 dark:border-primary-700 pt-4">
        <p class="text-xs font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-1">
          Current Price
        </p>
        <p class="text-3xl font-bold text-primary-900 dark:text-primary-50">
          {{ formatCurrency(currentPrice) }}
        </p>
      </div>

      <div class="border-t border-primary-100 dark:border-primary-700 pt-4">
        <p class="text-xs font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-1">
          Circulating Supply
        </p>
        <p class="text-2xl font-bold text-primary-900 dark:text-primary-50">
          {{ formatSupply(circulatingSupply) }} <span class="text-base font-normal text-primary-500">{{ coinSymbol }}</span>
        </p>
      </div>

      <div class="border-t border-primary-100 dark:border-primary-700 pt-4">
        <p class="text-xs font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-1">
          Market Cap
        </p>
        <p class="text-2xl font-bold text-primary-900 dark:text-primary-50">
          {{ formatMarketCap(marketCap) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  coinName: string
  coinSymbol: string
  currentPrice: number
  circulatingSupply: number
  marketCap: number
}

defineProps<Props>()

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

function formatSupply(value: number): string {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(2) + 'T'
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B'
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M'
  }
  return new Intl.NumberFormat('en-US').format(value)
}

function formatMarketCap(value: number): string {
  if (value >= 1e12) {
    return '$' + (value / 1e12).toFixed(2) + 'T'
  } else if (value >= 1e9) {
    return '$' + (value / 1e9).toFixed(2) + 'B'
  } else if (value >= 1e6) {
    return '$' + (value / 1e6).toFixed(2) + 'M'
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}
</script>
