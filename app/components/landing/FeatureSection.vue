<template>
  <section id="feature" class="bg-black sm:h-screen py-12 sm:py-0 flex items-center">
    <UContainer class="space-y-8 sm:space-y-20">
      <div class="space-y-4">
        <p class="text-center text-xl sm:text-3xl font-bold text-[#FDE824]">{{ $t('landing.feature.title_1') }} <span class="text-white">{{ $t('landing.feature.title_2') }}</span></p>
        <p class="text-sm sm:text-base text-balance text-center text-[#C2BCA3]">{{ $t('landing.feature.sub_title') }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-8">
        <div
          v-for="(content, _i) in featureList"
          :key="_i"
          class="flex items-center gap-4 sm:block sm:space-y-4 p-4 sm:p-8 bg-[#10101b] border border-yellow-400 rounded-lg group hover:bg-gradient-to-br hover:from-[#10101b] hover:to-[#27272B] transition"
        >
          <UButton :icon="content.icon" size="xl" class="text-white bg-gradient-to-br from-yellow-400 to-amber-700 group-hover:scale-110 transition" />
          <div class="space-y-4">
            <p class="text-base sm:text-lg group-hover:text-[#FDE824] transition">{{ content.title }}</p>
            <p class="text-sm sm:text-base text-[#C2BCA3]">{{ content.description }}</p>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>

const featureList = ref([
  {
    title: $t('landing.feature.option_1.title'),
    description: $t('landing.feature.option_1.description'),
    icon: "mynaui:message",
  },
    {
    title: $t('landing.feature.option_2.title'),
    description: $t('landing.feature.option_2.description'),
    icon: "tabler:heart",
  },
    {
    title: $t('landing.feature.option_3.title'),
    description: $t('landing.feature.option_3.description'),
    icon: "tabler:book",
  },
    {
    title: $t('landing.feature.option_4.title'),
    description: $t('landing.feature.option_4.description'),
    icon: "mdi:paint-outline",
  },
    {
    title: $t('landing.feature.option_5.title'),
    description: $t('landing.feature.option_5.description'),
    icon: "humbleicons:location",
  },
    {
    title: $t('landing.feature.option_6.title'),
    description: $t('landing.feature.option_6.description'),
    icon: "mdi:microphone-outline",
  },
])

</script>

<style scoped></style>