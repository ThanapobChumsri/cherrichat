<template>
  <div class="rounded-xl border border-[#2c2c30] bg-[#212126] overflow-hidden hover:shadow-xl shadow-[#D00000]/30 group cursor-pointer" @click="openCharacterProfile">
    <div class="w-full aspect-square overflow-hidden">
      <video
        ref="videoRef"
        :src="`${runtimeConfig.public.N8N_VIDEO}${props.data.url_video}`"
        :poster="`${runtimeConfig.public.N8N_IMAGE}${props.data.url_image}`"
        class="object-cover w-full h-full transition-transform duration-300 ease-in-out"
        muted
        loop
        playsinline
        autoplay
        @loadeddata="onMediaReady"
      />
    </div>
    <div class="p-4">
      <p class="text-sm sm:text-base text-white font-extrabold mb-2 group-hover:text-[#D00000] line-clamp-1">{{ props.data.name }}</p>
      <p class="text-xs sm:text-sm text-[#94a3b8] line-clamp-2">{{ props.data.backstory }}</p>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  data: {
    type: Object
  }
})

const emit = defineEmits(['openProfile'])

const isMediaReady = ref(false)

const onMediaReady = () => {
  isMediaReady.value = true
}

const openCharacterProfile = () => {
  emit('openProfile', props.data)
}

const goToChat = () => {
  const route = useRoute()
  const userInfo = JSON.parse(localStorage.getItem('user-info'));

  if (!userInfo) {
    // Check if we're in demo mode
    if (route.path.startsWith('/demo')) {
      navigateTo('/demo/signin')
    } else {
      navigateTo('/signin')
    }
    return
  }

  let setImageURL = props.data.emotions ?
    Object.fromEntries(
      Object.entries(props.data.emotions).map(([key, value]) => [key, `${runtimeConfig.public.N8N_IMAGE}${value}`])
    )
    : null
  ;

  let setVidelURL = props.data.emotions_video ?
    Object.fromEntries(
      Object.entries(props.data.emotions_video).map(([key, value]) => [key, `${runtimeConfig.public.N8N_VIDEO}${value}`])
    )
    : null

  localStorage.setItem('latest-chat', JSON.stringify({
    character_info: props.data,
    user_id: userInfo.user_id,
    character_id: props.data.id,
    session_key: `session_${userInfo.user_id}_${props.data.id}_ver_0`,
    url_image: `${runtimeConfig.public.N8N_IMAGE}${props.data.url_image}`,
    emotions: setImageURL,
    url_video: `${runtimeConfig.public.N8N_VIDEO}${props.data.url_video}`,
    emotions_video: setVidelURL,
    original_place: props.data.original_place,
    is_user_like: props.data.is_user_like,
  }))

  // Navigate to appropriate chat page based on current mode
  if (route.path.startsWith('/demo')) {
    navigateTo('/demo/chat')
  } else {
    navigateTo('/chat')
  }
}

</script>

<style scoped></style>