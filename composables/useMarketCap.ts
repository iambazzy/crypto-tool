export interface MarketCapResult {
  token: string
  currentPrice: number
  currentMarketCap: number
  targetPrice: number
  requiredMarketCap: number
  multiplier: number
}

export const useMarketCap = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<MarketCapResult | null>(null)

  const calculate = async (token: string, targetPrice: number) => {
    loading.value = true
    error.value = null
    data.value = null

    try {
      const result = await $fetch<MarketCapResult>('/api/market-cap', {
        method: 'POST',
        body: {
          token,
          targetPrice
        }
      })

      data.value = result
      return result
    } catch (err: any) {
      const message = err.data?.message || 'Failed to calculate market cap. Please try again.'
      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    data: readonly(data),
    calculate
  }
}
