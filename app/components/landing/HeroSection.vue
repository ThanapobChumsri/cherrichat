<template>
  <section id="main" class="relative sm:h-screen py-8 sm:py-0 bg-black overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-1/2
                w-3/5 h-2/5 rounded-full 
                bg-[radial-gradient(circle,rgba(253,232,36,0.8)_0%,rgba(253,232,36,0.4)_40%,rgba(253,232,36,0)_70%)] 
                blur-[280px]
                pointer-events-none">
    </div>

    <UContainer class="h-full sm:flex items-center justify-center gap-20 space-y-4">
      <div class="sm:w-1/2 space-y-8">
        <UBadge variant="subtle" color="warning" icon="ph:star-four" class="p-2">AI Character Technology</UBadge>
        <div class="space-y-2">
          <p class="text-3xl sm:text-5xl text-[#FDE824] font-bold">{{ $t('landing.hero.title_1') }}</p>
          <p class="text-3xl sm:text-5xl">{{ $t('landing.hero.title_2') }}</p>
        </div>
          <p>{{ $t('landing.hero.description') }}</p>
        <div class="flex gap-4">
          <UButton color="warning" class="animate-glow w-full justify-center" size="xl" @click="navigateTo('/')">{{ $t('landing.button') }}</UButton>
          <!-- <UButton color="warning" class="w-full justify-center" variant="subtle" size="xl">เริ่มคุยตอนนี้เลย</UButton> -->
        </div>
      </div>

      <div class="sm:w-1/2 p-8 sm:p-0">
        <div class="animate-slow-bounce relative p-8 bg-[#27272B] rounded-3xl">
          <div class="animate-glow w-16 h-16 rounded-full bg-[#FDE824] absolute top-[-32px] right-[-32px]" />
          <div class="animate-pulse w-8 h-8 rounded-full bg-[#FDE824] absolute bottom-[-28px] left-[-32px]" />
          <img :src="LandingCoverImage" class="rounded-xl" alt="landing_cover_image"/>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import LandingCoverImage from '~/assets/images/landing/landing_cover.jpeg'

</script>

<style scoped></style>