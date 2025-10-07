<template>
  <Navbar />
  <div class="min-h-screen bg-neutral-50 dark:bg-zinc-900 relative" data-page-transition>
    <slot />
  </div>
</template>

<script setup>

// Enable color mode
const colorMode = useColorMode();
</script>
