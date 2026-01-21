<template>
  <div
    class="relative overflow-visible mb-4 sm:mb-12 mx-4 sm:mx-16 bg-cover bg-center bg-no-repeat h-[400px] from-dark-cherri-2 from-[10%] via-cherri-2 via-[70%] to-dark-cherri-2 to-[100%] rounded-[16px]"
    :style="{ backgroundImage: `url(${bg})` }"
  >
    <div class="relative z-[1] px-6 sm:px-16 py-6 sm:py-8 h-full flex">
      <div
        class="flex-shrink-0 space-y-3 sm:space-y-4 max-w-[280px] sm:max-w-none flex flex-col justify-between"
      >
        <div>
          <img :src="cherriLogo" class="w-[120px] sm:w-auto" />
          <p
            class="text-[32px] sm:text-[48px] leading-tight font-bold gradient-text"
          >
            <span>What the</span> <br />
            <span>Duck</span>
          </p>
          <p class="text-[12px] sm:text-[14px] opacity-60">
            From quick questions to deep chats <br />
            CherriChat keeps it yours
          </p>
        </div>
        <UButton
          class="font-bold text-[16px] sm:text-[20px] liquid-glass w-full active-bg h-[48px]"
          style="border-radius: 54px !important"
        >
          <div class="px-4 sm:px-8 truncate w-full flex justify-center items-center gap-2">
            <Icon name="streamline:live-video-remix"/> Live
          </div>
        </UButton>
      </div>
      <!-- เป็ด -->
      <div
        class="absolute top-0 left-[300px] h-full overflow-hidden pointer-events-none"
      >
        <img
          :src="bannerCharacter"
          alt="character"
          class="w-100 -translate-y-[20px] opacity-40 md:opacity-100"
        />
      </div>

      <!-- แชททะลุ -->
      <div
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[20%] h-[350px] flex items-center"
      >
        <img
          :src="chatAll"
          alt="chat-all"
          class="h-full w-auto object-contain"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import bannerCharacter from "@/assets/images/character.png";
import cherriLogo from "@/assets/images/cherri-logo.svg";
import bg from "@/assets/images/BG_Live_chat_Web.png";
import chatAll from "@/assets/images/chat-box-all.png";
import { useBreakpoint } from "#imports";

const { isMobile } = useBreakpoint();
</script>

<style scoped></style>
