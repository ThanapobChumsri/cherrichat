<template>
  <div class="min-h-screen relative flex bg-neutral-50 dark:bg-zinc-900">
    <SideTab />
    <div class="relative flex-1 flex flex-col" :class="{'sm:ml-20': userInfo?.user_id}">
      <Navbar />
      <div data-page-transition>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const userInfo = useCookie('user-info')

// Enable color mode
const colorMode = useColorMode();
</script>
