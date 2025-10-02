<template>
  <div
    class="w-[80px] h-[100vh] flex flex-col justify-between items-center gap-2 border-r border-[#2c2c30] py-4"
  >
    <div class="relative w-full flex justify-center">
      <div
        class="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-gradient-to-r from-[#FDE824] to-[#FDE824] cursor-pointer"
        @click="navigateTo('/')"
      >
        <p class="text-sm font-bold text-center py-4 text-black">
          <Icon name="tabler:home" class="h-[30px] w-[30px]" />
        </p>
      </div>
      <div class="w-[3px] bg-[#FDE824] absolute inset-y-0 right-0"></div>
    </div>

    <div
      class="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-red-600 cursor-pointer"
      @click="onDeleteSessionChat"
    >
      <p class="text-sm font-bold text-center py-4">Delete</p>
    </div>
    <!-- <div class="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-gradient-to-r from-[#FDE824] to-[#FDE824] mt-2">
      <p class="text-sm font-bold text-center py-4">New Chat</p>
    </div> -->
    <!-- <div v-for="(character, index) in props.data" :key="index" @click="selectCharacter(character)" class="flex relative">
      <div class="w-1 h-10 rounded-br-lg rounded-tr-lg bg-white absolute top-[10px] left-[-10px]" />
      <img :src="`${runtimeConfig.public.N8N_IMAGE}${character.url_image}`" class="w-[60px] rounded-full" />
    </div> -->
  </div>
</template>

<script setup>
import { useChat } from "#imports";

const runtimeConfig = useRuntimeConfig();

const { deleteSessionChat } = useChat();

// const props = defineProps({
//   data: {
//     type: Array,
//   }
// })

const emit = defineEmits(["initChatRoom"]);

const selectCharacter = (character) => {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));

  localStorage.setItem(
    "latest-chat",
    JSON.stringify({
      user_id: userInfo.user_id,
      character_id: character.id,
      session_key: `ses_${userInfo.user_id}_${character.id}_ver_0`,
      url_image: `${runtimeConfig.public.N8N_IMAGE}${character.url_image}`,
    })
  );

  emit("initChatRoom");
};

const onDeleteSessionChat = async () => {
  let latest_chat = JSON.parse(localStorage.getItem("latest-chat"));
  await deleteSessionChat(latest_chat);

  window.location.reload();
};
</script>

<style scoped></style>
