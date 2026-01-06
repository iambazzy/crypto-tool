// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    coinMarketCapApiKey: process.env.COINMARKETCAP_API_KEY
  },
  app: {
    head: {
      title: 'Clarity Capital - Data-Driven Crypto Analytics',
      meta: [
        { name: 'description', content: 'Data-driven crypto analytics platform for serious investors. Calculate market caps, understand valuations, and make informed decisions based on fundamentals, not hype.' },
        { property: 'og:title', content: 'Clarity Capital - Data-Driven Crypto Analytics' },
        { property: 'og:description', content: 'Data-driven crypto analytics platform for serious investors. Calculate market caps, understand valuations, and make informed decisions based on fundamentals, not hype.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Clarity Capital - Data-Driven Crypto Analytics' },
        { name: 'twitter:description', content: 'Data-driven crypto analytics platform for serious investors. Calculate market caps, understand valuations, and make informed decisions based on fundamentals, not hype.' }
      ]
    }
  }
})
