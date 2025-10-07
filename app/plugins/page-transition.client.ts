import { gsap } from 'gsap'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()

  // Store the page element for animation
  let isTransitioning = false

  router.beforeEach((to, from, next) => {
    if (from.path !== to.path) {
      isTransitioning = true

      // Animate out current page
      const pageElement = document.querySelector('[data-page-transition]')
      if (pageElement) {
        gsap.to(pageElement, {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            next()
          }
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })

  router.afterEach(() => {
    if (isTransitioning) {
      // Wait for DOM to update
      nextTick(() => {
        const pageElement = document.querySelector('[data-page-transition]')
        if (pageElement) {
          gsap.fromTo(pageElement,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              onComplete: () => {
                isTransitioning = false
              }
            }
          )
        } else {
          isTransitioning = false
        }
      })
    }
  })
})
