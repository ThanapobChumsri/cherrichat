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

  const sendLikeCharacter = async (payload) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/d9be86b5-ac09-4841-90ea-89c12b2e81ef`, {
      method: "POST",
      body: {
        user_id: payload.user_id,
        character_id: payload.character_id
      }
    })

    return response
  }

  const getRelationship = async (user_id, character_id) => {
    try {
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/1f83a92a-3ff3-4f22-8595-690c087411d1`, {
        params: {
          user_id: user_id,
          character_id: character_id
        }
      });

      return response;
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
      return null;
    }
  }

  return {
    getAllCharacter,
    useGenerateCharacter,
    useGenerateCharacterImage,
    useCreateCharacter,
    sendLikeCharacter,
    getRelationship,
  }
}