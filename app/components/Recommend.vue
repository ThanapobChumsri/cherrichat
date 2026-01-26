<template>
  <div class="recommend-container">
    <!-- Desktop Layout -->
    <div
      class="hidden lg:block bg-gradient-to-r from-dark-cherri-2 from-[10%] via-cherri-2 via-[70%] to-dark-cherri-2 to-[100%] rounded-[16px] p-6 relative overflow-hidden"
    >
      <!-- Header -->
      <div class="flex items-center justify-center gap-2 mb-6">
        <h2 class="text-xl font-bold text-white">Recommend by</h2>
        <div class="flex items-center gap-1">
          <img src="~/assets/images/logo.png" class="max-h-[30px]" />
        </div>
      </div>

      <!-- Characters Container -->
      <div class="relative">
        <div class="flex items-end justify-center gap-4">
          <!-- Side Characters (smaller) -->
          <div
            v-for="(char, index) in getSideCharacters('left', sideCount)"
            :key="`left-${index}`"
            class="character-card-small opacity-60 hover:opacity-80 transition-opacity cursor-pointer"
            @click="goToCharacter(char)"
          >
            <img
              :src="
                imgSrc(char?.url_image)
              "
              :alt="char?.name"
              class="object-cover rounded-2xl w-44 h-44 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44"
            />
          </div>

          <!-- Center Character (larger) -->
          <div
            class="relative inline-block rounded-3xl p-[1px] bg-[linear-gradient(180deg,#FFE58E_0%,#E5E3D0_97.95%)]"
            @click="openCharacterProfile(currentCharacter)"
          >
            <img
              :src="
                imgSrc(currentCharacter?.url_image)
              "
              :alt="currentCharacter?.name"
              class="w-60 h-60 object-cover rounded-3xl shadow-2xl cursor-pointer hover:scale-105 transition-transform bg-black"
            />
          </div>

          <!-- Side Characters (smaller) -->
          <div
            v-for="(char, index) in getSideCharacters('right', sideCount)"
            :key="`right-${index}`"
            class="character-card-small opacity-60 hover:opacity-80 transition-opacity cursor-pointer"
            @click="goToCharacter(char)"
          >
            <img
              :src="
                imgSrc(char?.url_image)
              "
              :alt="char?.name"
              class="object-cover rounded-2xl w-44 h-44 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44"
            />
          </div>
        </div>
      </div>

      <!-- Character Name -->
      <div class="mt-6 flex justify-center">
        <div class="grid w-100 grid-cols-[48px_1fr_48px] items-center gap-2">
          <button
            @click="prevSlide"
            class="w-12 h-12 bg-[#FFFFFF80] rounded-2xl flex items-center justify-center text-gray-700 hover:bg-[#FFFFFFA0] transition"
          >
            <Icon name="mdi:chevron-left" class="text-white text-3xl" />
          </button>

          <h3 class="text-white text-2xl font-bold text-center truncate">
            {{ currentCharacter?.name }}
          </h3>

          <button
            @click="nextSlide"
            class="w-12 h-12 bg-[#FFFFFF80] rounded-2xl flex items-center justify-center text-gray-700 hover:bg-[#FFFFFFA0] transition"
          >
            <Icon name="mdi:chevron-right" class="text-white text-3xl" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Layout -->
    <div
      class="lg:hidden bg-gradient-to-r from-dark-cherri-2 from-[10%] via-cherri-2 via-[70%] to-dark-cherri-2 to-[100%] rounded-[16px] p-4 relative overflow-hidden h-[400px]"
    >
      <!-- Header -->
      <div class="flex items-center justify-center gap-2 mb-4">
        <h2 class="text-base font-bold text-white">Recommend by</h2>
        <div class="flex items-center gap-1">
          <img src="~/assets/images/logo.png" class="max-h-[30px]" />
        </div>
      </div>

      <!-- Characters Container -->
      <div class="py-10">
        <div class="relative flex items-center justify-center h-[190px]">
          <!-- Left (half visible) -->
          <div
            class="absolute left-0 -bottom-20 -translate-y-1/2 -translate-x-1/2 z-0 cursor-pointer"
            @click="goToCharacter(getSideCharacters('left', 1)[0])"
          >
            <img
              :src="
                imgSrc(getSideCharacters('left', 1)[0]?.url_image)
              "
              :alt="getSideCharacters('left', 1)[0]?.name"
              class="h-40 sm:mr-0 mr-20 object-cover rounded-2xl brightness-75 hover:brightness-90 transition-all"
            />
          </div>

          <!-- Center -->
          <div
            class="relative z-10 inline-block rounded-3xl p-[1px] bg-[linear-gradient(180deg,#FFE58E_0%,#E5E3D0_97.95%)]"
            @click="openCharacterProfile(currentCharacter)"
          >
            <img
              :src="
                imgSrc(currentCharacter?.url_image)
              "
              :alt="currentCharacter?.name"
              class="w-56 h-56 object-cover rounded-3xl shadow-2xl"
            />
          </div>

          <!-- Right (half visible) -->
          <div
            class="absolute right-0 -bottom-20 -translate-y-1/2 translate-x-1/2 z-0 cursor-pointer"
            @click="goToCharacter(getSideCharacters('right', 1)[0])"
          >
            <img
              :src="
                imgSrc(getSideCharacters('right', 1)[0]?.url_image)
              "
              :alt="getSideCharacters('right', 1)[0]?.name"
              class="h-40 sm:ml-0 ml-20 object-cover rounded-2xl brightness-75 hover:brightness-90 transition-all"
            />
          </div>
        </div>
      </div>

      <!-- Navigation Arrows + Character Name -->
      <div class="relative flex items-center justify-center mt-4">
        <!-- Left Arrow -->
        <button
          @click="prevSlide"
          class="absolute left-2 w-10 h-10 bg-[#FFFFFF80] rounded-2xl flex items-center justify-center text-gray-700 hover:bg-[#FFFFFFA0] transition"
        >
          <Icon name="mdi:chevron-left" class="text-white text-2xl" />
        </button>

        <!-- Character Name -->
        <h3 class="text-white text-lg font-bold">
          {{ currentCharacter?.name }}
        </h3>

        <!-- Right Arrow -->
        <button
          @click="nextSlide"
          class="absolute right-2 w-10 h-10 bg-[#FFFFFF80] rounded-2xl flex items-center justify-center text-gray-700 hover:bg-[#FFFFFFA0] transition"
        >
          <Icon name="mdi:chevron-right" class="text-white text-2xl" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWindowSize } from "@vueuse/core";
import { useRecommend } from "#imports";
import defaultUserAvatar from "@/assets/images/default_user.png";

const runtimeConfig = useRuntimeConfig();
const { width } = useWindowSize();
const { getRecommend } = useRecommend();
const sideCount = computed(() => (width.value >= 1280 ? 3 : 2)); // xl = 1280
const characters = ref([]);
const emit = defineEmits(["openProfile"]);
onMounted(async () => {
  let res = await getRecommend();
  characters.value = res;
});

const currentIndex = ref(0);

const currentCharacter = computed(() => characters.value[currentIndex.value]);

const getSideCharacters = (side, count = 2) => {
  const total = characters.value.length;
  const result = [];

  if (side === "left") {
    for (let i = 1; i <= count; i++) {
      const index = (currentIndex.value - i + total) % total;
      result.unshift(characters.value[index]);
    }
  } else {
    for (let i = 1; i <= count; i++) {
      const index = (currentIndex.value + i) % total;
      result.push(characters.value[index]);
    }
  }

  return result;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % characters.value.length;
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + characters.value.length) %
    characters.value.length;
};

const goToCharacter = (character) => {
  // หา index ของตัวละครที่คลิก
  const targetIndex = characters.value.findIndex(
    (char) => char.id === character.id
  );

  if (targetIndex !== -1) {
    currentIndex.value = targetIndex;
  }
};

const openCharacterProfile = (data) => {
  emit("openProfile", data);
};

const imgSrc = (url) =>
  url ? `${runtimeConfig.public.N8N_IMAGE}${url}` : defaultUserAvatar;
</script>

<style scoped>
.recommend-container {
  @apply w-full;
}

.border-gradient {
  border-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-image-slice: 1;
}
</style>
