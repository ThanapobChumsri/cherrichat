<template>
  <div class="m-4">
    <div class="flex flex-col gap-4 items-center justify-center h-[112px]">
      <div 
        class="border-2 rounded-full w-12 h-12 flex items-center justify-center relative hover:bg-yellow-500 duration-200 ease-in-out cursor-pointer" 
        @click="clickToggleRecord"
      >
        <span 
          class="absolute inline-flex h-full w-full rounded-full opacity-75" 
          :class="{ 'animate-ping bg-yellow-500': isRecording }" 
        />
        <Icon 
          :name="isRecording ? 'material-symbols:stop-rounded' : sendChatLoad ? 'eos-icons:loading' : 'mdi:microphone-outline'" 
          style="width: 24px; height: 24px;" 
        />
      </div>
      <p class="text-sm text-[#9898A2]">{{ formattedTime }}</p>
    </div>
    <div class="text-end space-x-2 pt-2">
      <UButton icon="fluent:keyboard-16-regular" color="neutral" class="cursor-pointer rounded-full bg-[#3D3D3D] text-white hover:text-black" @click="emit('switchChatMode')"/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useChat } from '#imports'
import { inject } from '#imports';

const route = useRoute()
const { usePushToTalk, usePushToTalkDemo, sendChatLoad } = useChat();
const isDemoMode = computed(() => route.path.startsWith('/demo'))
const sendNewChat = inject('sendNewChat')
const pushChatHistoryUserLoad = inject('pushChatHistoryUserLoad')
const popChatHistory = inject('popChatHistory')

const emit = defineEmits(['switchChatMode'])

const isRecording = ref(false)
const timer = ref(0)
let interval = null

let mediaRecorder = null
let audioChunks = []
let audioContext = null
let analyser = null
let dataArray = null

const formattedTime = computed(() => {
  const minutes = String(Math.floor(timer.value / 60)).padStart(2, '0')
  const seconds = String(timer.value % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
})

const clickToggleRecord = async () => {
  if (sendChatLoad.value) return;

  if (!isRecording.value) {
    const granted = await requestMicrophonePermission();
    if (!granted) {
      return;
    }
    isRecording.value = true;
    timer.value = 0;
    interval = setInterval(() => { timer.value++ }, 1000);
    await startRecording();
  } else {
    isRecording.value = false;
    clearInterval(interval);
    timer.value = 0;
    interval = null;
    stopRecording();
  }
};

async function requestMicrophonePermission() {
  try {
    if (navigator.permissions) {
      const result = await navigator.permissions.query({ name: 'microphone' })
      if (result.state === 'denied') {
        alert('ไม่สามารถเข้าถึงไมโครโฟนได้ โปรดอนุญาตสิทธิ์')
        return false
      }
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach(track => track.stop())
    return true
  } catch (err) {
    console.error('Microphone access denied:', err)
    alert('ไม่สามารถเข้าถึงไมโครโฟนได้')
    return false
  }
}

// --- Recording functions ---
async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

  audioContext = new (window.AudioContext || window.webkitAudioContext)()
  analyser = audioContext.createAnalyser()
  const source = audioContext.createMediaStreamSource(stream)
  source.connect(analyser)
  analyser.fftSize = 256
  const bufferLength = analyser.frequencyBinCount
  dataArray = new Uint8Array(bufferLength)

  mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' })
  audioChunks = []
  mediaRecorder.ondataavailable = e => audioChunks.push(e.data)
  mediaRecorder.onstop = handleRecordingStop
  mediaRecorder.start()
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
    if (audioContext) audioContext.close()
  }
}

async function handleRecordingStop() {
  try {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })

    // voice -> text
    pushChatHistoryUserLoad()
    const userMessage = await (isDemoMode.value ? usePushToTalkDemo : usePushToTalk)(audioBlob)
    popChatHistory()
    // send text to sendNewChat api
    await sendNewChat(userMessage.text)

    // auto play user message sound
    // const audioUrl = URL.createObjectURL(audioBlob)
    // const audio = new Audio(audioUrl)
    // audio.play().catch(err => {
    //   console.warn("Autoplay blocked:", err)
    // })
    // audio.onended = () => {
    //   URL.revokeObjectURL(audioUrl)
    // }
  } catch (err) {
    console.error(err)
  }

}
</script>
