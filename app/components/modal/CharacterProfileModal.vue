<template>
  <UModal
    v-model:open="modalOpen"
    :ui="{
      content:
        'fixed bg-[#00000033] backdrop-blur-[50px] divide-y divide-default flex flex-col focus:outline-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-2xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] rounded-lg shadow-lg ring ring-default overflow-hidden p-0',
    }"
  >
    <template #content>
      <div class="relative overflow-y-auto text-white">
        <!-- Header Section with Background and Profile -->
        <div class="mb-5">
          <div class="relative h-40 px-6">
            <!-- Background Image -->
            <div
              class="absolute inset-0 bg-center bg-no-repeat bg-cover"
              :style="{
                backgroundImage: `url(${runtimeConfig.public.N8N_IMAGE}${character?.original_place_img})`,
              }"
            ></div>

            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute z-50 text-black transition-colors top-4 right-4 hover:text-gray-600"
            >
              <Icon name="i-lucide-x" class="w-6 h-6" />
            </button>

            <!-- Top Badge on background -->
            <div class="absolute top-4 left-4">
              <div
                class="px-3 py-1 text-sm font-medium text-white rounded-4xl bg-[#00000054]"
              >
                Chat background example
              </div>
            </div>

            <!-- Character Profile Image - absolute center คาบเกี่ยว -->
            <div
              class="absolute bottom-0 transform -translate-x-1/2 translate-y-1/3 left-1/2"
            >
              <div
                class="w-32 h-32 overflow-hidden bg-gray-800 rounded-full border-6 border-[#303030]"
              >
                <img
                  :src="`${runtimeConfig.public.N8N_IMAGE}${character?.url_image}`"
                  :alt="character?.name"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end w-full pr-2 mt-2">
            <div
              class="px-3 py-1 text-xs font-medium text-[#FFBA08] rounded-3xl w-fit bg-[#D0870033]"
            >
              Top 3 Popular
            </div>
          </div>
        </div>

        <!-- Profile Content Section -->
        <div class="px-6 mt-5">
          <!-- Character Name and Description -->
          <div class="mb-6 text-center">
            <h2 class="mb-2 text-2xl font-bold">{{ character?.name }}</h2>
            <p class="px-4 text-sm text-[#7D7D7D] line-clamp-1">
              {{ character?.backstory }}
            </p>
          </div>
        </div>
        <!-- Age Warning Section -->
        <div class="px-6 mb-4">
          <div
            class="flex items-center p-3 text-[#FF782A] rounded-lg bg-[#FF77233B]"
          >
            <Icon name="i-lucide-alert-triangle" class="w-5 h-5 mr-2" />
            <span class="text-base font-medium"
              >บทสนทนาอาจมีเนื้อหาไม่เหมาะสมสำหรับผู้ที่มี อายุต่ำกว่า 18
              ปี</span
            >
          </div>
        </div>

        <div class="mx-6 py-4 mb-5 bg-[#00000033] rounded-3xl glass-border">
          <!-- Tabs Section -->
          <div class="px-6 mb-4">
            <div class="p-2 rounded-lg bg-[#252525]">
              <div class="flex">
                <button
                  v-for="tab in tabs"
                  :key="tab.key"
                  @click="activeTab = tab.key"
                  :class="[
                    'flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors',
                    activeTab === tab.key
                      ? 'bg-black text-white'
                      : 'text-gray-400 hover:text-white',
                  ]"
                >
                  {{ tab.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div class="px-6">
            <div
              class="bg-[#252525] rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto"
            >
              <!-- Story Tab -->
              <div v-if="activeTab === 'story'" class="space-y-4">
                <!-- MBTI -->
                <div class="pb-4 border-b border-[#404040]">
                  <h3 class="mb-2 text-lg font-semibold">MBTI</h3>
                  <p class="text-gray-300">{{ character?.mbti || "INFJ" }}</p>
                </div>

                <!-- Interests -->
                <div class="pb-4 border-b border-[#404040]">
                  <h3 class="mb-2 text-lg font-semibold">Interests</h3>
                  <p class="text-sm text-gray-300">
                    {{
                      character?.interests ||
                      "Kisra AI เกมเป็นกิจวัตรหญิงสาวไทยผู้สร้าง AI เพื่อปกป้องผู้คน เธอชิงชอบอยู่ตามลำพัง กับร่างใดของริคของตนเอง"
                    }}
                  </p>
                </div>

                <!-- Dislikes -->
                <div class="pb-4 border-b border-[#404040]">
                  <h3 class="mb-2 text-lg font-semibold">Dislikes</h3>
                  <p class="text-sm text-gray-300">
                    {{
                      character?.dislikes ||
                      "Kisra AI เกมไม่กินกับริคอยจองไทยผู้สร้าง AI เพื่อปกป้องผู้คน เธอชิงชอบอยู่ตามลำพัง กับร่างใดของริคของตนเองโกฏิก"
                    }}
                  </p>
                </div>

                <!-- Hobbies -->
                <div class="pb-4 border-b border-[#404040]">
                  <h3 class="mb-2 text-lg font-semibold">Hobbies</h3>
                  <p class="text-sm text-gray-300">
                    {{
                      character?.hobbies ||
                      "Kisra AI เกมเป็นกิจวัตรหญิงสาวไทยผู้สร้าง AI เพื่อปกป้องผู้คน เธอชิงชอบอยู่ตามลำพัง กับร่างใดของริคของตนเองโกฏิก"
                    }}
                  </p>
                </div>

                <!-- Skills -->
                <div class="pb-4 border-b border-[#404040]">
                  <h3 class="mb-2 text-lg font-semibold">Skills</h3>
                  <p class="text-sm text-gray-300">
                    {{
                      character?.skills ||
                      "Kisra AI เกมเป็นกิจวัตรหญิงสาวไทยผู้สร้าง AI เพื่อปกป้องผู้คน เธอชิงชอบอยู่ตามลำพัง เคลื่อนไหวได้ย่างในกฎษฎีร้านอาหารบทสำหรับ"
                    }}
                  </p>
                </div>

                <!-- Memories -->
                <div>
                  <h3 class="mb-2 text-lg font-semibold">Memories</h3>
                  <p class="text-sm text-gray-300">
                    {{
                      character?.memories ||
                      "Kisra AI เกมเป็นกิจวัตรหญิงสาวไทยผู้สร้าง AI เพื่อปกป้องผู้คน เธอชิงชอบอยู่ตามลำพัง เคลื่อนไหวล่ำใย่ำค่าซาม่าบทสำหรับมากนักแสดงเคลื่อนไหว"
                    }}
                  </p>
                </div>

                <!-- Relationship -->
                <div class="p-4 bg-[#2D2D2D] rounded-lg">
                  <h3 class="mb-4 text-lg font-semibold">Relationship</h3>
                  <div class="space-y-3">
                    <!-- Level -->
                    <div class="flex items-center justify-between">
                      <span class="text-white">Level</span>
                      <span
                        class="px-2 py-1 text-xs text-black bg-[#FFD470] rounded-lg"
                        >0/5</span
                      >
                    </div>

                    <!-- Relationship Stats -->
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-white">Intimacy</span>
                        <span class="text-sm text-yellow-400">2/20</span>
                      </div>
                      <div class="w-full h-2 bg-black rounded-full">
                        <div
                          class="h-2 bg-yellow-400 rounded-full"
                          style="width: 10%"
                        ></div>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-white">Trust</span>
                        <span class="text-sm text-yellow-400">2/100</span>
                      </div>
                      <div class="w-full h-2 bg-black rounded-full">
                        <div
                          class="h-2 bg-yellow-400 rounded-full"
                          style="width: 2%"
                        ></div>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-white">Comfort</span>
                        <span class="text-sm text-yellow-400">10/100</span>
                      </div>
                      <div class="w-full h-2 bg-black rounded-full">
                        <div
                          class="h-2 bg-yellow-400 rounded-full"
                          style="width: 10%"
                        ></div>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-white">Attention</span>
                        <span class="text-sm text-yellow-400">20/100</span>
                      </div>
                      <div class="w-full h-2 bg-black rounded-full">
                        <div
                          class="h-2 bg-yellow-400 rounded-full"
                          style="width: 20%"
                        ></div>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-white">Attention</span>
                        <span class="text-sm text-yellow-400">10/100</span>
                      </div>
                      <div class="w-full h-2 bg-black rounded-full">
                        <div
                          class="h-2 bg-yellow-400 rounded-full"
                          style="width: 10%"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Comment Tab -->
              <div
                v-else-if="activeTab === 'comment'"
                class="py-12 text-center"
              >
                <p class="text-gray-400">Comments feature coming soon...</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Section -->
        <div class="px-6 pb-6">
          <div class="flex items-center gap-3">
            <!-- Main Action Button -->
            <button
              @click="startConversation"
              class="flex-1 w-8/12 px-6 py-3 font-bold bg-gradient liquid-glass"
            >
              Start a conversation
            </button>
            <!-- Secondary Action Buttons -->
            <button
              class="w-2/12 p-3 text-white transition-colors bg-[#FFFFFF08] rounded-2xl border border-[#FFFFFF1A] hover:bg-gray-600"
            >
              <Icon name="i-lucide-thumbs-up" class="w-5 h-5" />
            </button>
            <button
              class="w-2/12 p-3 text-white transition-colors bg-[#FFFFFF08] rounded-2xl border border-[#FFFFFF1A] hover:bg-gray-600"
            >
              <Icon name="i-lucide-share" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { useModal } from "#imports";

const runtimeConfig = useRuntimeConfig();
const { isCharacterProfileModalOpen, onCloseCharacterProfileModal } =
  useModal();

const modalOpen = computed({
  get: () => isCharacterProfileModalOpen.value,
  set: (value) => {
    if (!value) {
      onCloseCharacterProfileModal();
    }
  },
});

const props = defineProps({
  character: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["startConversation"]);

const activeTab = ref("story");

const tabs = [
  { key: "story", label: "Story" },
  { key: "comment", label: "Comment" },
];

const closeModal = () => {
  onCloseCharacterProfileModal();
};

const startConversation = () => {
  emit("startConversation", props.character);
  closeModal();
};
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

.glass-border {
  position: relative;
}
.glass-border::before {
  margin-top: -2.5px;
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px; /* border thickness */
  background: linear-gradient(
    249.16deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 49.51%,
    rgba(255, 255, 255, 0.4) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  /* clip off top border */
  /* clip-path: inset(2.5px 0 0 0 round 0 0 1.5rem 1.5rem); */
  mask-composite: exclude;
  pointer-events: none;
}
</style>
