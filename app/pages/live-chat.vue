<template>
  <div
    class="relative flex flex-col flex-1 h-screen sm:pt-24"
    :style="{
      background: `linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.5)), url(${coverImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
    }"
  >
    <!-- Character zone -->
    <div
      class="fixed w-full sm:static bg-[#163854F2] sm:bg-transparent !flex gap-2 sm:block p-2 mt-20 sm:mt-0 sm:px-12 sm:py-4"
    >
      <div class="flex items-center">
        <img
          :src="characterImage"
          alt="character-image"
          class="sm:hidden h-23 aspect-square rounded-full object-cover"
        />

        <img
          :src="characterImage"
          alt="character-image"
          class="hidden sm:block w-[197px] h-[225px] object-cover rounded-xl"
        />
      </div>

      <div class="flex-1">
        <div class="space-y-2 mb-3 sm:mb-0">
          <p class="gradient-text text-lg sm:text-[32px] sm:min-h-[48px]">
            {{ characterName }}
          </p>
        </div>

        <!-- Mobile: Same layout as desktop but smaller -->
        <div class="sm:hidden space-y-2">
          <div class="flex gap-2">
            <div class="flex items-center gap-2 flex-1">
              <div
                class="liquid-glass py-1 px-2 !bg-[#EF3E41] !text-[#34415C] font-medium text-xs whitespace-nowrap"
              >
                {{ $t("chat.age") }}
              </div>
              <div class="font-medium text-white text-xs truncate">
                {{ characterAge }}
              </div>
            </div>
            <div class="flex items-center gap-2 flex-1">
              <div
                class="liquid-glass py-1 px-2 !bg-[#EF3E41] !text-[#34415C] font-medium text-xs whitespace-nowrap"
              >
                {{ $t("chat.gender") }}
              </div>
              <div class="font-medium text-white text-xs truncate">
                {{ gender === "Man" ? $t("chat.m") : $t("chat.f") }}
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="flex items-center gap-2 flex-1">
              <div
                class="liquid-glass py-1 px-2 !bg-[#EF3E41] !text-[#34415C] font-medium text-xs whitespace-nowrap"
              >
                {{ $t("character.nationality") }}
              </div>
              <div class="font-medium text-white text-xs truncate">
                {{ nationality }}
              </div>
            </div>
            <div class="flex items-center gap-2 flex-1">
              <div
                class="liquid-glass py-1 px-2 !bg-[#EF3E41] !text-[#34415C] font-medium text-xs whitespace-nowrap"
              >
                {{ $t("character.occupation") }}
              </div>
              <div class="font-medium text-white text-xs truncate">
                {{ occupation }}
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop: Original layout -->
        <div class="hidden sm:flex gap-2 pt-2">
          <div class="flex items-center gap-4 w-[200px]">
            <div
              class="liquid-glass py-1 px-4 !bg-[#EF3E41] !text-[#34415C] font-medium"
            >
              {{ $t("chat.age") }}
            </div>
            <div class="font-medium text-white truncate">
              {{ characterAge }}
            </div>
          </div>
          <div class="flex items-center gap-4 w-[200px]">
            <div
              class="liquid-glass py-1 px-4 !bg-[#EF3E41] !text-[#34415C] font-medium"
            >
              {{ $t("chat.gender") }}
            </div>
            <div class="font-medium text-white truncate">
              {{ gender === "Man" ? $t("chat.m") : $t("chat.f") }}
            </div>
          </div>
        </div>
        <div class="hidden sm:flex gap-2 pt-4">
          <div class="flex items-center gap-4 w-[200px]">
            <div
              class="liquid-glass py-1 px-4 !bg-[#EF3E41] !text-[#34415C] font-medium"
            >
              {{ $t("character.nationality") }}
            </div>
            <div class="font-medium text-white truncate">
              {{ nationality }}
            </div>
          </div>
          <div class="flex items-center gap-4 w-[200px]">
            <div
              class="liquid-glass py-1 px-4 !bg-[#EF3E41] !text-[#34415C] font-medium"
            >
              {{ $t("character.occupation") }}
            </div>
            <div class="font-medium text-white truncate">
              {{ occupation }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat zone -->
    <div
      ref="chatContainer"
      class="flex-1 space-y-2 sm:rounded-lg mt-[210px] sm:mt-0 overflow-y-auto sm:mb-4 px-2 sm:px-6"
    >
      <div
        v-for="(chat, index) in displayedMessages"
        :key="index"
        class="flex items-end text-sm z-100"
        :class="{
          'justify-end': chat.role === '1',
        }"
      >
        <!-- image section -->
        <img
          v-if="chat.role === '2'"
          :src="characterImage"
          class="hidden sm:block w-[40px] h-[40px] rounded-full mr-2"
        />
        <!-- message section -->
        <div class="sm:max-w-3/5">
          <!-- 1. message box -->
          <div
            class="px-4 py-3 rounded-tl-lg rounded-tr-lg"
            :class="{
              'bg-[#FFD470] rounded-bl-lg': chat.role === '1',
              'bg-[#121823] rounded-br-lg border border-[#2c2c30]':
                chat.role === '2',
              'min-w-[200px] sm:min-w-[300px]': chat.isLoading,
            }"
          >
            <p
              v-if="!chat.isLoading"
              :class="{
                'text-[#8F792F]': chat.role === '1',
                'text-white': chat.role === '2',
              }"
            >
              {{ chat.content }}
            </p>
            <div v-if="chat.isLoading" class="flex flex-col gap-4">
              <USkeleton class="h-4 w-full bg-[#9898A2]" />
              <USkeleton class="h-4 w-3/4 bg-[#9898A2]" />
            </div>
          </div>

          <!-- 2. option box -->
          <div
            v-if="!chat.isLoading"
            class="flex items-center gap-2 mt-1"
            :class="{ 'justify-end': chat.role === '1' }"
          >
            <!-- 2.1 time date option -->
            <p
              class="text-[#9898A2] text-xs"
              :class="chat.role === '1' ? 'text-end' : 'text-start'"
            >
              {{ useFormattedTime12h(chat.created_at) }}
            </p>
          </div>
        </div>
        <div
          v-if="chat.role === '1'"
          class="hidden sm:block w-[40px] h-[40px] rounded-full ml-2"
        >
          <Icon name="tdesign:user-circle-filled" class="w-full h-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import coverImage from "~/assets/images/bg-live-chat.png";
import { useLiveChat } from "#imports";
import { useFormat } from "#imports";

definePageMeta({
  layout: "chat",
});

const { getLiveChatMessages } = useLiveChat();
const { useFormattedTime12h } = useFormat();

const chatContainer = ref(null);
const displayedMessages = ref([]);
const allMessages = ref([]);
const characterImage = ref(
  "https://cdn.britannica.com/87/2087-050-8B2A01CD/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg",
);
const characterName = ref("MOCK");
const characterAge = ref("");
const gender = ref("");
const occupation = ref("");
const nationality = ref("");

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTo({
      top: chatContainer.value.scrollHeight,
      behavior: "smooth",
    });
  }
};

const addMessageWithDelay = async (message, delay) => {

    console.log("test message", message);
    
  await new Promise((resolve) => setTimeout(resolve, delay));

  // แสดง loading ถ้าเป็น role 2 (assistant)
  if (message.role === "2") {
    displayedMessages.value.push({
      ...message,
      isLoading: true,
    });
    await nextTick();
    scrollToBottom();

    // รอ random เวลาระหว่าง 1-3 วินาที
    const loadingDelay = Math.random() * 2000 + 1000;
    await new Promise((resolve) => setTimeout(resolve, loadingDelay));

    // ลบ loading และแสดงข้อความจริง
    displayedMessages.value.pop();
  }

  displayedMessages.value.push({
    ...message,
    isLoading: false,
  });

  await nextTick();
  scrollToBottom();
};

const playMessagesSequentially = async (messages) => {
  for (const message of messages) {
    // ข้ามข้อความที่ไม่มี content
    if (!message.content) continue;

    // Random delay ระหว่าง 2-5 วินาทีสำหรับแต่ละข้อความ
    const delay = Math.random() * 3000 + 2000;
    await addMessageWithDelay(message, delay);
  }
};

onMounted(async () => {
  try {
    // ดึง user_id จาก localStorage
    const userInfo = localStorage.getItem("user-info");
    const userId = userInfo ? JSON.parse(userInfo).user_id : null;

    // ดึง character_id จาก localStorage
    const characterId = localStorage.getItem("live-chat-character-id");

    if (!userId || !characterId) {
      console.error("Missing user_id or character_id");
      navigateTo("/");
      return;
    }

    // เรียก API
    const response = await getLiveChatMessages(userId, characterId);

    if (response && response.messages) {
      // เรียงข้อความตาม created_at
      allMessages.value = response.messages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      );

      // อัพเดทข้อมูลตัวละคร
      if (allMessages.value.length > 0) {
        const firstMessage = allMessages.value[0];
        characterName.value = firstMessage.name || "MOCK";
        characterAge.value = firstMessage.age || "";
        gender.value = firstMessage.gender || "";
        occupation.value = firstMessage.occupation || "";
        nationality.value = firstMessage.nationality || "";

        characterImage.value = firstMessage.url_image || characterImage.value;
      }

      // เริ่มแสดงข้อความทีละข้อความ
      await playMessagesSequentially(allMessages.value);
    }
  } catch (error) {
    console.error("Error loading live chat:", error);
  }
});
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(271.93deg, #f5f0e0 6.58%, #ef3e41 102.47%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: 700;
  font-style: Bold;
}
</style>
