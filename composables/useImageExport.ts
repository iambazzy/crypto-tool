import { ref } from 'vue'
import type { MarketCapCalculation } from '~/types/coinmarketcap'
import type { AnalysisData } from '~/utils/imageGenerator'
import { renderAnalyticsCard } from '~/utils/imageGenerator'
import { BRAND_NAME, BRAND_TAGLINE, BRAND_WEBSITE_URL } from '~/composables/useBrand'

export function useImageExport() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Generate image blob from calculation data
   */
  async function generateImage(
    data: MarketCapCalculation,
    theme: 'light' | 'dark'
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        // Prepare analysis data with brand info
        const analysisData: AnalysisData = {
          ...data,
          brandName: BRAND_NAME,
          brandTagline: BRAND_TAGLINE,
          brandWebsiteUrl: BRAND_WEBSITE_URL,
        }

        // Render the canvas
        const canvas = renderAnalyticsCard(analysisData, theme)

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to generate image blob'))
            }
          },
          'image/png',
          1.0
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * Download image with proper filename
   */
  async function downloadImage(data: MarketCapCalculation): Promise<void> {
    loading.value = true
    error.value = null

    try {
      // Get current theme
      const { isDark } = useTheme()
      const theme = isDark.value ? 'dark' : 'light'

      // Generate image
      const blob = await generateImage(data, theme)

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      const filename = `kointools-${data.coinSymbol.toLowerCase()}-analysis.png`

      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Cleanup
      setTimeout(() => URL.revokeObjectURL(url), 100)
    } catch (err) {
      console.error('Failed to download image:', err)
      error.value =
        err instanceof Error ? err.message : 'Failed to generate image. Please try again.'
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    generateImage,
    downloadImage,
  }
}
