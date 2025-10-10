export default defineNuxtRouteMiddleware((to, from) => {
  const { $toast, $i18n } = useNuxtApp()

  const userInfo = useCookie('user-info')

  const publicPages = ['/', '/landing', '/signin', '/signup', '/demo', '/demo/', '/demo/signin']

  if (publicPages.includes(to.path)) return

  if (!userInfo.value) {
    userInfo.value = null
    // $toast.error($i18n.t('toast.something_wrong'), $i18n.t('signin_again'))

    if (process.client) {
      localStorage.removeItem('user-info')
    }

    // If trying to access demo chat without login, redirect to demo signin
    if (to.path === '/demo/chat') {
      return navigateTo('/demo/signin')
    }

    return navigateTo('/signin')
  }

  if (to.path === '/create-character' && userInfo.value.user_type !== 'creator'){
     return navigateTo('/')
  }
})