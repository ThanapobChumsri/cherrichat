import { ref } from "vue";

export const useTop10 = () => {
  const runtimeConfig = useRuntimeConfig();

  const getTop10User = async () => {
    const response = await $fetch(`${runtimeConfig.public.N8N_URL_V3}/1eee0131-8430-4026-aef6-d4734ccff5cf`, {
      method: "GET",
    })
    return response
  }

  return {
    getTop10User,
  }
}