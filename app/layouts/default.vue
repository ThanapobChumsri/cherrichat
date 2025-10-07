<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-zinc-900 relative flex flex-col">
    <Navbar />
    <div class="flex-1" data-page-transition>
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup>
// Import CSS
import "@/assets/css/main.css";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

// Set page title and meta

// Enable color mode
const colorMode = useColorMode();
</script>
