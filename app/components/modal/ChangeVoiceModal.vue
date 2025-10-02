<template>
  <div>
    <UModal 
      :title="$t('voice.character_voice')"
      v-model:open="isSoundModalOpen"
    >
      <UButton color="warning" variant="subtle" class="text-white px-3 py-2 cursor-pointer"><Icon name="ri:speak-ai-line" /> {{ buttonDisplay }}</UButton>

      <template #body>
        <div class="space-y-4 sm:space-y-2 h-[400px] overflow-y-scroll px-2">
          <div 
            v-for="(sound, index) in soundList" :key="index" 
            class="flex items-center justify-between rounded-md p-4 transition  hover:bg-gray-700"
            :class="{'bg-gray-600': props.soundId === sound.id}"
            @click="clickSelectSound(sound.name)"
          >
            <p class="text-sm">{{ sound.name }}</p>
            <div class="flex gap-2">
              <audio :src="sound.src" :ref="el => audioRef[index] = el"/>
              <UButton v-if="indexRef !== index" icon="i-lucide-play" color="neutral" variant="subtle" class="cursor-pointer" @click.stop="clickPlaySound(index)"/>
              <UButton v-else icon="i-lucide-square" color="error" variant="subtle" class="cursor-pointer" @click.stop="clickStopSound"/>
            </div>
          </div>
        </div >
      </template>
    </UModal>
  </div>
</template>

<script setup>
import { useModal } from '#imports';
import { useChat } from '#imports';
import { inject } from '#imports';

const props = defineProps({
  relationshipId: {
    type: String,
  },
  soundId: {
    type: String,
  }
})

const { isSoundModalOpen, onCloseSoundModal } = useModal();
const route = useRoute()
const { getSelectSound, getSelectSoundDemo } = useChat();
const isDemoMode = computed(() => route.path.startsWith('/demo'))
const updateCharacterRelationData = inject('updateCharacterRelationData')

const soundList = ref([])
const audioRef = ref([])
const indexRef = ref(null)

const buttonDisplay = computed(() => {
  return soundList.value.find((e) => e.id === props.soundId)?.name ?? $t('voice.select_voice')
})

onMounted(() => {
  const sound_list = JSON.parse(localStorage.getItem('sound-list'))
  const latest_chat = JSON.parse(localStorage.getItem('latest-chat'))
  const gender = latest_chat.character_info.gender
  
  if (!sound_list || !latest_chat) {
    navigateTo('/')
  }

  soundList.value = sound_list.filter((e) => e.gender === gender || !gender).map((e) => ({
    ...e,
    id: e.id,
    src: `/voice/${e.name}_${e.gender}.wav`
  }))
})

const clickSelectSound = async (name) => {
  const relationData = await (isDemoMode.value ? getSelectSoundDemo : getSelectSound)(name, props.relationshipId)
  updateCharacterRelationData({ sound_id: relationData.sound_id })
  onCloseSoundModal();
}

const clickPlaySound = (index) => {
  const audio = audioRef.value[index]
  if (!audio) return
  indexRef.value = index

  audioRef.value.forEach((a, i) => {
    if (i !== index && !a.paused) {
      a.pause()
      a.currentTime = 0
    }
  })

  audio.currentTime = 0
  audio.play()

  audio.onended = () => {
    indexRef.value = null
  }
}

const clickStopSound = () => {
  if (indexRef.value !== null) {
    const audio = audioRef.value[indexRef.value]
    if (audio && !audio.paused) {
      audio.pause()
      audio.currentTime = 0
    }
  }
  indexRef.value = null
}

</script>

<style scoped></style>