import { ref } from "vue";

export const useRecommend = () => {
  const runtimeConfig = useRuntimeConfig();

  const getRecommend = async () => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/f50f0e66-ab14-4de1-87d6-852f6daf0c7e`, {
      method: "GET",
    })
    return response
  }

  return {
    getRecommend,
  }
}