<template>
  <div class="min-h-screen flex flex-col bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-primary-50 transition-colors duration-200">
    <AppHeader />

    <div class="flex flex-1">
      <!-- Sidebar -->
      <AppSidebar />

      <!-- Main Content -->
      <main class="flex-1 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <slot />
        </div>
      </main>
    </div>

    <!-- Footer -->
    <AppFooter />

    <!-- Mobile Overlay -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isSidebarOpen && isMobile"
        @click="closeSidebar"
        class="fixed inset-0 bg-black/50 z-30 md:hidden"
      ></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const { isSidebarOpen, closeSidebar, initSidebar } = useSidebar()
const { initTheme } = useTheme()

const isMobile = ref(false)

onMounted(() => {
  initTheme()
  initSidebar()

  if (process.client) {
    isMobile.value = window.innerWidth < 768

    const handleResize = () => {
      isMobile.value = window.innerWidth < 768
    }

    window.addEventListener('resize', handleResize)

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })
  }
})
</script>
