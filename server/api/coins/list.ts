import type { CoinListItem } from '~/types/coinmarketcap'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.coinMarketCapApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'CoinMarketCap API key not configured'
    })
  }

  try {
    const response = await $fetch<{
      data: Array<{
        id: number
        name: string
        symbol: string
        slug: string
        rank: number
        is_active: number
      }>
    }>('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
      params: {
        listing_status: 'active',
        limit: 5000
      },
      headers: {
        'X-CMC_PRO_API_KEY': apiKey
      }
    })

    const coins: CoinListItem[] = response.data
      .filter(coin => coin.is_active === 1)
      .map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        slug: coin.slug,
        rank: coin.rank
      }))
      .sort((a, b) => (a.rank || 0) - (b.rank || 0))

    setResponseHeaders(event, {
      'Cache-Control': 'public, max-age=300'
    })

    return coins
  } catch (error: any) {
    console.error('CoinMarketCap API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch cryptocurrency list'
    })
  }
})
