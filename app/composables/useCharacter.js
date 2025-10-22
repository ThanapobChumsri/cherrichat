import { useBackdrop } from "#imports";
import { usePayment } from "#imports";

export const useCharacter = () => {
  const runtimeConfig = useRuntimeConfig();
  const { open, close } = useBackdrop();
  const { useGetWallet } = usePayment()
  const { $toast } = useNuxtApp()
  const { t } = useI18n();

  const getAllCharacter = async (query = {}) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/a6fb96a3-a0b4-4d06-bd59-97f3909fbaae`, {
      params: query
    });

    return response;
  }

  const useGenerateCharacter = async (data, user_id) => {
    try {
      open()
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/3086a4c8-e488-4ba2-bc9e-ee39437db809`, {
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
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/a2cb17ee-9eb5-47ec-b6fb-4a0fb86202a3`, {
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

  const useCreateCharacter = async (data, image, user_id, sound_id) => {
    open()
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/9ac7b2f1-f1b2-4330-b9e9-1c4cf7f5ae8c`, {
      method: 'POST',
      body: {
        ...data,
        url_image: image,
        user_id: user_id,
        sound_id: sound_id,
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