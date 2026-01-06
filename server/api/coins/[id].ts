import type { CoinData } from '~/types/coinmarketcap'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.coinMarketCapApiKey
  const coinId = getRouterParam(event, 'id')

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'CoinMarketCap API key not configured'
    })
  }

  if (!coinId) {
    throw createError({
      statusCode: 400,
      message: 'Coin ID or slug is required'
    })
  }

  try {
    const response = await $fetch<{
      data: Record<string, CoinData>
    }>('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
      params: {
        slug: coinId
      },
      headers: {
        'X-CMC_PRO_API_KEY': apiKey
      }
    })

    const coinData = Object.values(response.data)[0]

    if (!coinData) {
      throw createError({
        statusCode: 404,
        message: 'Coin not found'
      })
    }

    return {
      id: coinData.id,
      name: coinData.name,
      symbol: coinData.symbol,
      currentPrice: coinData.quote.USD.price,
      circulatingSupply: coinData.circulating_supply,
      marketCap: coinData.quote.USD.market_cap,
      volume24h: coinData.quote.USD.volume_24h,
      percentChange24h: coinData.quote.USD.percent_change_24h
    }
  } catch (error: any) {
    console.error('CoinMarketCap API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch coin details'
    })
  }
})
