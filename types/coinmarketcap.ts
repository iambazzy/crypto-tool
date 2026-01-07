export interface CoinListItem {
  id: number
  name: string
  symbol: string
  slug: string
  rank?: number
}

export interface CoinQuote {
  price: number
  market_cap: number
  circulating_supply: number
  volume_24h: number
  percent_change_24h: number
}

export interface CoinData {
  id: number
  name: string
  symbol: string
  quote: {
    USD: CoinQuote
  }
  circulating_supply: number
}

export interface MarketCapCalculation {
  coinName: string
  coinSymbol: string
  currentPrice: number
  circulatingSupply: number
  currentMarketCap: number
  targetPrice: number
  requiredMarketCap: number
  multiplier: number
}

export interface PriceCalculation {
  coinName: string
  coinSymbol: string
  currentPrice: number
  circulatingSupply: number
  currentMarketCap: number
  targetMarketCap: number
  resultingPrice: number
  multiplier: number
}

export type CalculationResult =
  | { mode: 'price' } & MarketCapCalculation
  | { mode: 'marketCap' } & PriceCalculation
