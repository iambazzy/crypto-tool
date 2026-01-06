<template>
  <button
    @click="handleShare"
    aria-label="Share market cap analysis on X"
    class="flex items-center justify-center gap-2 px-6 py-3 bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-primary-900"
  >
    <!-- X (Twitter) logo -->
    <svg
      class="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>

    <span>Share on X</span>
  </button>
</template>

<script setup lang="ts">
import type { MarketCapCalculation } from '~/types/coinmarketcap'
import { formatMarketCap } from '~/utils/imageGenerator'
import { BRAND_TWITTER_HANDLE } from '~/composables/useBrand'

interface Props {
  results: MarketCapCalculation
}

const props = defineProps<Props>()

function handleShare() {
  // Generate tweet text
  const tweetText = `${props.results.coinName} ($${props.results.coinSymbol}) to reach $${props.results.targetPrice.toFixed(2)} requires ${props.results.multiplier.toFixed(2)}× growth to a market cap of ${formatMarketCap(props.results.requiredMarketCap)}. Analysis by ${BRAND_TWITTER_HANDLE}`

  // Generate X intent URL
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(tweetText)
  const intentUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`

  // Open in new window
  window.open(
    intentUrl,
    '_blank',
    'width=550,height=420,scrollbars=yes,resizable=yes'
  )
}
</script>
