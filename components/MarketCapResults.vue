<template>
  <div class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-800 dark:to-primary-900 border border-primary-200 dark:border-primary-700 rounded-lg shadow-lg p-8">
    <div class="mb-6">
      <h3 class="text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-2">
        Target Scenario
      </h3>
      <p class="text-3xl font-bold text-primary-900 dark:text-primary-50">
        {{ formatCurrency(results.targetPrice) }} <span class="text-lg text-primary-500 dark:text-primary-400">per {{ results.coinSymbol }}</span>
      </p>
    </div>

    <div class="border-t border-primary-200 dark:border-primary-700 pt-6 mb-6">
      <h3 class="text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-2">
        Required Market Cap
      </h3>
      <p class="text-5xl font-bold text-primary-900 dark:text-primary-50 mb-2">
        {{ formatMarketCap(results.requiredMarketCap) }}
      </p>
      <p class="text-sm text-primary-600 dark:text-primary-300">
        Market capitalization needed
      </p>
    </div>

    <div class="border-t border-primary-200 dark:border-primary-700 pt-6 mb-6">
      <h3 class="text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-2">
        Growth Required
      </h3>
      <div class="flex items-baseline gap-3">
        <p
          class="text-4xl font-bold"
          :class="getMultiplierColorClass(results.multiplier)"
        >
          {{ results.multiplier.toFixed(2) }}×
        </p>
        <span
          class="px-3 py-1 rounded-full text-sm font-semibold"
          :class="getMultiplierBadgeClass(results.multiplier)"
        >
          {{ getMultiplierLabel(results.multiplier) }}
        </span>
      </div>
      <p class="text-sm text-primary-600 dark:text-primary-300 mt-3">
        {{ getMultiplierDescription(results.multiplier) }}
      </p>
    </div>

    <div class="border-t border-primary-200 dark:border-primary-700 pt-6">
      <h3 class="text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-4">
        Comparison
      </h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white/50 dark:bg-primary-800/50 rounded-lg p-4">
          <p class="text-xs text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-1">Current</p>
          <p class="text-xl font-bold text-primary-900 dark:text-primary-50">{{ formatMarketCap(results.currentMarketCap) }}</p>
        </div>
        <div class="bg-white/50 dark:bg-primary-800/50 rounded-lg p-4">
          <p class="text-xs text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-1">Required</p>
          <p class="text-xl font-bold text-primary-900 dark:text-primary-50">{{ formatMarketCap(results.requiredMarketCap) }}</p>
        </div>
      </div>
    </div>

    <!-- Export & Share Section -->
    <div class="border-t border-primary-200 dark:border-primary-700 pt-6 mt-6">
      <h3 class="text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-2">
        Export & Share
      </h3>
      <p class="text-sm text-primary-600 dark:text-primary-300 mb-4">
        Download this analysis as an image or share it on X
      </p>
      <div class="flex flex-col sm:flex-row gap-3">
        <ExportImageButton :results="results" />
        <ShareOnXButton :results="results" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MarketCapCalculation } from '~/types/coinmarketcap'

interface Props {
  results: MarketCapCalculation
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

function getMultiplierColorClass(multiplier: number): string {
  if (multiplier < 2) return 'text-success-600 dark:text-success-400'
  if (multiplier < 5) return 'text-accent-600 dark:text-accent-400'
  if (multiplier < 10) return 'text-warning-600 dark:text-warning-400'
  return 'text-danger-600 dark:text-danger-400'
}

function getMultiplierBadgeClass(multiplier: number): string {
  if (multiplier < 2) return 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400'
  if (multiplier < 5) return 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400'
  if (multiplier < 10) return 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400'
  return 'bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400'
}

function getMultiplierLabel(multiplier: number): string {
  if (multiplier < 2) return 'Modest Growth'
  if (multiplier < 5) return 'Achievable'
  if (multiplier < 10) return 'Ambitious'
  return 'Highly Ambitious'
}

function getMultiplierDescription(multiplier: number): string {
  if (multiplier < 2) return 'This represents modest growth from current levels and is within the realm of short to medium-term market movements.'
  if (multiplier < 5) return 'This level of growth is achievable for established cryptocurrencies over market cycles, though it requires favorable market conditions.'
  if (multiplier < 10) return 'This is an ambitious target requiring significant adoption, favorable market conditions, and sustained growth over time.'
  return 'This is a highly ambitious target that would require exceptional circumstances, massive adoption, or fundamental market shifts.'
}
</script>
