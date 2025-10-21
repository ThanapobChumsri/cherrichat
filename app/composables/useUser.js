import { useBackdrop } from "#imports";

export const useUser = () => {
  const runtimeConfig = useRuntimeConfig();
  const { useGetWallet } = usePayment()
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

  const getDailyLoginCounterById = async (query) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/d10834a5-279d-4eb3-89f7-fa9f667df534`, {
      params: query
    })
    return response
  }

  const getAllDailyLoginReward = async () => {
    try {
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/1f9b1210-e3a9-45eb-bcee-f2febe21df59`)
      const result = [];

      for (const item of response) {
        const range = item.streak_day_range;
        const coin = parseFloat(item.coin);

        const match = range.match(/\[([0-9]*),([0-9]*)\)/);
        if (!match) continue;

        const start = parseInt(match[1]);
        const end = match[2] ? parseInt(match[2]) - 1 : start;
        for (let day = start; day <= end; day++) {
          result.push({ day, coin });
        }
      }

      return result.sort((a, b) => a.day - b.day)
    } catch (error) {
      console.error(String(error?.data?.message || error))
    }
  }

  const sendDailyLogin = async (payload) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/ee4ffd6a-5542-4e47-af6b-6b25357ecbb3`, {
      method: "POST",
      body: payload,
    })

    await useGetWallet(payload.user_id);
    return response
  }

  // pdpa_consent, chat_tutorial
  const updateUserField = async (payload) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/95b81027-abc7-42f3-850e-42b52d9eab45`, {
      method: 'POST',
      body: payload
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
    getDailyLoginCounterById,
    getAllDailyLoginReward,
    sendDailyLogin,
    updateUserField,
  }
}