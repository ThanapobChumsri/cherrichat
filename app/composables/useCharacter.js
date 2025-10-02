import { useBackdrop } from "#imports";
import { usePayment } from "#imports";

export const useCharacter = () => {
  const runtimeConfig = useRuntimeConfig();
  const { open, close } = useBackdrop();
  const { useGetWallet } = usePayment()
  const { $toast } = useNuxtApp()
  const { t } = useI18n();

  const getAllCharacter = async (query = {}) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/55853333-a65d-4da5-b458-c6e4f74c3981`, {
      params: query
    });

    return response;
  }

  const useGenerateCharacter = async (data, user_id) => {
    try {
      open()
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/f0edc73d-0691-4b2c-ba4b-49d05b77ccaa`, {
        method: 'POST',
        body: {
          characterPrompt: data,
          user_id: user_id,
        }
      })

      await useGetWallet(user_id)
      return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    } finally {
      close()
    }
  }

  const useGenerateCharacterImage = async (backstory, appearance, user_id) => {
    try {
      open()
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/180d15b6-cc49-464d-94fc-9a035a37a2e6`, {
        method: 'POST',
        body: {
          backstory: backstory,
          appearance, appearance,
          user_id: user_id,
        }
      })

      await useGetWallet(user_id)
      return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    } finally {
      close()
    }
  }

  const useCreateCharacter = async (data, image, user_id) => {
    open()
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/ddd52635-f49c-4c7e-9e52-51bc312087ae`, {
      method: 'POST',
      body: {
        ...data,
        url_image: image,
        user_id: user_id,
      }
    })

    close()
    return response
  }

  return {
    getAllCharacter,
    useGenerateCharacter,
    useGenerateCharacterImage,
    useCreateCharacter,
  }
}