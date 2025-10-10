const isSoundModalOpen = ref(false)
const isTopUpModalOpen = ref(false)
const isPdpaModalOpen = ref(false)

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

  const onOpenPdpaModal = () => {
    isPdpaModalOpen.value = true
  }

  const onClosePdpaModal = () => {
    isPdpaModalOpen.value = false
  }

  return {
    isSoundModalOpen,
    onOpenSoundModal,
    onCloseSoundModal,

    isTopUpModalOpen,
    onOpenTopUpModal,

    isPdpaModalOpen,
    onOpenPdpaModal,
    onClosePdpaModal,
  }
}