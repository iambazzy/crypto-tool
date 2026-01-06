<script setup lang="ts">
const { name, tagline } = useBrand()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-white dark:bg-primary-800 border-t border-primary-200 dark:border-primary-700 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand Section -->
        <div>
          <h3 class="text-lg font-semibold text-primary-900 dark:text-white mb-2">
            {{ name }}
          </h3>
          <p class="text-sm text-primary-600 dark:text-primary-400">
            {{ tagline }}
          </p>
        </div>

        <!-- Disclaimer Section -->
        <div class="md:col-span-2">
          <h4 class="text-sm font-semibold text-primary-900 dark:text-white mb-2">
            Disclaimer
          </h4>
          <p class="text-xs text-primary-600 dark:text-primary-400 mb-2">
            This tool is for informational purposes only and does not constitute financial advice.
            Always do your own research before making investment decisions.
          </p>
          <p class="text-xs text-primary-600 dark:text-primary-400">
            Market data powered by <span class="font-medium">CoinMarketCap</span>.
            Data may be delayed or inaccurate.
          </p>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 pt-6 border-t border-primary-200 dark:border-primary-700">
        <p class="text-xs text-center text-primary-600 dark:text-primary-400">
          &copy; {{ currentYear }} {{ name }}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
