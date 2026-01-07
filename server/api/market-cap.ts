import type { CoinData, MarketCapCalculation, PriceCalculation, CalculationResult } from '~/types/coinmarketcap'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.coinMarketCapApiKey
  const query = getQuery(event)

  const coinSlug = query.slug as string
  const mode = (query.mode as string) || 'price'

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'CoinMarketCap API key not configured'
    })
  }

  if (!coinSlug) {
    throw createError({
      statusCode: 400,
      message: 'Coin slug is required'
    })
  }

  // Validate based on mode
  if (mode === 'price') {
    const targetPrice = parseFloat(query.price as string)
    if (!targetPrice) {
      throw createError({
        statusCode: 400,
        message: 'Target price is required for price mode'
      })
    }
    if (targetPrice <= 0) {
      throw createError({
        statusCode: 400,
        message: 'Target price must be greater than zero'
      })
    }
  } else if (mode === 'marketCap') {
    const targetMarketCap = parseFloat(query.marketCap as string)
    if (!targetMarketCap) {
      throw createError({
        statusCode: 400,
        message: 'Target market cap is required for marketCap mode'
      })
    }
    if (targetMarketCap <= 0) {
      throw createError({
        statusCode: 400,
        message: 'Target market cap must be greater than zero'
      })
    }
  } else {
    throw createError({
      statusCode: 400,
      message: 'Invalid mode. Must be "price" or "marketCap"'
    })
  }

  try {
    const response = await $fetch<{
      data: Record<string, CoinData>
    }>('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
      params: {
        slug: coinSlug
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

    const currentPrice = coinData.quote.USD.price
    const circulatingSupply = coinData.circulating_supply
    const currentMarketCap = coinData.quote.USD.market_cap

    if (mode === 'price') {
      const targetPrice = parseFloat(query.price as string)
      const requiredMarketCap = targetPrice * circulatingSupply
      const multiplier = requiredMarketCap / currentMarketCap

      const result: CalculationResult = {
        mode: 'price',
        coinName: coinData.name,
        coinSymbol: coinData.symbol,
        currentPrice: parseFloat(currentPrice.toFixed(2)),
        circulatingSupply,
        currentMarketCap: parseFloat(currentMarketCap.toFixed(2)),
        targetPrice,
        requiredMarketCap: parseFloat(requiredMarketCap.toFixed(2)),
        multiplier: parseFloat(multiplier.toFixed(2))
      }

      return result
    } else {
      const targetMarketCap = parseFloat(query.marketCap as string)
      const resultingPrice = targetMarketCap / circulatingSupply
      const multiplier = resultingPrice / currentPrice

      const result: CalculationResult = {
        mode: 'marketCap',
        coinName: coinData.name,
        coinSymbol: coinData.symbol,
        currentPrice: parseFloat(currentPrice.toFixed(2)),
        circulatingSupply,
        currentMarketCap: parseFloat(currentMarketCap.toFixed(2)),
        targetMarketCap: parseFloat(targetMarketCap.toFixed(2)),
        resultingPrice: parseFloat(resultingPrice.toFixed(2)),
        multiplier: parseFloat(multiplier.toFixed(2))
      }

      return result
    }
  } catch (error: any) {
    console.error('Market cap calculation error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to calculate market cap'
    })
  }
})
