import type { MarketCapCalculation } from '~/types/coinmarketcap'

// Image dimensions optimized for X (Twitter) sharing
export const EXPORT_WIDTH = 1200
export const EXPORT_HEIGHT = 675

// Theme color definitions
export interface ThemeColors {
  background: string
  backgroundGradientStart: string
  backgroundGradientEnd: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  accent: string
  border: string
  cardBg: string
}

// Configuration for image generation
export interface ImageConfig {
  width: number
  height: number
  theme: 'light' | 'dark'
  colors: ThemeColors
  scale: number // For retina displays
}

// Extended data structure for analytics card
export interface AnalysisData extends MarketCapCalculation {
  brandName: string
  brandTagline: string
  brandWebsiteUrl: string
}

/**
 * Get theme-specific color palette
 */
export function getThemeColors(theme: 'light' | 'dark'): ThemeColors {
  if (theme === 'dark') {
    return {
      background: '#0f172a',
      backgroundGradientStart: '#1e293b',
      backgroundGradientEnd: '#0f172a',
      textPrimary: '#f8fafc',
      textSecondary: '#e2e8f0',
      textMuted: '#94a3b8',
      accent: '#22d3ee',
      border: '#334155',
      cardBg: 'rgba(30, 41, 59, 0.5)',
    }
  } else {
    return {
      background: '#ffffff',
      backgroundGradientStart: '#f8fafc',
      backgroundGradientEnd: '#f1f5f9',
      textPrimary: '#0f172a',
      textSecondary: '#1e293b',
      textMuted: '#64748b',
      accent: '#06b6d4',
      border: '#e2e8f0',
      cardBg: 'rgba(255, 255, 255, 0.5)',
    }
  }
}

/**
 * Get color for multiplier based on value
 */
export function getMultiplierColor(
  multiplier: number,
  theme: 'light' | 'dark'
): string {
  if (multiplier < 2) {
    return theme === 'dark' ? '#4ade80' : '#059669'
  } else if (multiplier < 5) {
    return theme === 'dark' ? '#22d3ee' : '#0891b2'
  } else if (multiplier < 10) {
    return theme === 'dark' ? '#fbbf24' : '#d97706'
  } else {
    return theme === 'dark' ? '#f87171' : '#dc2626'
  }
}

/**
 * Get multiplier label text
 */
export function getMultiplierLabel(multiplier: number): string {
  if (multiplier < 2) return 'Modest Growth'
  if (multiplier < 5) return 'Achievable'
  if (multiplier < 10) return 'Ambitious'
  return 'Highly Ambitious'
}

/**
 * Format price as currency
 */
export function formatPrice(value: number): string {
  if (value < 0.01) {
    return `$${value.toFixed(6)}`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format market cap with B/T suffixes
 */
export function formatMarketCap(value: number): string {
  if (value >= 1e12) {
    return '$' + (value / 1e12).toFixed(2) + 'T'
  } else if (value >= 1e9) {
    return '$' + (value / 1e9).toFixed(2) + 'B'
  } else if (value >= 1e6) {
    return '$' + (value / 1e6).toFixed(2) + 'M'
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format multiplier with × suffix
 */
export function formatMultiplier(value: number): string {
  return `${value.toFixed(2)}×`
}

/**
 * Format circulating supply with commas
 */
export function formatSupply(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Create a canvas element with specified dimensions
 */
export function createCanvas(
  width: number,
  height: number,
  scale = 2
): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = width * scale
  canvas.height = height * scale
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  return canvas
}

/**
 * Draw text with proper font settings
 */
export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  options: {
    fontSize: number
    fontWeight?: string
    color?: string
    align?: CanvasTextAlign
    maxWidth?: number
  }
) {
  const { fontSize, fontWeight = 'normal', color = '#000', align = 'left', maxWidth } = options

  ctx.font = `${fontWeight} ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.textBaseline = 'top'

  if (maxWidth) {
    ctx.fillText(text, x, y, maxWidth)
  } else {
    ctx.fillText(text, x, y)
  }
}

/**
 * Measure text width
 */
export function measureText(
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  fontWeight = 'normal'
): number {
  ctx.font = `${fontWeight} ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`
  return ctx.measureText(text).width
}

/**
 * Draw background with gradient
 */
export function drawBackground(ctx: CanvasRenderingContext2D, config: ImageConfig) {
  const { width, height, colors, scale } = config
  const w = width * scale
  const h = height * scale

  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, h)
  gradient.addColorStop(0, colors.backgroundGradientStart)
  gradient.addColorStop(1, colors.backgroundGradientEnd)

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, w, h)

  // Add subtle border
  ctx.strokeStyle = colors.border
  ctx.lineWidth = 2 * scale
  ctx.strokeRect(0, 0, w, h)
}

/**
 * Main function to render the analytics card
 */
export function renderAnalyticsCard(
  data: AnalysisData,
  theme: 'light' | 'dark'
): HTMLCanvasElement {
  const scale = 2 // 2x for retina displays
  const canvas = createCanvas(EXPORT_WIDTH, EXPORT_HEIGHT, scale)
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Failed to get canvas context')
  }

  // Enable high-quality rendering
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  // Scale all drawing operations
  ctx.scale(scale, scale)

  const colors = getThemeColors(theme)
  const config: ImageConfig = {
    width: EXPORT_WIDTH,
    height: EXPORT_HEIGHT,
    theme,
    colors,
    scale,
  }

  // Draw background
  drawBackground(ctx, config)

  // Layout constants
  const padding = 60
  const centerX = EXPORT_WIDTH / 2
  let currentY = padding

  // Header Section - Brand
  drawText(ctx, data.brandName, centerX, currentY, {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.accent,
    align: 'center',
  })
  currentY += 60

  drawText(ctx, data.brandTagline, centerX, currentY, {
    fontSize: 20,
    fontWeight: 'normal',
    color: colors.textMuted,
    align: 'center',
  })
  currentY += 50

  // Divider line
  ctx.strokeStyle = colors.border
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding, currentY)
  ctx.lineTo(EXPORT_WIDTH - padding, currentY)
  ctx.stroke()
  currentY += 40

  // Token info
  const tokenText = `${data.coinName} (${data.coinSymbol})`
  drawText(ctx, tokenText, centerX, currentY, {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    align: 'center',
  })
  currentY += 50

  // Main content - Two column layout
  const leftColX = padding + 60
  const rightColX = EXPORT_WIDTH / 2 + 60
  const colWidth = EXPORT_WIDTH / 2 - padding - 120

  // Left column - Current data
  let leftY = currentY

  drawText(ctx, 'CURRENT PRICE', leftColX, leftY, {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
    align: 'left',
  })
  leftY += 25

  drawText(ctx, formatPrice(data.currentPrice), leftColX, leftY, {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textSecondary,
    align: 'left',
  })
  leftY += 50

  drawText(ctx, 'CURRENT MARKET CAP', leftColX, leftY, {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
    align: 'left',
  })
  leftY += 25

  drawText(ctx, formatMarketCap(data.currentMarketCap), leftColX, leftY, {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textSecondary,
    align: 'left',
  })

  // Right column - Target data
  let rightY = currentY

  drawText(ctx, 'TARGET PRICE', rightColX, rightY, {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
    align: 'left',
  })
  rightY += 25

  drawText(ctx, formatPrice(data.targetPrice), rightColX, rightY, {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.accent,
    align: 'left',
  })
  rightY += 50

  drawText(ctx, 'REQUIRED MARKET CAP', rightColX, rightY, {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
    align: 'left',
  })
  rightY += 25

  drawText(ctx, formatMarketCap(data.requiredMarketCap), rightColX, rightY, {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.accent,
    align: 'left',
  })

  currentY = Math.max(leftY, rightY) + 60

  // Growth multiplier section (centered, highlighted)
  const multiplierBgY = currentY - 20
  const multiplierBgHeight = 120

  // Draw card background for multiplier
  ctx.fillStyle = colors.cardBg
  ctx.fillRect(
    padding + 40,
    multiplierBgY,
    EXPORT_WIDTH - padding * 2 - 80,
    multiplierBgHeight
  )

  // Draw border around multiplier card
  ctx.strokeStyle = colors.border
  ctx.lineWidth = 1
  ctx.strokeRect(
    padding + 40,
    multiplierBgY,
    EXPORT_WIDTH - padding * 2 - 80,
    multiplierBgHeight
  )

  drawText(ctx, 'GROWTH REQUIRED', centerX, currentY, {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textMuted,
    align: 'center',
  })
  currentY += 30

  const multiplierColor = getMultiplierColor(data.multiplier, theme)
  drawText(ctx, formatMultiplier(data.multiplier), centerX, currentY, {
    fontSize: 48,
    fontWeight: 'bold',
    color: multiplierColor,
    align: 'center',
  })
  currentY += 60

  const label = getMultiplierLabel(data.multiplier)
  drawText(ctx, label, centerX, currentY, {
    fontSize: 18,
    fontWeight: '600',
    color: multiplierColor,
    align: 'center',
  })
  currentY = multiplierBgY + multiplierBgHeight + 40

  // Footer section
  currentY = EXPORT_HEIGHT - 80

  // Divider line
  ctx.strokeStyle = colors.border
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding, currentY)
  ctx.lineTo(EXPORT_WIDTH - padding, currentY)
  ctx.stroke()
  currentY += 30

  drawText(ctx, data.brandWebsiteUrl, centerX, currentY, {
    fontSize: 24,
    fontWeight: '600',
    color: colors.accent,
    align: 'center',
  })

  return canvas
}
