<template>
  <section class="bg-white py-24 dark:bg-primary-900 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Section Header -->
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-primary-900 dark:text-white sm:text-4xl">
          Core Calculator
        </h2>
        <p class="mt-4 text-lg text-primary-600 dark:text-primary-300">
          Our foundation tool — where data-driven analysis begins
        </p>
      </div>

      <!-- Tool Card -->
      <div class="mx-auto mt-16 max-w-3xl">
        <div
          class="group relative overflow-hidden rounded-2xl border border-primary-200 bg-gradient-to-br from-white to-primary-50 p-8 shadow-card transition-all hover:shadow-card-hover dark:border-primary-700 dark:from-primary-800 dark:to-primary-900 sm:p-10"
        >
          <!-- Tool Label -->
          <div class="mb-6">
            <span
              class="inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-sm font-semibold text-accent-700 dark:bg-accent-900/30 dark:text-accent-300"
            >
              Available Now
            </span>
          </div>

          <!-- Tool Title -->
          <h3 class="text-2xl font-bold text-primary-900 dark:text-white sm:text-3xl">
            Market Cap Calculator
          </h3>

          <!-- Tool Description -->
          <div class="mt-6 space-y-4 text-base leading-7 text-primary-700 dark:text-primary-200 sm:text-lg">
            <p>
              Understand what market cap is required for any crypto token to reach a target price. The calculator
              reveals the valuation reality behind price predictions, helping you separate realistic scenarios from
              impossible dreams.
            </p>

            <p class="font-semibold text-primary-900 dark:text-white">
              What you get:
            </p>

            <ul class="space-y-2 pl-5">
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-accent-500">•</span>
                <span>Required market cap for any target price</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-accent-500">•</span>
                <span>Current market cap and price data</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-accent-500">•</span>
                <span>Growth multiple needed from current levels</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-accent-500">•</span>
                <span>Comparisons to Bitcoin, Ethereum, and other benchmarks</span>
              </li>
            </ul>

            <p class="text-primary-600 dark:text-primary-300">
              Simple formula. Transparent math. Reality-based analysis.
            </p>
          </div>

          <!-- CTA Button -->
          <div class="mt-8">
            <NuxtLink
              to="/calculator"
              class="inline-flex items-center justify-center rounded-lg bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-accent-600 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:text-lg"
            >
              Launch Calculator
              <svg
                class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Decorative Element -->
          <div
            class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-500/10 blur-2xl transition-all group-hover:bg-accent-500/20 dark:bg-accent-500/5 dark:group-hover:bg-accent-500/10"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Current Tools section - showcases the market cap calculator
// as the foundation tool of the platform
</script>
