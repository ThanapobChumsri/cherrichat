<template>
  <div
    v-for="n in count"
    :key="n"
    class="rounded-xl border border-[#2c2c30] bg-[#212126] overflow-hidden animate-pulse"
  >
    <div class="w-full aspect-square bg-[#2c2c30]">
    </div>
    <div class="p-4">
      <div class="h-4 sm:h-5 bg-[#2c2c30] rounded mb-2 w-3/4"></div>
      <div class="space-y-2">
        <div class="h-3 sm:h-4 bg-[#2c2c30] rounded w-full"></div>
        <div class="h-3 sm:h-4 bg-[#2c2c30] rounded w-2/3"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  count: {
    type: Number,
    default: 12
  }
})
</script>

<style scoped>
</style>