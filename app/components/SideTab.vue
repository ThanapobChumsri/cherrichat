<template>
  <div class="fixed top-0 bottom-0 left-0 w-20 flex flex-col justify-between bg-[#19191A]" :class="{'hidden': !userInfo?.user_id}">
    <div class="h-full scroll-y-auto pt-4 space-y-3">
      <p class="text-sm text-center opacity-80">ตัวละคร</p>
      <div
        v-for="(session, index) in sessionList"
        :key="index"
        class="w-full px-3"
      >
        <img :src="session.url_image" alt="character-image" class="rounded-full uhover" @click="clickSessionChat(session)" />
      </div>
    </div>
    <div class="w-full aspect-square p-2">
      <div class="flex justify-center items-center w-full h-full rounded-full bg-cherri-gradient uhover" @click="clickResetSession">
        <UIcon name="system-uicons:reset-hard" class="w-10 h-10 bg-white"/>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getSessionChatByUserId } = useChat()

const userInfo = useCookie('user-info');
const sessionList = ref([])

if (userInfo.value) {
  const response = await getSessionChatByUserId(userInfo.value.user_id)
  sessionList.value = response
}

const clickResetSession = async () => {
  console.log('reset session chat')
}

const clickSessionChat = (data) => {
  localStorage.setItem('latest-chat', JSON.stringify(data))
  // navigateTo('/chat')
  window.location.reload()
}

</script>

<style scoped></style>