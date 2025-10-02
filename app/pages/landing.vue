<template>
  <div class="relative">
    <!-- <header class="fixed top-0 w-full bg-black/50 backdrop-blur-md z-50">
      <UContainer>
        <div class="h-[64px] relative flex justify-between items-center text-sm">
          <div @click="navigateTo('/')">
            <span class="text-base sm:text-xl font-bold bg-gradient-to-r from-[#FDE824] to-[#FDE824] bg-clip-text text-transparent cursor-pointer">{{ $t('app_name') }}</span>
          </div>
        </div>
      </UContainer>
    </header> -->

    <Navbar />
    <HeroSection />
    <FeatureSection />
    <EmotionSection />
    <ReviewSection />

  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';
import HeroSection from '~/components/landing/HeroSection.vue';
import FeatureSection from '~/components/landing/FeatureSection.vue';
import EmotionSection from '~/components/landing/EmotionSection.vue';
import ReviewSection from '~/components/landing/ReviewSection.vue';

definePageMeta({
  layout: false
})

</script>

<style scoped></style>