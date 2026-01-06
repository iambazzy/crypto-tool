export function useTheme() {
  const isDark = useState('theme-is-dark', () => false)

  // Initialize theme from localStorage or system preference
  const initTheme = () => {
    if (process.client) {
      const stored = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      isDark.value = stored === 'dark' || (!stored && prefersDark)
      updateTheme()
    }
  }

  const updateTheme = () => {
    if (process.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateTheme()
  }

  const setTheme = (dark: boolean) => {
    isDark.value = dark
    updateTheme()
  }

  return {
    isDark: readonly(isDark),
    toggleTheme,
    setTheme,
    initTheme,
  }
}
