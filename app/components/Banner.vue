<template>
  <div class="relative overflow-hidden mb-12 bg-gradient-to-r from-dark-cherri-2 from-[10%] via-cherri-2 via-[70%] to-dark-cherri-2 to-[100%] mx-16 rounded-[16px]">
    <div class="px-24 py-8 space-y-6">
      <p class="text-[36px] leading-12 font-bold">Personal AI <br>Professional privacy</p>
      <p class="opacity-60">From quick questions to deep chats <br>CherriChat keeps it yours</p>
      <UButton size="xl" label="LET'S TALK" class="bg-cherri-gradient text-white uhover w-40" />
    </div>
    <img :src="BannerCharacter" alt="banner-character" class="absolute w-160 top-[-20px] right-[10%]" />
  </div>
</template>

<script setup>
import BannerCharacter from '~/assets/images/banner-character.png'

</script>

<style scoped></style>