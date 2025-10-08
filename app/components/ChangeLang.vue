<template>
  <div class="flex liquid-glass font-bold text-black">
    <p class="py-[6px] px-[10px] text-sm transition-colors duration-300 ease-in-out cursor-pointer" :class="{ 'text-[#9898A2]': locale === 'en' }" @click="onSwitchLang('th')">TH</p>
    <p class="py-[6px] px-[10px] text-sm transition-colors duration-300 ease-in-out cursor-pointer" :class="{ 'text-[#9898A2]': locale === 'th' }" @click="onSwitchLang('en')">EN</p>
  </div>
</template>

<script setup>

const { locale, setLocale } = useI18n();

const onSwitchLang = (lang) => {
  setLocale(lang)
}

</script>

<style scoped></style>