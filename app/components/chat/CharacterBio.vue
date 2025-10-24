<template>
  <div
    class="max-h-[calc(100vh-16px)] sm:overflow-y-auto relative transition-width duration-300"
    :class="isCollapse ? 'w-[0px]' : 'sm:w-[280px] xl:w-[320px]'"
  >
    <div class="w-full aspect-square px-4 pb-4 flex flex-col gap-4">
      <div
        v-if="!isMediaReady"
        class="w-full xh-full bg-gray-700 animate-pulse"
      />
      <img
        v-if="!props.data.emotions_video"
        :src="currentImage"
        class="w-full h-full object-cover rounded-xl"
        @load="onMediaReady"
      />
      <video
        v-else
        :src="currentVideo"
        class="w-full h-full object-cover rounded-xl"
        muted
        loop
        playsinline
        autoplay
        @loadeddata="onMediaReady"
      />

      <div class="flex justify-around text-xs glass-border py-2 bg-[#212C3B]" style="border-radius: 0.75rem;">
        <div class="flex flex-col items-center gap-2 px-2 cursor-pointer transition-all duration-100 hover:opacity-90 active:scale-90">
          <Icon class="w-4 h-4" name="famicons:person-outline"/>
          <p>{{ $t('character.profile') }}</p>
        </div>
        <div class="flex flex-col items-center gap-2 px-2 cursor-pointer transition-all duration-100 hover:opacity-90 active:scale-90" @click="clickLikeCharacter">
          <Icon class="w-4 h-4" :name="isLike ? 'mdi:like' : 'mdi:like-outline'" />
          <p>{{ $t('character.like') }}</p>
        </div>
        <div class="flex flex-col items-center gap-2 px-2 cursor-pointer transition-all duration-100 hover:opacity-90 active:scale-90">
          <Icon class="w-4 h-4" name="lucide:share" />
          <p>{{ $t('character.share') }}</p>
        </div>
        <div class="flex flex-col items-center gap-2 px-2 cursor-pointer transition-all duration-100 hover:opacity-90 active:scale-90">
          <Icon class="w-4 h-4" name="octicon:report-24" />
          <p>{{ $t('character.report') }}</p>
        </div>
      </div>

      <!-- <div class="space-y-2 mt-2"> -->
        <BioCollapse :label="$t('location.appearance')">
          <div
            v-for="[key, value] in Object.entries(data?.appearance || {})"
            :key="key"
            class="text-sm mb-2"
          >
            <p class="text-[#9898A2]">{{ $t(`location.${key}`) }}</p>
            <span>{{ value }}</span>
          </div>
        </BioCollapse>

        <div v-for="(value, key) in data?.knowledge_base" :key="key">
          <BioCollapse
            :label="$t(`location.${key}`)"
            class="text-sm mb-2"
          >
            <div v-if="Array.isArray(value)">
              {{ value?.join(", ") }}
            </div>
            <div v-else>
              <div
                v-for="(subValue, objectKey) in value"
                :key="objectKey"
                class="text-sm mb-2"
              >
                <p class="text-[#9898A2]">{{ $t(`location.${objectKey}`) }}</p>
                <span>{{
                  typeof subValue == "object" ? subValue?.join(", ") : subValue
                }}</span>
              </div>
            </div>
          </BioCollapse>
        </div>

        <div v-for="(value, key) in data?.personality" :key="key">
          <div v-if="key !== 'age' && key !== 'ethnicity'">
            <BioCollapse
              :label="$t(`location.${key}`)"
              class="text-sm mb-2"
            >
              <div v-if="typeof value == 'string' || typeof value == 'number'">
                {{ value }}
              </div>
              <div v-else-if="Array.isArray(value)">
                {{ value?.join(", ") }}
              </div>
              <div v-else>
                <div
                  v-for="(subValue, objectKey) in value"
                  :key="objectKey"
                  class="text-sm mb-2"
                >
                  <p class="text-[#9898A2]">
                    {{ $t(`location.${objectKey}`) }}
                  </p>
                  <span>{{
                    typeof subValue == "object"
                      ? subValue?.join(", ")
                      : subValue
                  }}</span>
                </div>
              </div>
            </BioCollapse>
          </div>
        </div>

        <BioCollapse :label="$t('location.traits')">
          <span class="text-sm mb-2">{{ data?.traits?.join(", ") || "-" }}</span>
        </BioCollapse>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
import BioCollapse from "./BioCollapse.vue";

const props = defineProps({
  data: {
    type: Object,
  },
  emotion: {
    type: String,
  },
  relationshipId: {
    type: String,
  },
  soundId: {
    type: String,
  },
  isCollapse: {
    type: Boolean,
    default: false,
  },
});

const { sendLikeCharacter } = useCharacter();

const latestChat = ref({});
const isMediaReady = ref(false)
const isLike = ref(false)

const currentImage = computed(() => {
  if (!latestChat.value || !props.emotion || !latestChat.value.emotions)
    return latestChat.value.url_image;

  return latestChat.value.emotions[props.emotion];
});
const currentVideo = computed(() => {
  if (!latestChat.value || !props.emotion || !latestChat.value.emotions_video)
    return latestChat.value.url_video;

  return latestChat.value.emotions_video[props.emotion]
})

onMounted(() => {
  refreshLocalStorage();
});

onMounted(() => {
  watch(
    () => props.data,
    (newValue) => {
      refreshLocalStorage();
    }
  );
});

const refreshLocalStorage = () => {
  const latest_chat = localStorage.getItem("latest-chat");

  if (!latest_chat) {
    navigateTo("/");
  }

  latestChat.value = JSON.parse(latest_chat);
  isLike.value = (latestChat.value.is_user_like)
};

const onMediaReady = () => {
  isMediaReady.value = true
}

const clickLikeCharacter = async () => {
  isLike.value = !isLike.value
  localStorage.setItem("latest-chat", JSON.stringify({
    ...latestChat.value,
    is_user_like: isLike.value
  }))
  await sendLikeCharacter({user_id: latestChat.value.user_id, character_id: latestChat.value.character_id})
}

</script>

<style scoped>
</style>
