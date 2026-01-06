<script setup lang="ts">
const isDark = ref(false)

// Initialize theme from localStorage or system preference
onMounted(() => {
  if (process.client) {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    isDark.value = stored === 'dark' || (!stored && prefersDark)
    updateTheme()
  }
})

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
</script>

<template>
  <button
    @click="toggleTheme"
    class="fixed top-6 right-6 p-2.5 rounded-lg bg-white dark:bg-primary-800 text-primary-700 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-primary-700 border border-primary-200 dark:border-primary-700 transition-all shadow-md hover:shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Sun Icon (shown in dark mode) -->
    <svg
      v-if="isDark"
      class="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>

    <!-- Moon Icon (shown in light mode) -->
    <svg
      v-else
      class="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>
