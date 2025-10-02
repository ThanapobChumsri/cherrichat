export default defineNuxtRouteMiddleware((to, from) => {
  const rounter = useRouter()
  if (process.client) {
    const userInfo = JSON.parse(localStorage.getItem('user-info') || 'null')
      
    const isAdmin = userInfo?.email?.includes('@kisracorp.com')
    
    if (!isAdmin) {
      setTimeout(() => {
        rounter.push('/')
      }, 50);
    }
  }
})