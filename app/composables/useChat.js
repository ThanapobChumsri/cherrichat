import { ref } from "vue";
import { usePayment } from '#imports';

const sendChatLoad = ref(false)
const generateImageLoad = ref(false)
const isGenerateSound = ref(false)

export const useChat = () => {
  const { useGetWallet } = usePayment()
  const runtimeConfig = useRuntimeConfig();
  const { $toast } = useNuxtApp()
  const { t } = useI18n();

  const getChatHistory = async (data, page=1, per_page= 10) => {
    // const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/673fe006-46a0-4887-847c-0f5354f85aca`, {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/ae40359f-30d2-41c2-812b-2338d11f8524?page=${page}&per_page=${per_page}`, {
      method: 'POST',
      body: data
    })

    return response
  }

  const getChatHistoryDemo = async (data, page=1, per_page= 10) => {
    // const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/673fe006-46a0-4887-847c-0f5354f85aca`, {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/0f4562a7-e406-4e23-8edf-4d78fd76c368?page=${page}&per_page=${per_page}`, {
      method: 'POST',
      body: data
    })

    return response
  }

  const deleteSessionChat = async (data) => {
    await $fetch(`${runtimeConfig.public.N8N_URL_V3}/0647c8d7-6e61-4001-a7e6-70b919a24447`, {
      method: 'POST',
      body: data,
    })
  }

  const deleteSessionChatDemo = async (data) => {
    await $fetch(`${runtimeConfig.public.N8N_URL_V3}/0942d653-de53-4e6f-a275-c3861bbcddcc`, {
      method: 'POST',
      body: data,
    })
  }

  const getNewPlacePicture = async (data) => {
    generateImageLoad.value = true
    
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/20ae73cd-ef2d-4f9a-ad58-ee3451a135c4`, {
      method: 'POST',
      body: data
    })

    generateImageLoad.value = false
    return response
  }

  const getSelectSound = async (name, relationship_id) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/ed1785a7-9554-4014-a28c-c9b4d4a84805?name=${name}&relationship_id=${relationship_id}`)
    return response
  }

  const getSelectSoundDemo = async (name, relationship_id) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/b9e77495-05bb-40e6-8b46-e91713ba650f?name=${name}&relationship_id=${relationship_id}`)
    return response
  }

  const getGenerateSound = async (message_id, text, style, voice, user_id) => {
    try {
    isGenerateSound.value = true

    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/5302f759-bb34-4293-a951-42977cf1b6a7`, {
      method: 'POST',
      body: {
        text: text,
        style: style ?? "นุ่มนวล",
        voice: voice,
        message_id: message_id,
        user_id: user_id,
      }
    })

    return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    } finally {
      isGenerateSound.value = false
    }
  }

  const getGenerateSoundDemo = async (message_id, text, style, voice, user_id) => {
    try {
    isGenerateSound.value = true

    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/9c5509c1-685d-4c3c-b77d-1a606516d716`, {
      method: 'POST',
      body: {
        text: text,
        style: style ?? "นุ่มนวล",
        voice: voice,
        message_id: message_id,
        user_id: user_id,
      }
    })

    return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    } finally {
      isGenerateSound.value = false
    }
  }

  const getSoundList = async () => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/d3f1b0e6-3d97-4096-a29d-75434f65fef6`)

    return response
  }

  const usePushToTalk = async (audioData) => {
    sendChatLoad.value = true
    const formData = new FormData();
    formData.append('audio', audioData, 'recording.webm');

    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/speech-to-text`, {
      method: 'POST',
      body: formData
    })
    sendChatLoad.value = false

    return response
  }

  const usePushToTalkDemo = async (audioData) => {
    sendChatLoad.value = true
    const formData = new FormData();
    formData.append('audio', audioData, 'recording.webm');

    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/f1621390-1308-469d-8dc5-fc40ac0e13b7`, {
      method: 'POST',
      body: formData
    })
    sendChatLoad.value = false

    return response
  }

  const useSendNewChatv2 = async (data, user_id) => {
    try {
      sendChatLoad.value = true;
      
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/48f2b27b-f038-4b05-bba3-e61a565a975e`, {
        method: 'POST',
        body: {
          ...data,
          user_id: user_id,
        }
      })
      await useGetWallet(user_id);

      return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    } finally {
      sendChatLoad.value = false;
    }
  }

  const useSendNewChatv2Demo = async (data, user_id) => {
    try {
      sendChatLoad.value = true;
      
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/29652ec4-844d-4d31-ae0a-f4ad5daad3ea`, {
        method: 'POST',
        body: {
          ...data,
          user_id: user_id,
        }
      })

      return response
    } catch (error) {
      $toast.error(t('toast.something_wrong'), String(error?.data?.message || error))
    } finally {
      sendChatLoad.value = false;
    }
  }

  const useUpdateRelationship = async (data) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/93ed4c3f-6947-401d-abde-781ba2d0ba46`, {
      method: 'POST',
      body: data
    })

    return response
  }

  const useUpdateRelationshipDemo = async (data) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/56382c53-71d3-4806-bf08-8ce8c6206830`, {
      method: 'POST',
      body: data
    })

    return response
  }


  return {
    getChatHistory,
    deleteSessionChat,
    getNewPlacePicture,
    getSelectSound,
    getGenerateSound,
    getSoundList,
    usePushToTalk,
    useSendNewChatv2,
    useUpdateRelationship,
    sendChatLoad,
    generateImageLoad,
    isGenerateSound,
    getChatHistoryDemo,
    useSendNewChatv2Demo,
    useUpdateRelationshipDemo,
    deleteSessionChatDemo,
    getSelectSoundDemo,
    getGenerateSoundDemo,
    usePushToTalkDemo
  }
}