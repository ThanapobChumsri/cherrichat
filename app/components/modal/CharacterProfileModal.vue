<template>
  <UModal
    v-model:open="modalOpen"
    :ui="{
      wrapper: 'relative inline-block w-full max-w-2xl text-left align-bottom transition-all transform shadow-xl sm:my-8 sm:align-middle rounded-lg overflow-hidden',
      content: 'bg-gray-900 p-0 w-full max-w-2xl'
    }"
  >
    <template #header>
      <div class="sr-only">Character Profile</div>
    </template>

    <template #body>
      <div class="relative overflow-hidden text-white bg-gray-900">
        <!-- Background Image Header Section -->
        <div class="relative h-48">
          <div
            class="absolute inset-0 bg-center bg-no-repeat bg-cover"
            :style="{ backgroundImage: `url(${character?.original_place || ''})` }"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-orange-400/20 to-gray-900/80"></div>
          </div>

          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute z-50 text-white transition-colors top-4 right-4 hover:text-gray-300"
          >
            <Icon name="i-lucide-x" class="w-6 h-6" />
          </button>

          <!-- Top Badge on background -->
          <div class="absolute top-4 left-4">
            <div class="px-3 py-1 text-sm font-medium text-white rounded-lg bg-orange-600/80">
              Chat background example
            </div>
          </div>
        </div>

        <!-- Profile Section -->
        <div class="relative px-6 -mt-16">
          <!-- Character Profile Image with Badge -->
          <div class="relative flex justify-center mb-4">
            <div class="w-32 h-32 overflow-hidden border-4 rounded-full border-white/20 bg-gray-800">
              <img
                :src="`${runtimeConfig.public.N8N_IMAGE}${character?.url_image}`"
                :alt="character?.name"
                class="object-cover w-full h-full"
              />
            </div>
            <!-- Top 3 Popular Badge -->
            <div class="absolute top-0 right-1/4 px-3 py-1 text-xs font-medium text-white rounded-lg bg-yellow-600/80">
              Top 3 Popular
            </div>
          </div>

          <!-- Character Name and Description -->
          <div class="text-center mb-6">
            <h2 class="mb-2 text-2xl font-bold">{{ character?.name }}</h2>
            <p class="text-sm text-gray-300 px-4">{{ character?.backstory }}</p>
          </div>
        </div>

        <!-- Age Warning Section -->
        <div class="px-6 mb-4">
          <div class="flex items-center p-3 text-white rounded-lg bg-orange-600/80">
            <Icon name="i-lucide-alert-triangle" class="w-5 h-5 mr-2" />
            <span class="text-sm">บทสนทนาอาจมีเนื้อหาไม่เหมาะสมสำหรับผู้ที่มี อายุต่ำกว่า 18 ปี</span>
          </div>
        </div>

        <!-- Tabs Section -->
        <div class="px-6 mb-4">
          <div class="p-1 rounded-lg bg-gray-800/50">
            <div class="flex">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                @click="activeTab = tab.key"
                :class="[
                  'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors',
                  activeTab === tab.key
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white'
                ]"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="px-6 mb-6">
          <div class="bg-gray-800/50 rounded-lg p-6 min-h-[300px] max-h-[300px] overflow-y-auto">
          <!-- Story Tab -->
          <div v-if="activeTab === 'story'" class="space-y-4">
            <!-- MBTI -->
            <div>
              <h3 class="mb-2 text-lg font-semibold">MBTI</h3>
              <p class="text-gray-300">{{ character?.mbti || 'INFJ' }}</p>
            </div>

            <!-- Interests -->
            <div>
              <h3 class="mb-2 text-lg font-semibold">Interests</h3>
              <p class="text-sm text-gray-300">{{ character?.interests || 'Kisra AI เกมเป็นกิจวัตรหญิงสาวไทยผู้สร้าง AI เพื่อปกป้องผู้คน เธอชิงชอบอยู่ตามลำพัง กับร่างใดของริคของตนเอง' }}</p>
            </div>

            <!-- Dislikes -->
            <div>
              <h3 class="mb-2 text-lg font-semibold">Dislikes</h3>
              <p class="text-sm text-gray-300">{{ character?.dislikes || 'Kisra AI เกมไม่กินกับริคอยจองไทยผู้สร้าง AI เพื่อปกป้องผู้คน เธอชิงชอบอยู่ตามลำพัง กับร่างใดของริคของตนเองโกฏิก' }}</p>
            </div>

            <!-- Hobbies -->
            <div>
              <h3 class="mb-2 text-lg font-semibold">Hobbies</h3>
              <p class="text-sm text-gray-300">{{ character?.hobbies || 'Kisra AI เกมเป็นกิจวัตรหญิงสาวไทยผู้สร้าง AI เพื่อปกป้องผู้คน เธอชิงชอบอยู่ตามลำพัง กับร่างใดของริคของตนเองโกฏิก' }}</p>
            </div>

            <!-- Skills -->
            <div>
              <h3 class="mb-2 text-lg font-semibold">Skills</h3>
              <p class="text-sm text-gray-300">{{ character?.skills || 'Kisra AI เกมเป็นกิจวัตรหญิงสาวไทยผู้สร้าง AI เพื่อปกป้องผู้คน เธอชิงชอบอยู่ตามลำพัง เคลื่อนไหวได้ย่างในกฎษฎีร้านอาหารบทสำหรับ' }}</p>
            </div>

            <!-- Memories -->
            <div>
              <h3 class="mb-2 text-lg font-semibold">Memories</h3>
              <p class="text-sm text-gray-300">{{ character?.memories || 'Kisra AI เกมเป็นกิจวัตรหญิงสาวไทยผู้สร้าง AI เพื่อปกป้องผู้คน เธอชิงชอบอยู่ตามลำพัง เคลื่อนไหวล่ำใย่ำค่าซาม่าบทสำหรับมากนักแสดงเคลื่อนไหว' }}</p>
            </div>

            <!-- Relationship -->
            <div>
              <h3 class="mb-4 text-lg font-semibold">Relationship</h3>
              <div class="space-y-3">
                <!-- Level -->
                <div class="flex items-center justify-between">
                  <span class="text-gray-300">Level</span>
                  <span class="px-2 py-1 text-xs text-white bg-yellow-600 rounded">0/5</span>
                </div>

                <!-- Relationship Stats -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-300">Intimacy</span>
                    <span class="text-sm text-yellow-400">2/20</span>
                  </div>
                  <div class="w-full h-2 bg-gray-700 rounded-full">
                    <div class="h-2 bg-yellow-400 rounded-full" style="width: 10%"></div>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-300">Trust</span>
                    <span class="text-sm text-yellow-400">2/100</span>
                  </div>
                  <div class="w-full h-2 bg-gray-700 rounded-full">
                    <div class="h-2 bg-yellow-400 rounded-full" style="width: 2%"></div>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-300">Comfort</span>
                    <span class="text-sm text-yellow-400">10/100</span>
                  </div>
                  <div class="w-full h-2 bg-gray-700 rounded-full">
                    <div class="h-2 bg-yellow-400 rounded-full" style="width: 10%"></div>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-300">Attention</span>
                    <span class="text-sm text-yellow-400">20/100</span>
                  </div>
                  <div class="w-full h-2 bg-gray-700 rounded-full">
                    <div class="h-2 bg-yellow-400 rounded-full" style="width: 20%"></div>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-300">Attention</span>
                    <span class="text-sm text-yellow-400">10/100</span>
                  </div>
                  <div class="w-full h-2 bg-gray-700 rounded-full">
                    <div class="h-2 bg-yellow-400 rounded-full" style="width: 10%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Comment Tab -->
          <div v-else-if="activeTab === 'comment'" class="py-12 text-center">
            <p class="text-gray-400">Comments feature coming soon...</p>
          </div>
          </div>
        </div>

        <!-- Footer Section -->
        <div class="px-6 pb-6">
          <div class="flex items-center gap-3">
            <!-- Main Action Button -->
            <button
              @click="startConversation"
              class="flex-1 px-6 py-3 font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
            >
              Start a conversation
            </button>

            <!-- Secondary Action Buttons -->
            <button class="p-3 text-white transition-colors bg-gray-700 rounded-lg hover:bg-gray-600">
              <Icon name="i-lucide-thumbs-up" class="w-5 h-5" />
            </button>
            <button class="p-3 text-white transition-colors bg-gray-700 rounded-lg hover:bg-gray-600">
              <Icon name="i-lucide-share" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { useModal } from '#imports'

const runtimeConfig = useRuntimeConfig()
const { isCharacterProfileModalOpen, onCloseCharacterProfileModal } = useModal()

const modalOpen = computed({
  get: () => isCharacterProfileModalOpen.value,
  set: (value) => {
    if (!value) {
      onCloseCharacterProfileModal()
    }
  }
})

const props = defineProps({
  character: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['startConversation'])

const activeTab = ref('story')

const tabs = [
  { key: 'story', label: 'Story' },
  { key: 'comment', label: 'Comment' }
]

const closeModal = () => {
  onCloseCharacterProfileModal()
}

const startConversation = () => {
  emit('startConversation', props.character)
  closeModal()
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>