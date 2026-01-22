<template>
  <div>
    <!-- ===================== DESKTOP / WEB ===================== -->
    <div
      class="hidden lg:block relative overflow-visible mb-4 lg:mb-8 xl:mb-12 mx-4 lg:mx-8 xl:mx-16 bg-cover bg-center bg-no-repeat h-[320px] xl:h-[400px] from-dark-cherri-2 from-[10%] via-cherri-2 via-[70%] to-dark-cherri-2 to-[100%] rounded-[16px]"
      :style="{ backgroundImage: `url(${bg})` }"
    >
      <div class="relative z-[1] px-6 lg:px-10 xl:px-16 py-6 xl:py-8 h-full flex">
        <div
          class="flex-shrink-0 space-y-3 xl:space-y-4 max-w-[280px] flex flex-col justify-between"
        >
          <div>
            <img :src="cherriLogo" class="w-[100px] xl:w-auto" />
            <p
              class="text-[36px] xl:text-[48px] leading-tight font-bold gradient-text"
            >
              <span>What the</span> <br />
              <span>Duck</span>
            </p>
            <p class="text-[13px] xl:text-[14px] opacity-60">
              From quick questions to deep chats <br />
              CherriChat keeps it yours
            </p>
          </div>

          <UButton
            class="font-bold text-[18px] xl:text-[20px] liquid-glass w-full active-bg h-[48px]"
            style="border-radius: 54px !important"
          >
            <div
              class="px-6 xl:px-8 truncate w-full flex justify-center items-center gap-2"
            >
              <Icon name="streamline:live-video-remix" /> Live
            </div>
          </UButton>
        </div>

        <!-- เป็ด (ตัดส่วนเกินแล้ว) -->
        <div
          class="absolute top-0 left-[260px] xl:left-[300px] h-full overflow-hidden pointer-events-none"
        >
          <img
            :src="bannerCharacter"
            alt="character"
            class="w-[340px] xl:w-[400px] -translate-y-[20px] opacity-100"
          />
        </div>

        <!-- แชททะลุ -->
        <div
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[20%] h-[280px] xl:h-[350px] flex items-center"
        >
          <img
            :src="chatAll"
            alt="chat-all"
            class="h-full w-auto object-contain"
          />
        </div>
      </div>
    </div>

    <!-- ===================== MOBILE ===================== -->
    <div
      class="lg:hidden relative mb-4 mx-4 bg-cover bg-center bg-no-repeat h-[400px] min-[400px]:h-[420px] sm:h-[460px] rounded-[16px] overflow-hidden"
      :style="{ backgroundImage: `url(${bgMobile})` }"
    >
      <div class="relative h-full px-4 min-[400px]:px-5 pt-2">
        <img :src="cherriLogo" class="w-[100px] min-[400px]:w-auto" />

        <p class="mt-2 text-[28px] min-[400px]:text-[32px] sm:text-[36px] leading-[1.05] font-bold gradient-text">
          <span>What the Duck</span>
        </p>

        <p class="mt-2 min-[400px]:mt-3 text-[13px] min-[400px]:text-[14px] sm:text-[15px] opacity-70 leading-snug">
          From quick questions to deep chats<br />
          CherriChat keeps it yours
        </p>

        <!-- 1) Chat บน (ซ้ายกลาง) -->
        <div class="absolute inset-x-0 z-[1] pointer-events-none mt-4 min-[400px]:mt-5">
          <img
            :src="chatBox1"
            alt="chat-1"
            class="absolute left-[12px] min-[400px]:left-[16px] top-0 w-[220px] min-[400px]:w-[250px] sm:w-[280px]"
          />
        </div>

        <!-- 2) เป็ด (ใหญ่ขึ้น + ลงมา) -->
        <div
          class="absolute inset-x-0 top-[130px] min-[400px]:top-[140px] sm:top-[150px] z-[2] pointer-events-none flex justify-center"
        >
          <img :src="bannerCharacter" alt="character" class="w-[240px] min-[400px]:w-65 sm:w-72" />
        </div>

        <!-- 3) Chat ล่าง (ขวากลาง) -->
        <div class="absolute inset-x-0 top-[260px] min-[400px]:top-[280px] sm:top-[310px] z-[3] pointer-events-none">
          <img
            :src="chatBox2"
            alt="chat-2"
            class="absolute right-[-20px] sm:right-[-10px] top-0 w-full"
          />
        </div>

        <!-- 4) Button (ใหญ่ ชิดล่าง) -->
        <div class="absolute inset-x-0 bottom-[16px] min-[400px]:bottom-[18px] sm:bottom-[20px] px-16 min-[400px]:px-20 sm:px-24 z-[4]">
          <UButton
            class="font-bold text-[16px] min-[400px]:text-[18px] liquid-glass w-full active-bg h-[44px] min-[400px]:h-[48px]"
            style="border-radius: 54px !important"
          >
            <div class="w-full flex justify-center items-center gap-2">
              <Icon name="streamline:live-video-remix" /> Live
            </div>
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import bannerCharacter from "@/assets/images/character.png";
import cherriLogo from "@/assets/images/cherri-logo.svg";
import bg from "@/assets/images/BG_Live_chat_Web.png";
import chatAll from "@/assets/images/chat-box-all.png";
import bgMobile from "@/assets/images/BG_Live_chat_Mobile.png";
import chatBox1 from "@/assets/images/chat_box_1.png";
import chatBox2 from "@/assets/images/chat_box_2.png";
</script>

<style scoped></style>
