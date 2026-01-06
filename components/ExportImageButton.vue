<template>
  <button
    @click="handleDownload"
    :disabled="loading"
    :aria-busy="loading"
    aria-label="Download market cap analysis as image"
    class="flex items-center justify-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-700 disabled:bg-accent-400 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 dark:focus:ring-offset-primary-900"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <!-- Download icon -->
    <svg
      v-else
      class="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      ></path>
    </svg>

    <span>{{ loading ? 'Generating...' : 'Download Image' }}</span>
  </button>

  <!-- Error message -->
  <div
    v-if="error"
    class="mt-2 text-sm text-danger-600 dark:text-danger-400"
    role="alert"
  >
    {{ error }}
  </div>
</template>

<script setup lang="ts">
import type { MarketCapCalculation } from '~/types/coinmarketcap'

interface Props {
  results: MarketCapCalculation
}

const props = defineProps<Props>()

const { loading, error, downloadImage } = useImageExport()

async function handleDownload() {
  await downloadImage(props.results)
}
</script>
