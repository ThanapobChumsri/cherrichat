<template>
  <div class="relative flex flex-col flex-1 h-screen"
    :style="{
      background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url(${currentImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      // opacity: 0.8
    }"
  >
    <!-- collapse button -->
    <div 
      v-if="!isMobile" 
      class="absolute bg-cherri-gradient h-20 flex items-center z-10 left-[-1px] rounded-tr-md rounded-br-md" 
      @click="emit('toggleCollapse', 'bio')"
    >
      <Icon 
        name="ri:arrow-left-s-line"
        class="w-[32px] h-[32px] text-dark-cherri-2 cursor-pointer hover:w-[44px] transition-width duration-200"
        :class="isCollapseBio ? 'rotate-180' : 'rotate-0'"
      />
    </div>
    <div 
      v-if="!isMobile" 
      class="absolute bg-cherri-gradient h-20 flex items-center z-10 right-[-1px] rounded-tl-md rounded-bl-md " 
      @click="emit('toggleCollapse', 'relation')"
    >
      <Icon 
        name="ri:arrow-right-s-line"
        class="w-[32px] h-[32px] text-dark-cherri-2 cursor-pointer hover:w-[44px] transition-width duration-200"
        :class="isCollapseRelation ? 'rotate-180' : 'rotate-0'"
      />
    </div>
    
    <!-- Character zone -->
    <div class="fixed w-full sm:static bg-[#163854F2] sm:bg-transparent flex gap-2 sm:block p-2 mt-20 sm:mt-0 sm:px-12 sm:py-4">
      <img :src="latestChat.url_image" alt="character-image" class="sm:hidden h-16 aspect-square rounded-full" />
      <div class="flex-1 space-y-2">
        <p class="gradient-text text-xl sm:text-[32px] sm:min-h-[48px]">{{ characterData?.name }}</p>
        <div class="flex sm:hidden gap-2">
          <UButton :label="$t('character.bio')" class="w-full bg-cherri-gradient uhover text-white rounded-2xl" @click="emit('toggleCollapse', 'bio')"/>
          <UButton :label="$t('location.info')" class="w-full bg-yellow-gradient uhover text-white rounded-2xl" @click="emit('toggleCollapse', 'relation')" />
        </div>
      </div>
      <div class="hidden sm:flex gap-2 pt-2">
        <div class="flex items-center gap-4 w-[200px]">
          <div class="liquid-glass py-1 px-4 !bg-[#EF3E41] !text-[#34415C] font-medium">
            {{ $t('chat.age') }}
          </div>
          <div class="font-medium text-white truncate">
            {{ characterData?.personality?.age }}
          </div>
        </div>
        <div class="flex items-center gap-4 w-[200px]">
          <div class="liquid-glass py-1 px-4 !bg-[#EF3E41] !text-[#34415C] font-medium">
            {{ $t('chat.gender') }}
          </div>
          <div class="font-medium text-white truncate">
            {{ characterData?.gender === "m" ? $t('chat.m') : $t('chat.f') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Chat zone -->
    <div
      id="step4"
      ref="chatContainer"
      class="flex-1 space-y-2 sm:rounded-lg mt-[180px] sm:mt-0 overflow-y-auto sm:mb-4 px-2 sm:px-6"
    >
      <InfiniteLoading top @infinite="getMoreChatHistory" class="mb-2">
        <template #spinner>
          <p class="flex justify-center">
            <icon
              name="eos-icons:loading"
              style="width: '28px'; height: '28px'"
            />
          </p>
        </template>
        <template #complete>
          <USeparator
            :label="$t('chat.oldest_message')"
            size="xs"
            color="white"
          />
        </template>
      </InfiniteLoading>

      <div
        v-for="(chat, index) in props.data"
        :key="index"
        class="flex items-end text-sm z-100"
        :class="{ 
          'justify-end': chat.role === 'user'
        }"
      >
        <!-- image section -->
        <img
          v-if="chat.role !== 'user'"
          :src="latestChat.url_image"
          class="hidden sm:block w-[40px] h-[40px] rounded-full mr-2"
        />
        <!-- message section -->
        <div class="sm:max-w-3/5">
          <!-- 1. message box -->
          <div
            class="px-4 py-3 rounded-tl-lg rounded-tr-lg"
            :class="{
              'bg-[#FFD470] rounded-bl-lg': chat.role === 'user',
              'bg-[#F25C54] rounded-br-lg border border-[#2c2c30]':
                chat.role !== 'user',
              'min-w-[200px] sm:min-w-[300px]': chat.content_type === 'loading',
            }"
          >
            <p
              v-for="(msg, j) in useSplitTypeMessage(chat.content)"
              :key="j"
              :class="{
                'text-black': chat.role === 'user',
                'text-[#9898A2] italic': checkTypeMessage(msg) === 'action',
                'mb-4 text-black': j !== useSplitTypeMessage(chat.content).length - 1,
              }"
              v-html="useDisplayMessage(msg)"
            />
            <div
              v-if="chat.content_type === 'loading'"
              class="flex flex-col gap-4"
            >
              <USkeleton class="h-4 w-full bg-[#9898A2]" />
              <USkeleton class="h-4 w-3/4 bg-[#9898A2]" />
            </div>
          </div>

          <!-- 2. option box -->
          <div
            v-if="chat.content_type !== 'loading'"
            class="flex items-center gap-2 mt-1"
            :class="{ 'justify-end': chat.role === 'user' }"
          >
            <!-- 2.1 time date option -->
            <p
              class="text-[#9898A2] text-xs"
              :class="chat.role === 'user' ? 'text-end' : 'text-start'"
            >
              {{ useFormattedTime12h(chat.created_at) }}
            </p>
            <!-- 2.2 play sound option -->
            <div id="step5">
              <UButton
                v-if="iconPlaySoundType(chat, index) === 'generate'"
                icon="teenyicons:sound-on-solid"
                size="xs"
                color="neutral"
                variant="ghost"
                class="cursor-pointer"
                @click="clickGenerateAudio(chat.id, chat.content, index)"
              />
              <UButton
                v-else-if="iconPlaySoundType(chat, index) === 'play'"
                icon="iconoir:play-solid"
                size="xs"
                color="neutral"
                variant="ghost"
                class="cursor-pointer"
                @click="clickPlaySound(chat.url_sound, index)"
              />
              <UButton
                v-else-if="iconPlaySoundType(chat, index) === 'loading'"
                icon="eos-icons:loading"
                size="xs"
                color="neutral"
                variant="ghost"
                class="cursor-pointer"
                disabled
              />
              <UButton
                v-else-if="iconPlaySoundType(chat, index) === 'stop'"
                icon="material-symbols:stop-rounded"
                size="xs"
                color="neutral"
                variant="ghost"
                class="cursor-pointer"
                @click="clickStopSound"
              />
            </div>
          </div>
        </div>
        <div
          v-if="chat.role == 'user'"
          :src="latestChat.url_image"
          class="hidden sm:block w-[40px] h-[40px] rounded-full ml-2"
        >
          <Icon name="tdesign:user-circle-filled" class="w-full h-full" />
        </div>
      </div>
      
    </div>

    <div class="sm:hidden p-2">
      <UButton class="left-2 bottom-2 rounded-2xl bg-cherri-gradient text-white uhover" label="Reset Chat" trailingIcon="system-uicons:reset-hard" @click="clickResetSession" />
    </div>

    <audio id="main-audio" />

    <!-- Type & Talk zone -->
    <div
      class="z-20 sm:mb-4 bg-[#163854F2] border-t border-[#2c2c30] p-2 sm:p-4 sm:rounded-xl">
      <div v-if="chatMode === 'type'">
        <UTextarea
          v-model="newMessage"
          :placeholder="$t('chat.typing_here')"
          :rows="3"
          class="block bg-[#1A1917] sm:rounded-xl"
          color="info"
          variant="ghost"
          v-bind="textareaProps"
        />
        <div class="relative flex items-center justify-between gap-2 pt-2">
          <p class="text-xs text-[#9898A2]">{{ $t("chat.description") }}</p>
          <div class="flex gap-2">
            <UButton
              id="step1"
              icon="mdi:microphone-outline"
              class="text-white rounded-full cursor-pointer bg-cherri hover:text-black"
              color="neutral"
              @click="switchChatMode"
            />
            <UButton
              id="step2"
              v-if="!sendChatLoad"
              :label="$t('chat.send')"
              color="neutral"
              class="px-4 text-white rounded-full cursor-pointer bg-cherri hover:text-black"
              @click="sendNewMessage"
            />
            <UButton
              v-else
              icon="eos-icons:loading"
              color="neutral"
              variant="ghost"
              disabled
            />
          </div>
        </div>
      </div>
      <PushToTalk
        v-else-if="chatMode === 'talk'"
        @switchChatMode="switchChatMode"
      />
    </div>
  </div>
</template>

<script setup>
import InfiniteLoading from "v3-infinite-loading";

import { useChat } from "#imports";
import { useModal } from "#imports";
import { useNuxtui } from "#imports";
import { useFormat } from "#imports";
import { useBreakpoint } from "#imports";
import { inject } from "#imports";
import PushToTalk from "./PushToTalk.vue";

const runtimeConfig = useRuntimeConfig();
const props = defineProps({
  data: {
    type: Array,
  },
  image: {
    type: String,
  },
  imageObject: {
    type: String,
  },
  soundId: {
    type: String,
  },
  characterData: {
    type: Object,
  },
  isCollapseBio: {
    type: Boolean,
    default: false,
  },
  isCollapseRelation: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const {
  sendChatLoad,
  getGenerateSound,
  getGenerateSoundDemo,
  isGenerateSound,
  deleteSessionChat,
} = useChat();
const isDemoMode = computed(() => route.path.startsWith("/demo"));
const { onOpenSoundModal } = useModal();
const { useSubmitOnEnter } = useNuxtui();
const {
  useFormattedTime12h,
  useDisplayMessage,
  useSplitTypeMessage,
  useCleanTextForAudio,
} = useFormat();
const { isMobile } = useBreakpoint();
const { $toast } = useNuxtApp();
const updateChatHistory = inject("updateChatHistory");

const emit = defineEmits(["sendNewChat", "getChatHistoryInfinite", "toggleCollapse"]);

const latestChat = ref({});
const soundList = ref([]);
const chatContainer = ref(null);
const newMessage = ref("");
const scrollRender = ref(true);
const chatMode = ref("type");

const shouldScrollBottom = ref(false);

const playSoundIndex = ref(null);
const currentSource = ref(null);
const isPlaying = ref(false);

const textareaProps = useSubmitOnEnter(() => sendNewMessage());

const scrollToBottom = () => {
  if (chatContainer.value) {
    if (scrollRender.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    } else {
      chatContainer.value.scrollTo({
        top: chatContainer.value.scrollHeight,
        behavior: "smooth",
      });
    }
  }
};

const currentImage = computed(() => {
  if (latestChat.value.original_place && Object.keys(props.data).length) {
    if (latestChat.value.original_place === props.data.current_place) {
      return runtimeConfig.public.N8N_IMAGE + props.imageObject;
    } else {
      return runtimeConfig.public.N8N_IMAGE + props.image;
    }
  }
  return "";
});

onMounted(async () => {
  await nextTick();
  scrollToBottom();

  refreshLocalStorage();
});

watch(
  () => props.data,
  async () => {
    if (shouldScrollBottom.value) {
      await nextTick();
      scrollToBottom();
      scrollRender.value = false;

      // refreshLocalStorage();
    }
  },
  { deep: true }
);

const sendNewMessage = () => {
  if (newMessage.value && !sendChatLoad.value) {
    emit("sendNewChat", newMessage.value);
    newMessage.value = "";
    shouldScrollBottom.value = true;
  }
};

const refreshLocalStorage = () => {
  const latest_chat = localStorage.getItem("latest-chat");
  const sound_list = localStorage.getItem("sound-list");

  if (!latest_chat && !sound_list) {
    navigateTo("/");
  }

  latestChat.value = JSON.parse(latest_chat);
  soundList.value = JSON.parse(sound_list);
};

const checkTypeMessage = (message) => {
  if (message.startsWith("*") && message.endsWith("*")) return "action";
  if (message.startsWith('"') && message.endsWith('"')) return "dialog";
  return "normal";
};

const clickGenerateAudio = async (message_id, message, index) => {
    playSoundIndex.value = index;

    const text = useCleanTextForAudio(message);
    const style = latestChat.value.character_info.voice_style?.replaceAll(
      '"',
      ""
    );
    const responseData = await (isDemoMode.value
      ? getGenerateSoundDemo
      : getGenerateSound)(
      message_id,
      text,
      style,
      latestChat.value.user_id,
      props.characterData.id
    );

    if (!responseData) {
      playSoundIndex.value = null;
      return;
    }

    let candidates;
    if (Array.isArray(responseData.tts)) {
      candidates = responseData.tts[0]?.candidates;
    } else {
      candidates = responseData.tts?.candidates;
    }

    if (!candidates || !candidates[0]?.content?.parts?.[0]?.inlineData) {
      throw new Error("ไม่พบข้อมูลเสียงในการตอบกลับ");
    }

    const inlineData = candidates[0].content.parts[0].inlineData;
    const audioData = inlineData.data;
    const mimeType = inlineData.mimeType;

    if (mimeType.includes("L16") || mimeType.includes("pcm")) {
      const sampleRate = mimeType.match(/rate=(\d+)/)?.[1] || "24000";

      updateChatHistory({ url_sound: responseData.url_sound }, index);
      try {
        await autoPlaySound(audioData, parseInt(sampleRate));
      } catch (error) {
        // handle error cannot play sound
        playSoundIndex.value = null;
      }
    } else {
      // handle error type not support
      playSoundIndex.value = null;
    }
};

// play after clickGenerateAudio function
const autoPlaySound = async (base64Data, sampleRate = 24000) => {
  try {
    isPlaying.value = true;

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const samples = new Int16Array(bytes.buffer);

    const audioBuffer = audioContext.createBuffer(
      1,
      samples.length,
      sampleRate
    );
    const channelData = audioBuffer.getChannelData(0);

    for (let i = 0; i < samples.length; i++) {
      channelData[i] = samples[i] / 32768.0;
    }

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();

    currentSource.value = source;

    source.onended = () => {
      currentSource.value = null;
      playSoundIndex.value = null;
      isPlaying.value = false;
    };

    // return audioBuffer;
  } catch (error) {
    console.error("Error playing PCM audio:", error);
    throw error;
  }
};

const clickPlaySound = (url_sound, index) => {
  isPlaying.value = true;
  playSoundIndex.value = index;

  const player = document.getElementById("main-audio");
  player.src = `${runtimeConfig.public.N8N_URL_V3}/65c6ad2c-fdff-414c-8b62-c97436cb6a86?url_sound=${url_sound}`;
  player.play();

  currentSource.value = player;

  player.onended = () => {
    currentSource.value = null;
    isPlaying.value = false;
    playSoundIndex.value = null;
  };
};

const clickStopSound = () => {
  if (currentSource.value) {
    // HTMLAudioElement
    if (currentSource.value instanceof HTMLAudioElement) {
      currentSource.value.pause();
      currentSource.value.currentTime = 0;
    }
    // Web Audio API source
    else if (currentSource.value.stop) {
      currentSource.value.stop();
      currentSource.value.disconnect?.();
    }

    currentSource.value = null;
    isPlaying.value = false;
    playSoundIndex.value = null;
  }
};

const iconPlaySoundType = (chat, index) => {
  if (chat.role !== "assistant") return "none";
  if (index !== playSoundIndex.value) {
    return chat.url_sound ? "play" : "generate";
  }
  return isGenerateSound.value ? "loading" : isPlaying.value ? "stop" : "none";
};

const switchChatMode = () => {
  if (chatMode.value === "type") {
    chatMode.value = "talk";
  } else if (chatMode.value === "talk") {
    chatMode.value = "type";
  }
};

const getMoreChatHistory = async ($state) => {
  shouldScrollBottom.value = false;
  emit("getChatHistoryInfinite", $state, chatContainer);
};

const clickResetSession = async () => {
  const latestChat = JSON.parse(localStorage.getItem('latest-chat'))
  if (latestChat) {
    await deleteSessionChat(latestChat)
    window.location.reload();
  }
}
</script>

<style>
.gradient-text {
  background: linear-gradient(271.93deg, #f5f0e0 6.58%, #ef3e41 102.47%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text; /* For Firefox */
  color: transparent;
  font-weight: 700;
  font-style: Bold;
}
</style>
