<template>
  <aside
    class="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-primary-800 border-r border-primary-200 dark:border-primary-700 transition-transform duration-300 z-40 md:hidden"
    :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex flex-col h-full p-6">
      <!-- Theme Toggle Section -->
      <div class="mb-8">
        <h3 class="text-xs font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-3">
          Appearance
        </h3>
        <button
          @click="toggleTheme"
          class="flex items-center justify-between w-full p-3 rounded-lg bg-primary-50 dark:bg-primary-700 hover:bg-primary-100 dark:hover:bg-primary-600 transition-all group focus:outline-none focus:ring-2 focus:ring-accent-500"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <div class="flex items-center space-x-3">
            <!-- Icon -->
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-primary-800 text-primary-700 dark:text-primary-200 group-hover:scale-110 transition-transform">
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
            </div>

            <!-- Label -->
            <span class="text-sm font-medium text-primary-700 dark:text-primary-200">
              {{ isDark ? 'Light Mode' : 'Dark Mode' }}
            </span>
          </div>

          <!-- Arrow indicator -->
          <svg class="w-4 h-4 text-primary-400 dark:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation Links (visible only on mobile) -->
      <nav class="sm:hidden mb-8">
        <h3 class="text-xs font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-3">
          Navigation
        </h3>
        <ul class="space-y-1">
          <li>
            <NuxtLink
              to="/"
              @click="handleNavigation"
              class="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
              :class="isActiveRoute('/')
                ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'
                : 'text-primary-600 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-700'"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/calculator"
              @click="handleNavigation"
              class="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
              :class="isActiveRoute('/calculator')
                ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'
                : 'text-primary-600 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-700'"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Calculator
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Spacer -->
      <div class="flex-1"></div>

      <!-- Footer Info -->
      <div class="pt-4 border-t border-primary-200 dark:border-primary-700">
        <p class="text-xs text-primary-500 dark:text-primary-400 leading-relaxed">
          Professional crypto market cap analysis tool for informed decision-making.
        </p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()
const { isDark, toggleTheme } = useTheme()
const { isSidebarOpen, handleNavigation } = useSidebar()

const isActiveRoute = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>
