import { useBackdrop } from "#imports";

export const useUser = () => {
  const runtimeConfig = useRuntimeConfig();
  const { open, close } = useBackdrop()
  const { $toast } = useNuxtApp()
  const { t } = useI18n();

  const useGetUserKnowledge = async (user_id) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/f295e762-6288-4131-a452-5dbf33a94d85?user_id=${user_id}`)

    return response
  }

  const useUpdateUserKnowledge = async (user_id, preferences) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/616dc524-e47e-4650-81a1-5aa04087ebc6`, {
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

    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/be2da6d6-e01c-40ce-a1d6-e03e8f1bc339`, {
      method: 'POST',
      body: formData,
    })

    close()
    return response[0].data
  }

  const useRegisterCreator = async (payload) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/408d3702-c0e8-4015-8330-fcfe8c2bad3b`, {
      method: 'POST',
      body: payload,
    })
    $toast.success(t('toast.submit_register'), "")
    return response
  }

  const useGetCreatorUser = async (query) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/3dc212a1-a10a-439d-81fa-07c7e52c4d2e`, {
      params: query
    })
    return response
  }

  const useGetUserById = async (query) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/6cf57b9a-1993-4f26-9158-5c329f1a2b3f`, {
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