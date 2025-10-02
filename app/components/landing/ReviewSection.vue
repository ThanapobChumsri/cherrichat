<template>
  <section id="started" class="bg-black sm:h-screen pt-12 sm:py-0 flex flex-col">
    <UContainer class="flex-1 flex items-center">
      <div class="w-full p-12 bg-[#10101b] border border-yellow-400 shadow-[0_0_40px_#FDE82480] rounded-md space-y-8 sm:space-y-12">
        <div class="grid grid-cols-2 gap-4 sm:flex justify-around sm:animate-slow-bounce">
          <div class="text-center">
            <p class="sm:text-3xl text-[#FDE824] font-bold">1M+</p>
            <p class="text-xs sm:text-base text-[rgb(194,188,163)]">{{ $t('landing.review.balloon_1') }}</p>
          </div>
          <div class="text-center">
            <p class="sm:text-3xl text-[#FDE824] font-bold">50+</p>
            <p class="text-xs sm:text-base text-[#C2BCA3]">{{ $t('landing.review.balloon_2') }}</p>
          </div>
          <div class="text-center">
            <p class="sm:text-3xl text-[#FDE824] font-bold">24/7</p>
            <p class="text-xs sm:text-base text-[#C2BCA3]">{{ $t('landing.review.balloon_3') }}</p>
          </div>
          <div class="text-center">
            <p class="sm:text-3xl text-[#FDE824] font-bold">100%</p>
            <p class="text-xs sm:text-base text-[#C2BCA3]">{{ $t('landing.review.balloon_4') }}</p>
          </div>
        </div>

        <div class="text-center space-y-4">
          <div>
            <p class="text-xl sm:text-3xl font-bold">{{ $t('landing.review.title_1') }}</p>
            <p class="text-xl sm:text-3xl font-bold text-[#FDE824]">{{ $t('landing.review.title_2') }}</p>
          </div>
          <p class="text-sm sm:text-base text-[#C2BCA3] text-balance">{{ $t('landing.review.sub_title') }}</p>
        </div>

        <div class="flex justify-center gap-4">
          <UButton color="warning" class="animate-glow w-[200px] justify-center" size="xl" @click="navigateTo('/')">{{ $t('landing.button') }}</UButton>
          <!-- <UButton color="warning" class="w-[200px] justify-center" variant="subtle" size="xl">เริ่มคุยตอนนี้เลย</UButton> -->
        </div>

        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm sm:text-base">
          <p class="flex items-center gap-2 w-[200px] sm:w-auto"><icon name="simple-line-icons:check" class="text-green-500"/>{{ $t('landing.review.option_1') }}</p>
          <p class="flex items-center gap-2 w-[200px] sm:w-auto"><icon name="simple-line-icons:check" class="text-green-500"/>{{ $t('landing.review.option_2') }}</p>
          <p class="flex items-center gap-2 w-[200px] sm:w-auto"><icon name="simple-line-icons:check" class="text-green-500"/>{{ $t('landing.review.option_3') }}</p>
        </div>
      </div>
    </UContainer>

    <USeparator color="warning" class="pt-20 sm:pt-0"/>

    <UContainer>
      <div class="py-4 sm:py-8 text-xs sm:text-sm text-center">
        <p class="text-[#C2BCA3]">© 2025 Kisra Corporation</p>
      </div>
    </UContainer>
  </section>
</template>

<script setup>

</script>

<style scoped></style>