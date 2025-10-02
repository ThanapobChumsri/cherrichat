<template>
  <div class="flex bg-gradient-to-r from-[#FDE824] to-[#FDE824] rounded-md font-bold text-black">
    <p class="py-[6px] px-[10px] transition-colors duration-300 ease-in-out cursor-pointer" :class="{ 'bg-black text-white': locale === 'en' }" @click="onSwitchLang('th')">TH</p>
    <p class="py-[6px] px-[10px] transition-colors duration-300 ease-in-out cursor-pointer" :class="{ 'bg-black text-white': locale === 'th' }" @click="onSwitchLang('en')">EN</p>
  </div>
</template>

<script setup>

const { locale, setLocale } = useI18n();

const onSwitchLang = (lang) => {
  setLocale(lang)
}

</script>

<style scoped></style>