<template>
  <div>
    <!-- Hero Section -->
    <Hero />

    <!-- Current Tools Section -->
    <CurrentTools />

    <!-- Future Tools Section -->
    <FutureTools />

    <!-- Use Cases Section -->
    <UseCasesSection />

    <!-- Final CTA Section -->
    <section class="bg-primary-900 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to start thinking clearly?
          </h2>
          <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
            Stop chasing hype. Start making data-driven decisions. Our market cap calculator is free to use and
            takes seconds to run your first analysis.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <NuxtLink
              to="/calculator"
              class="rounded-lg bg-accent-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-accent-600 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
            >
              Launch Calculator
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { name, tagline, metaDescription } = useBrand()

// Set page metadata
useHead({
  title: `${name} - ${tagline}`,
  meta: [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:title',
      content: `${name} - ${tagline}`,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: `${name} - ${tagline}`,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
  ],
})
</script>
