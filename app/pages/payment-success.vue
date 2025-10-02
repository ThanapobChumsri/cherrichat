<template>
  <UContainer class="h-screen flex flex-col gap-6 justify-center items-center">
    <Icon name="icon-park-outline:success" class="text-green-700 w-[100px] h-[100px]"/>
    <p class="text-lg sm:text-2xl font-bold">{{ $t('payment.success_page.title') }}</p>
    <p class="text-sm sm:text-base text-[#9898A2] text-center text-balance">{{ $t('payment.success_page.sub_title_1') }} {{ timer }} {{ $t('payment.success_page.sub_title_2') }}</p>
  </UContainer>
</template>

<script setup>
definePageMeta({
  layout: false
})

const timer = ref(5)

onMounted(() => {
  setInterval(() => {
    if (timer.value > 0) {

      timer.value = timer.value - 1
      
      if (timer.value === 0) {
        navigateTo('/')
      }
    }
  }, 1000)
})

</script>

<style scoped></style>