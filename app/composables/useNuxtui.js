export const useNuxtui = () => {

  const useSubmitOnEnter = (submitFn) => {
    return {
      onKeydown: (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault()
          submitFn()
        }
      }
    }
  }

  return {
    useSubmitOnEnter,
  }
}