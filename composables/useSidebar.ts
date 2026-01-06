export function useSidebar() {
  const isSidebarOpen = useState('sidebar-is-open', () => true)

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const openSidebar = () => {
    isSidebarOpen.value = true
  }

  const closeSidebar = () => {
    isSidebarOpen.value = false
  }

  // Auto-close sidebar on mobile when navigating
  const handleNavigation = () => {
    if (process.client && window.innerWidth < 768) {
      closeSidebar()
    }
  }

  // Initialize sidebar state based on viewport
  const initSidebar = () => {
    if (process.client) {
      isSidebarOpen.value = window.innerWidth >= 768
    }
  }

  return {
    isSidebarOpen: readonly(isSidebarOpen),
    toggleSidebar,
    openSidebar,
    closeSidebar,
    handleNavigation,
    initSidebar,
  }
}
