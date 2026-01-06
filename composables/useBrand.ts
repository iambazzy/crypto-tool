/**
 * Brand identity composable for kointools
 * Centralizes all brand-related constants for consistency across the application
 */

export const BRAND_NAME = 'kointools'
export const BRAND_TAGLINE = 'Professional Crypto Analysis Tools'
export const BRAND_WEBSITE_URL = 'kointools.com'

export const BRAND_DESCRIPTION =
  'kointools provides professional crypto analysis tools for serious investors. Calculate market caps, understand valuations, and make data-driven decisions.'

export const BRAND_META_DESCRIPTION =
  'Professional crypto analysis tools for serious investors. Market cap calculator, valuation analysis, and data-driven investment tools.'

export const BRAND_TWITTER_HANDLE = '@kointools'

export const useBrand = () => {
  return {
    name: BRAND_NAME,
    tagline: BRAND_TAGLINE,
    websiteUrl: BRAND_WEBSITE_URL,
    description: BRAND_DESCRIPTION,
    metaDescription: BRAND_META_DESCRIPTION,
    twitterHandle: BRAND_TWITTER_HANDLE,
  }
}
