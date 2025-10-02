<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="visible"
        class="fixed inset-0 bg-black/40 z-[99] flex items-center justify-center"
      >
        <Icon name="eos-icons:loading" style="width: 48px; height: 48px;"  />
        <!-- <slot /> -->
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { useBackdrop } from "@/composables/useBackdrop";

const { visible } = useBackdrop();

</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>