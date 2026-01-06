<template>
  <header class="sticky top-0 z-40 bg-white/95 dark:bg-primary-800/95 backdrop-blur-sm border-b border-primary-200 dark:border-primary-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left: Brand + Mobile Menu Button -->
        <div class="flex items-center space-x-4">
          <!-- Mobile Menu Button -->
          <button
            @click="toggleSidebar"
            class="md:hidden p-2 rounded-lg text-primary-600 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500"
            aria-label="Toggle sidebar"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Brand -->
          <NuxtLink
            to="/"
            class="text-xl font-bold text-primary-900 dark:text-primary-50 tracking-tight hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
          >
            koin<span class="text-accent-500">tools</span>
          </NuxtLink>
        </div>

        <!-- Right: Navigation Links -->
        <nav class="hidden sm:block">
          <ul class="flex items-center space-x-1">
            <li>
              <NuxtLink
                to="/"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                :class="isActiveRoute('/')
                  ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'
                  : 'text-primary-600 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-700 hover:text-primary-900 dark:hover:text-primary-50'"
              >
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/calculator"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                :class="isActiveRoute('/calculator')
                  ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'
                  : 'text-primary-600 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-700 hover:text-primary-900 dark:hover:text-primary-50'"
              >
                Calculator
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const { toggleSidebar } = useSidebar()

const isActiveRoute = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>
