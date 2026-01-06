<template>
  <section class="relative overflow-hidden bg-white dark:bg-primary-900">
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div class="mx-auto max-w-3xl text-center">
        <!-- Brand Name -->
        <h1 class="text-5xl font-bold tracking-tight text-primary-900 dark:text-white sm:text-6xl lg:text-7xl">
          koin<span class="text-accent-500">tools</span>
        </h1>

        <!-- Tagline -->
        <p class="mt-6 text-2xl font-semibold text-primary-700 dark:text-primary-200 sm:text-3xl">
          Professional Crypto Analysis Tools
        </p>

        <!-- Description -->
        <p class="mt-8 text-lg leading-8 text-primary-600 dark:text-primary-300 sm:text-xl">
          Sophisticated analytics tools for serious crypto investors. Ground your decisions in fundamentals, not hype.
          Understand valuations, reality-check predictions, and make informed capital allocation decisions.
        </p>

        <!-- CTA Button -->
        <div class="mt-10 flex justify-center">
          <NuxtLink
            to="/calculator"
            class="rounded-lg bg-accent-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-accent-600 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:text-lg"
          >
            Try the Calculator
          </NuxtLink>
        </div>

        <!-- Trust Indicator -->
        <p class="mt-12 text-sm text-primary-500 dark:text-primary-400">
          No trading. No predictions. No hype. Just math and data.
        </p>
      </div>
    </div>

    <!-- Subtle gradient overlay -->
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-accent-400 to-accent-100 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:opacity-10"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
// Hero component - introduces the kointools brand
// and presents the core value proposition
</script>
