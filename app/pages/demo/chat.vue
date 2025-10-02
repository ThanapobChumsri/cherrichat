<template>
  <div class="relative sm:flex">
    <ChatRoom
      @initChatRoom="initChatRoom"
      class="hidden sm:flex"
    />

    <!-- DESKTOP (character data) -->
    <!-- <ClientOnly> -->
    <CharacterBio
      v-if="!isMobile"
      :data="characterData"
      :emotion="characterRelationData?.emotion"
      :relationship-id="characterRelationData?.id"
      :sound-id="characterRelationData?.sound_id"
    />
    <!-- </ClientOnly> -->

    <ChatContent
      :data="chatHistory"
      :image="imagePlace"
      :image-object="characterData?.original_place_img"
      :sound-id="characterRelationData?.sound_id"
      @sendNewChat="sendNewChat"
      @getChatHistoryInfinite="getChatHistoryInfinite"
    />

    <!-- DESKTOP (relation) -->
    <CharacterRelation
      v-if="!isMobile"
      :data="characterRelationData"
      :image="imagePlace"
      :image-object="characterData?.original_place_img"
    />

    <!-- MOBILE (character data) -->
    <USlideover
      v-if="isMobile"
      :title="$t('character.bio')"
      aria-describedby="char-bio"
      class="absolute top-4 right-4"
    >
      <UButton
        :label="$t('character.bio')"
        color="neutral"
        variant="subtle"
        icon="ri:arrow-left-s-line"
        class="w-[140px]"
      />

      <template #body>
        <CharacterBio
          :data="characterData"
          :emotion="characterRelationData?.emotion"
          :relationship-id="characterRelationData?.id"
          :sound-id="characterRelationData?.sound_id"
        />
      </template>
    </USlideover>

    <!-- MOBILE (relation) -->
    <USlideover
      v-if="isMobile"
      :title="$t('location.info')"
      aria-describedby="char-relation"
      class="absolute top-14 right-4"
    >
      <UButton
        :label="$t('location.info')"
        color="neutral"
        variant="subtle"
        icon="ri:arrow-left-s-line"
        class="w-[140px]"
      />

      <template #body>
        <CharacterRelation
          :data="characterRelationData"
          :image="imagePlace"
          :image-object="characterData?.original_place_img"
        />
      </template>
    </USlideover>

  </div>
</template>

<script setup>
import { useChat } from "#imports";
import { useBreakpoint } from "#imports";
import { useWebSocket } from "#imports";

import ChatRoom from "~/components/chat/ChatRoom.vue";
import ChatContent from "~/components/chat/ChatContent.vue";
import CharacterBio from "~/components/chat/CharacterBio.vue";
import CharacterRelation from "~/components/chat/CharacterRelation.vue";

definePageMeta({
  layout: "chat",
});

const { getChatHistory, getChatHistoryDemo, getNewPlacePicture, useSendNewChatv2, useSendNewChatv2Demo, useUpdateRelationship, useUpdateRelationshipDemo } = useChat();

const isDemoMode = computed(() => useRoute().path.startsWith('/demo'))
const { isMobile } = useBreakpoint();
const { $toast } = useNuxtApp()
const { openChatConnection } = useWebSocket()

const latestChat = ref({});
const characterData = ref([]);
const characterRelationData = ref({});
const chatHistory = ref([]);
const imagePlace = ref(null);
const isStopInfiniteLoading = ref(false);

let page = 1
let perPage = 10

onMounted(async () => {
  try {
    const latest_chat = localStorage.getItem("latest-chat");

    if (!latest_chat) {
      navigateTo("/demo");
    }

    latestChat.value = JSON.parse(latest_chat);

  } catch (error) {
    console.error(error);
  }
});

watch(
  () => characterRelationData.value,
  async (newValue) => {
    if (newValue) {
      if (newValue.current_image_url == null) {
        imagePlace.value = characterData.value.original_place_img;
      } else {
        imagePlace.value = newValue.current_image_url;
      }
    }
  }
);

const initChatRoom = async (chatData) => {
  characterData.value = latestChat.value?.character_info;

  if (!chatData) {
    chatData = await (isDemoMode.value ? getChatHistoryDemo : getChatHistory)(latestChat.value, page, perPage);
  }

  if (
    Object.keys(chatData[0]).length === 0 ||
    chatData[0].messages.length === 0
  ) {
    await sendNewChat(""); // first greeting with emtyp
  } else {
    chatHistory.value = [...chatData[0].messages.filter((e) => e.content !== "").reverse(), ...chatHistory.value]
    characterRelationData.value = chatData[0].relationship;
  }

  await openChatConnection(latestChat.value)

};

const pushChatHistory = (content, role, type, id) => {
  chatHistory.value.push({
    content_type: type,
    content,
    role,
    created_at: new Date(),
    id,
  })
}

const sendNewChat = async (message = "") => {
  if (message) {
    pushChatHistory(message, "user", "text", null)
  }

  pushChatHistory("", "assistant", "loading", null)
  const chatRefactor = await (isDemoMode.value ? useSendNewChatv2Demo : useSendNewChatv2)({ ...latestChat.value, message: message }, latestChat.value.user_id)
  chatHistory.value.pop();

  if (!chatRefactor) {
    chatHistory.value.pop();
    isStopInfiniteLoading.value = true;
    return;
  }

  pushChatHistory(chatRefactor.message, "assistant", "text", chatRefactor.id)

  const relationRefactor  = await (isDemoMode.value ? useUpdateRelationshipDemo : useUpdateRelationship)({ ...latestChat.value, ai_message: chatRefactor.message, message: message })
  characterRelationData.value = relationRefactor.relationship

  // update image when change current_place
  if (characterRelationData.value.current_place !== characterRelationData.value.previous_place) {
    const res = await getNewPlacePicture({
      character_id: latestChat.value.character_id,
      new_place: characterRelationData.value.current_place,
      user_id: latestChat.value.user_id,
      session_id: characterRelationData.value.session_id,
    });
    imagePlace.value = res.current_image_url;
  }
};

const getChatHistoryInfinite = async (state, chatContainer) => {
  const container = chatContainer.value
  if (!container || isStopInfiniteLoading.value) {
    state.complete()
    return;
  };

  const oldScrollHeight = container.scrollHeight;
  const oldScrollTop = container.scrollTop;

  const response = await (isDemoMode.value ? getChatHistoryDemo : getChatHistory)(latestChat.value, page, perPage)

  const firstChat = Object.keys(response[0]).length === 0 ? true : false;
  const lastPage = firstChat ? true : Object.keys(response[0].messages[0]).length > 0

  if (lastPage) {
    await initChatRoom(response)
    page++

    await nextTick()
    const newScrollHeight = container.scrollHeight
    container.scrollTop = oldScrollTop + (newScrollHeight - oldScrollHeight)

    state.loaded()
  } else {
    state.complete()
  }
}

// provide function
const updateCharacterRelationData = (object) => {
  characterRelationData.value = { ...characterRelationData.value, ...object}
}
const updateChatHistory = (object, index) => {
  chatHistory.value[index] = { ...chatHistory.value[index], ...object }
}
const pushChatHistoryUserLoad = () => {
  chatHistory.value.push({
    content_type: "loading",
    content: "",
    role: "user",
    created_at: new Date(),
  });
}
const popChatHistory = () => {
  chatHistory.value.pop();
}
provide('sendNewChat', sendNewChat)
provide('updateCharacterRelationData', updateCharacterRelationData)
provide('updateChatHistory', updateChatHistory)
provide('pushChatHistoryUserLoad', pushChatHistoryUserLoad)
provide('popChatHistory', popChatHistory)

</script>

<style scoped></style>