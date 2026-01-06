import { ref } from 'vue'
import type { CoinListItem, MarketCapCalculation } from '~/types/coinmarketcap'

interface CoinDetails {
  id: number
  name: string
  symbol: string
  currentPrice: number
  circulatingSupply: number
  marketCap: number
  volume24h: number
  percentChange24h: number
}

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useCoinsList() {
  const state = ref<ApiState<CoinListItem[]>>({
    data: null,
    loading: false,
    error: null
  })

  async function fetchCoins() {
    state.value.loading = true
    state.value.error = null

    try {
      const coins = await $fetch<CoinListItem[]>('/api/coins/list')
      state.value.data = coins
      return coins
    } catch (e: any) {
      state.value.error = e.message || 'Failed to fetch cryptocurrency list'
      throw e
    } finally {
      state.value.loading = false
    }
  }

  return {
    ...state.value,
    fetchCoins
  }
}

export function useCoinDetails(coinId: string) {
  const state = ref<ApiState<CoinDetails>>({
    data: null,
    loading: false,
    error: null
  })

  async function fetchDetails() {
    if (!coinId) {
      state.value.error = 'Coin ID is required'
      return
    }

    state.value.loading = true
    state.value.error = null

    try {
      const details = await $fetch<CoinDetails>(`/api/coins/${coinId}`)
      state.value.data = details
      return details
    } catch (e: any) {
      state.value.error = e.message || 'Failed to fetch coin details'
      throw e
    } finally {
      state.value.loading = false
    }
  }

  return {
    ...state.value,
    fetchDetails
  }
}

export function useMarketCapCalculation() {
  const state = ref<ApiState<MarketCapCalculation>>({
    data: null,
    loading: false,
    error: null
  })

  async function calculate(coinSlug: string, targetPrice: number) {
    if (!coinSlug || !targetPrice) {
      state.value.error = 'Coin slug and target price are required'
      return
    }

    if (targetPrice <= 0) {
      state.value.error = 'Target price must be greater than zero'
      return
    }

    state.value.loading = true
    state.value.error = null

    try {
      const result = await $fetch<MarketCapCalculation>('/api/market-cap', {
        params: {
          slug: coinSlug,
          price: targetPrice
        }
      })
      state.value.data = result
      return result
    } catch (e: any) {
      state.value.error = e.message || 'Failed to calculate market cap'
      throw e
    } finally {
      state.value.loading = false
    }
  }

  return {
    ...state.value,
    calculate
  }
}
