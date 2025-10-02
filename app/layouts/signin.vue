<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-zinc-900 relative flex flex-col py-12 sm:py-24">
    <Navbar />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";

// Enable color mode
const colorMode = useColorMode();
</script>
