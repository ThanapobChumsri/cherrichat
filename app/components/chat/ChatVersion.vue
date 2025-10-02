<template>
  <div class="min-w-[200px] max-w-[240px] w-full h-[100vh] border-r border-[#2c2c30] bg-[#212126]">
    <p class="p-4 text-center font-bold">Version Chat</p>
    <div>
      <div class="p-2 m-2 bg-amber-950">
        <p>{{ chatStored?.session_key ?? 'Failed to connection'}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

const chatStored = ref({})

onMounted(() => {
  chatStored.value = JSON.parse(localStorage.getItem('latest-chat'))
})

</script>

<style scoped></style>