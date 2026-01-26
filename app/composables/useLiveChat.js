export const useLiveChat = () => {
  const runtimeConfig = useRuntimeConfig();

  const getLiveChatMessages = async (user_id, character_id) => {
    try {
      const response = await $fetch(
        `${runtimeConfig.public.N8N_URL_V3}/1f5acdc4-d5c0-4cc6-8c03-c6e5f67cafac`,
        {
          method: "GET",
          params: {
            user_id,
            character_id,
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Error fetching live chat messages:", error);
      throw error;
    }
  };

  return {
    getLiveChatMessages,
  };
};
