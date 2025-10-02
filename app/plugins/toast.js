export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast()

  const showToast = (type, title = '', description = '') => {
    const typeColorMap = {
      success: 'warning',
      error: 'error',
      info: 'info',
      default: 'default'
    }

    toast.add({
      title,
      description,
      color: typeColorMap[type] || typeColorMap.default
    })
  }

  const toastApi = {
    success: (title, description) => showToast('success', title, description),
    error: (title, description) => showToast('error', title, description),
    info: (title, description) => showToast('info', title, description),
    default: (title, description) => showToast('default', title, description)
  }

  nuxtApp.provide('toast', toastApi)
})