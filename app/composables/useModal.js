const isSoundModalOpen = ref(false)
const isTopUpModalOpen = ref(false)

export const useModal = () => {

  const onOpenSoundModal = () => {
    isSoundModalOpen.value = true
  }

  const onCloseSoundModal = () => {
    isSoundModalOpen.value = false
  }

  const onOpenTopUpModal = () => {
    isTopUpModalOpen.value = true
  }

  return {
    isSoundModalOpen,
    onOpenSoundModal,
    onCloseSoundModal,

    isTopUpModalOpen,
    onOpenTopUpModal,
  }
}