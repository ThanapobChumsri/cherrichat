<template>
  <div class="min-h-screen relative flex"
      :style="{
        backgroundImage: `url(${coverImage})`,
      }"
  >
    <SideTab />
    <div class="relative flex-1 flex flex-col" :class="{'ml-20': userInfo?.user_id}">
      <Navbar />
      <div class="flex-1 pt-24 sm:pt-32" data-page-transition>
        <slot />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
// Import CSS
import "@/assets/css/main.css";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import coverImage from "~/assets/images/main-bg.png";

const userInfo = useCookie('user-info')

// Set page title and meta

// Enable color mode
const colorMode = useColorMode();
</script>
