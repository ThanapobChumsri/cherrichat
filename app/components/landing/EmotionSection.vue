<template>
  <section id="reaction" class="bg-black sm:h-screen py-12 sm:py-0 flex items-center">
    <UContainer class="space-y-8 sm:space-y-20">
      <div class="space-y-4">
        <p class="text-center text-xl sm:text-3xl font-bold text-[#FDE824]">{{ $t('landing.emotion.title_1') }}<span class="text-white">{{ $t('landing.emotion.title_2') }}</span></p>
        <p class="text-sm sm:text-base text-balance text-center text-[#C2BCA3]">{{ $t('landing.emotion.sub_title') }}</p>
      </div>

      <div class="sm:flex gap-8 space-y-8">
        <div class="relative h-70 sm:h-auto sm:w-1/2 rounded-md overflow-hidden border border-yellow-400">
          <transition name="fade" mode="out-in">
            <div 
              :key="placeIndex"
              class="w-full h-full bg-cover bg-center" 
              :style="{ backgroundImage: `url(${placeImageList[placeIndex]})` }"
            >
            </div>
          </transition>
          <transition name="slide" mode="out-in">
            <img :key="emotionIndex" :src="emotionImageList[emotionIndex]" alt="character-emotion" class="absolute w-3/5 bottom-0 left-1/2 -translate-x-1/2"/>
          </transition>
        </div>

        <div class="sm:w-1/2 space-y-4">
          <p class="text-lg font-bold">{{ $t('landing.emotion.emotion.title') }}</p>
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="(content, _i) in emotionList" :key="_i" 
              class="flex px-4 py-2 bg-[#27272B] border border-[#3F3F47] rounded-md transition duration-500"
              :class="{'shadow-[0_0_20px_#FDE82480] border-yellow-400 text-[#FDE824]': _i === emotionIndex}"
            >
              <p>{{ content.title }}</p>
            </div>
          </div>
          <p class="text-lg font-bold">{{ $t('landing.emotion.place.title') }}</p>
          <div class="grid grid-cols-2 sm:grid-cols-1 gap-2">
            <div 
              v-for="(content, _i) in placeList" 
              :key="_i" 
              class="flex px-4 py-2 bg-[#27272B] border border-[#3F3F47] rounded-md transition duration-500"
              :class="{'shadow-[0_0_20px_#FDE82480] border-yellow-400 text-[#FDE824]': _i === placeIndex}"
            >
              <p>{{ content.title }}</p>
            </div>
          </div>
          <UBadge variant="subtle" color="warning" icon="iconoir:light-bulb" class="p-2 mt-4">{{ $t('landing.emotion.badge') }}</UBadge>
        </div>
      </div>

    </UContainer>
  </section>
</template>

<script setup>
import parkImage from '~/assets/images/landing/park.jpeg'
import cafeImage from '~/assets/images/landing/cafe.jpeg'
import beachImage from '~/assets/images/landing/beach.jpeg'
import libraryImage from '~/assets/images/landing/library.jpeg'
import normalImage from '~/assets/images/landing/c-normal.png'
import happylImage from '~/assets/images/landing/c-happy.png'
import angryImage from '~/assets/images/landing/c-angry.png'
import sadImage from '~/assets/images/landing/c-sad.png'

const emotionIndex = ref(0)
const placeIndex = ref(1)

const emotionImageList = [normalImage, happylImage, angryImage, sadImage]
const placeImageList = [parkImage, cafeImage, beachImage, libraryImage]

const emotionList = ref([
  {
    title: $t('landing.emotion.emotion.option_1'),
    icon: "",
  },
  {
    title: $t('landing.emotion.emotion.option_2'),
    icon: "",
  },
  {
    title: $t('landing.emotion.emotion.option_3'),
    icon: "",
  },
  {
    title: $t('landing.emotion.emotion.option_4'),
    icon: "",
  },
])
const placeList = ref([
  {
    title: $t('landing.emotion.place.option_1'),
    icon: "",
  },
  {
    title: $t('landing.emotion.place.option_2'),
    icon: "",
  },
  {
    title: $t('landing.emotion.place.option_3'),
    icon: "",
  },
  {
    title: $t('landing.emotion.place.option_4'),
    icon: "",
  },
])

let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    emotionIndex.value = Math.floor(Math.random() * 4)
    placeIndex.value = Math.floor(Math.random() * 4)
  }, 3000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

</script>

<style scoped>
/* transition tag name=fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* transition tag name=slide */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>