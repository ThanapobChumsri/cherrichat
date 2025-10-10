<template>
  <div class="min-h-screen relative flex flex-col"
      :style="{
        backgroundImage: `url(${coverImage})`,
      }"
  >
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
import coverImage from "~/assets/images/main-bg.png";

// Set page title and meta

// Enable color mode
const colorMode = useColorMode();
</script>
