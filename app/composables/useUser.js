import { useBackdrop } from "#imports";

export const useUser = () => {
  const runtimeConfig = useRuntimeConfig();
  const { open, close } = useBackdrop()
  const { $toast } = useNuxtApp()
  const { t } = useI18n();

  const useGetUserKnowledge = async (user_id) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/17d636a7-0e17-4a6b-a6d5-17db8aa639eb?user_id=${user_id}`)

    return response
  }

  const useUpdateUserKnowledge = async (user_id, preferences) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/0a3b27d0-c760-4d54-a186-0375a0a70659`, {
      method: 'POST',
      body: {
        user_id,
        preferences,
      }
    })
  }

  const useUploadKnowledgeFile = async (file) => {
    open()
    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/c5e91d01-ba95-4538-a2c1-cbea35f1b9b1`, {
      method: 'POST',
      body: formData,
    })

    close()
    return response[0].data
  }

  const useRegisterCreator = async (payload) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/84d16ebe-5a70-40ef-86c0-28db86810432`, {
      method: 'POST',
      body: payload,
    })
    $toast.success(t('toast.submit_register'), "")
    return response
  }

  const useGetCreatorUser = async (query) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/08ad7f6d-0851-4606-81f5-39a0d8ff2588`, {
      params: query
    })
    return response
  }

  const useGetUserById = async (query) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/08825714-9f27-45d8-8797-31b38626f904`, {
      params: query
    })
    return response
  }

  return {
    useGetUserKnowledge,
    useUpdateUserKnowledge,
    useUploadKnowledgeFile,
    useRegisterCreator,
    useGetCreatorUser,
    useGetUserById,
  }
}