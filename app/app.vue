<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
      <DefaultLoading />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
import DefaultLoading from './components/loading/DefaultLoading.vue';

const colorMode = useColorMode();
const { locale } = useI18n()

onMounted(() => {
  colorMode.preference = "dark"
  document.documentElement.lang = locale.value === 'th' ? 'th' : 'en'
});

onMounted(() => {
  watch(locale, (newValue) => {
    document.documentElement.lang = newValue === 'th' ? 'th' : 'en'
  })
})

</script>