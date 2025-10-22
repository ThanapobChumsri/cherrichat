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
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/03afa14f-d7b6-45bd-b735-bf166256f723?page=${page}&per_page=${per_page}`, {
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
    await $fetch(`${runtimeConfig.public.N8N_URL_V3}/0038e233-b560-469c-944c-7992cf29f975`, {
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
    
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/a5d28a4c-6ccd-4c30-87d5-eab394b7be0f`, {
      method: 'POST',
      body: data
    })

    generateImageLoad.value = false
    return response
  }

  const getSelectSound = async (name, relationship_id) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/b1024ddb-03b9-481d-b1da-c3b6fd11fd6e?name=${name}&relationship_id=${relationship_id}`)
    return response
  }

  const getSelectSoundDemo = async (name, relationship_id) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/b9e77495-05bb-40e6-8b46-e91713ba650f?name=${name}&relationship_id=${relationship_id}`)
    return response
  }

  const getGenerateSound = async (message_id, text, style, voice, user_id) => {
    try {
    isGenerateSound.value = true

    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/57733aae-5a1c-41a4-b893-a6336f5b45d2`, {
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
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/e3ec8775-7563-4ec8-b8fe-083d9f5c4b29`)

    return response
  }

  const usePushToTalk = async (audioData) => {
    sendChatLoad.value = true
    const formData = new FormData();
    formData.append('audio', audioData, 'recording.webm');

    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/95a37fa4-f19d-40d7-97e2-5266ba58d224`, {
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
      
      const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/0be311c5-3cab-4596-bf69-a40c1c7ff241`, {
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
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/4505f50c-852c-4534-95fe-7d9874ace5a4`, {
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

  const getSessionChatByUserId = async (user_id) => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/4a477dca-382d-489b-856c-49aef420891d`, {
      method: "GET",
      params: { user_id }
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
    usePushToTalkDemo,
    getSessionChatByUserId,
  }
}