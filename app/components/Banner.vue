<template>
  <div class="relative overflow-hidden mb-4 sm:mb-12 mx-4 sm:mx-16 bg-gradient-to-r from-dark-cherri-2 from-[10%] via-cherri-2 via-[70%] to-dark-cherri-2 to-[100%] rounded-[16px]">
    <div class="relative z-[1] px-6 sm:px-16 py-6 sm:py-8 space-y-4 sm:space-y-6">
      <p class="text-[20px] sm:text-[36px] sm:leading-12 font-bold">{{ $t('tagline.text_1') }} <br>{{ $t('tagline.text_2') }}</p>
      <p class="text-[14px] sm:text-base opacity-60">{{ $t('tagline.text_3') }}</p>
      <UButton size="xl" :label="$t('lets_talk').toUpperCase()" class="bg-cherri-gradient text-white uhover w-40" />
    </div>
    <img :src="BannerCharacter" alt="banner-character" class="absolute w-160 top-[-20px] right-[-80px] md:right-[-40px] xl:right-[40px] opacity-40 md:opacity-100" />
  </div>
</template>

<script setup>
import BannerCharacter from '@/assets/images/banner-character.png'

</script>

<style scoped></style>