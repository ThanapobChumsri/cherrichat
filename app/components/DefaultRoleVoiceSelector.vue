<template>
  <div class="voice-selector space-y-2">
    <div
      v-for="(voice, index) in voiceOptions"
      :key="voice.id"
      class="voice-option"
      @click="selectVoice(voice.id)"
    >
      <div
        class="voice-option-container"
        :class="{
          selected: modelValue === voice.id,
          disabled: disabled,
        }"
      >
        <div class="voice-info">
          <span class="voice-name">{{ voice.name }}</span>
        </div>
        <div class="voice-controls">
          <audio :src="voice.src" :ref="el => audioRef[index] = el"/>
          <UButton
            v-if="playingIndex !== index"
            icon="i-lucide-play"
            color="neutral"
            variant="subtle"
            size="sm"
            class="cursor-pointer"
            @click.stop="playVoice(index)"
          />
          <UButton
            v-else
            icon="i-lucide-square"
            color="error"
            variant="subtle"
            size="sm"
            class="cursor-pointer"
            @click.stop="stopVoice"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  gender: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const voiceOptions = ref([]);
const audioRef = ref([]);
const playingIndex = ref(null);

onMounted(() => {
  loadVoiceOptions();
});

const loadVoiceOptions = () => {
  const soundList = JSON.parse(localStorage.getItem('sound-list') || '[]');

  voiceOptions.value = soundList
    .filter((sound) => !props.gender || sound.gender === props.gender || !sound.gender)
    .map((sound) => ({
      id: sound.id,
      name: sound.name,
      gender: sound.gender,
      src: `/voice/${sound.name}_${sound.gender}.wav`
    }));
};

const selectVoice = (voiceId) => {
  if (props.disabled) return;
  emit('update:modelValue', voiceId);

  // Auto-play the selected voice
  const selectedIndex = voiceOptions.value.findIndex(voice => voice.id === voiceId);
  if (selectedIndex !== -1) {
    playVoice(selectedIndex);
  }
};

const playVoice = (index) => {
  const audio = audioRef.value[index];
  if (!audio) return;

  // Stop all other audio
  audioRef.value.forEach((a, i) => {
    if (i !== index && a && !a.paused) {
      a.pause();
      a.currentTime = 0;
    }
  });

  playingIndex.value = index;
  audio.currentTime = 0;
  audio.play();

  audio.onended = () => {
    playingIndex.value = null;
  };
};

const stopVoice = () => {
  if (playingIndex.value !== null) {
    const audio = audioRef.value[playingIndex.value];
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
  playingIndex.value = null;
};

// Watch for gender changes
watch(() => props.gender, () => {
  loadVoiceOptions();
});
</script>

<style scoped>
.voice-selector {
  width: 100%;
}

.voice-option {
  position: relative;
  cursor: pointer;
}

.voice-option-container {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  padding: 12px 16px !important;
  border-radius: 8px !important;
  border: 1px solid #e5e7eb !important;
  background-color: white !important;
  color: #374151 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  transition: all 0.2s ease !important;
  user-select: none !important;
  margin: 0 !important;
  cursor: pointer !important;
}

.voice-option-container.selected {
  background: linear-gradient(271.93deg, #691a20 -18.01%, #d00000 96.17%) !important;
  color: white !important;
  border: 1.5px solid #691a20 !important;
}

.voice-option-container.disabled {
  opacity: 0.5 !important;
  cursor: not-allowed !important;
}

.voice-option:hover .voice-option-container:not(.disabled) {
  border-color: #d00000 !important;
}

.voice-info {
  flex: 1;
}

.voice-name {
  font-weight: 500;
}

.voice-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .voice-option-container {
    background-color: #374151 !important;
    color: #f9fafb !important;
    border-color: #4b5563 !important;
  }

  .voice-option-container.selected {
    background: linear-gradient(271.93deg, #691a20 -18.01%, #d00000 96.17%) !important;
    color: white !important;
    border: 1.5px solid #691a20 !important;
  }
}
</style>