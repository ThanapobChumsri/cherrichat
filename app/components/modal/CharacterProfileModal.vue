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
                {{ t('modal.character_profile.chat_background_example') }}
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
              {{ t('modal.character_profile.top_3_popular') }}
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
            <span class="text-base font-medium">{{ t('modal.character_profile.age_warning') }}</span>
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

          <!-- Debug - Character Structure -->
          <!-- <div class="px-6 mb-4">
            <div class="p-4 bg-gray-800 text-xs text-white rounded-lg max-h-[200px] overflow-y-auto">
              <div class="mb-2"><strong>Character Keys:</strong> {{ Object.keys(character || {}) }}</div>
              <div class="mb-2"><strong>Direct Interests:</strong> {{ character?.interests }}</div>
              <div class="mb-2"><strong>Knowledge Base:</strong> {{ character?.knowledge_base }}</div>
              <div class="mb-2"><strong>Personality:</strong> {{ character?.personality }}</div>
              <div class="mb-2"><strong>Skills:</strong> {{ character?.skills }}</div>
              <div class="mb-2"><strong>MBTI:</strong> {{ character?.mbti }}</div>
              <pre>{{ JSON.stringify(character, null, 2) }}</pre>
            </div>
          </div> -->

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
                  <p class="text-gray-300">{{ character?.mbti || "-" }}</p>
                </div>

                <!-- Interests -->
                <div class="pb-4 border-b border-[#404040]">
                  <h3 class="mb-2 text-lg font-semibold">{{ t('modal.character_profile.interests') }}</h3>
                  <p class="text-sm text-gray-300">
                    {{
                      Array.isArray(character?.knowledge_base?.likes)
                        ? character.knowledge_base.likes.join(", ")
                        : character?.knowledge_base?.likes ||
                          character?.personality?.likes ||
                          character?.interests ||
                          "-"
                    }}
                  </p>
                </div>

                <!-- Dislikes -->
                <div class="pb-4 border-b border-[#404040]">
                  <h3 class="mb-2 text-lg font-semibold">{{ t('modal.character_profile.dislikes') }}</h3>
                  <p class="text-sm text-gray-300">
                    {{
                      Array.isArray(character?.knowledge_base?.dislikes)
                        ? character.knowledge_base.dislikes.join(", ")
                        : character?.knowledge_base?.dislikes ||
                          character?.personality?.dislikes ||
                          character?.dislikes ||
                          "-"
                    }}
                  </p>
                </div>

                <!-- Hobbies -->
                <div class="pb-4 border-b border-[#404040]">
                  <h3 class="mb-2 text-lg font-semibold">{{ t('modal.character_profile.hobbies') }}</h3>
                  <p class="text-sm text-gray-300">
                    {{
                      Array.isArray(character?.knowledge_base?.hobbies)
                        ? character.knowledge_base.hobbies.join(", ")
                        : character?.knowledge_base?.hobbies ||
                          character?.personality?.hobbies ||
                          character?.hobbies ||
                          "-"
                    }}
                  </p>
                </div>

                <!-- Skills -->
                <div class="pb-4 border-b border-[#404040]">
                  <h3 class="mb-2 text-lg font-semibold">{{ t('modal.character_profile.skills') }}</h3>
                  <p class="text-sm text-gray-300">
                    {{
                      Array.isArray(character?.knowledge_base?.skills)
                        ? character.knowledge_base.skills.join(", ")
                        : character?.knowledge_base?.skills ||
                          character?.personality?.skills ||
                          character?.skills ||
                          "-"
                    }}
                  </p>
                </div>

                <!-- Memories -->
                <div>
                  <h3 class="mb-2 text-lg font-semibold">{{ t('modal.character_profile.memories') }}</h3>
                  <p class="text-sm text-gray-300">
                    {{
                      character?.knowledge_base?.memories ||
                      character?.personality?.memories ||
                      character?.memories ||
                      "-"
                    }}
                  </p>
                </div>

                <!-- Relationship -->
                <div class="p-4 bg-[#2D2D2D] rounded-lg">
                  <h3 class="mb-4 text-lg font-semibold">{{ t('modal.character_profile.relationship') }}</h3>
                  <div class="space-y-3">
                    <!-- Level -->
                    <div class="flex items-center justify-between">
                      <span class="text-white">{{ t('modal.character_profile.level') }}</span>
                      <span
                        class="px-2 py-1 text-xs text-black bg-[#FFD470] rounded-lg"
                        >{{ relationshipData?.level || 0 }}/5</span
                      >
                    </div>

                    <!-- Relationship Stats -->
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-white">{{ t('modal.character_profile.intimacy') }}</span>
                        <span class="text-sm text-yellow-400">{{ (relationshipData?.intimacy || 0) }}/100</span>
                      </div>
                      <div class="w-full h-2 bg-black rounded-full">
                        <div
                          class="h-2 bg-yellow-400 rounded-full"
                          :style="{ width: `${(relationshipData?.intimacy || 0)}%` }"
                        ></div>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-white">{{ t('modal.character_profile.trust') }}</span>
                        <span class="text-sm text-yellow-400">{{ (relationshipData?.trust_level || 0) }}/100</span>
                      </div>
                      <div class="w-full h-2 bg-black rounded-full">
                        <div
                          class="h-2 bg-yellow-400 rounded-full"
                          :style="{ width: `${(relationshipData?.trust_level || 0)}%` }"
                        ></div>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-white">{{ t('modal.character_profile.comfort') }}</span>
                        <span class="text-sm text-yellow-400">{{ (relationshipData?.comfort_level || 0) }}/100</span>
                      </div>
                      <div class="w-full h-2 bg-black rounded-full">
                        <div
                          class="h-2 bg-yellow-400 rounded-full"
                          :style="{ width: `${(relationshipData?.comfort_level || 0)}%` }"
                        ></div>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-white">{{ t('modal.character_profile.interest') }}</span>
                        <span class="text-sm text-yellow-400">{{ (relationshipData?.interest_level || 0) }}/100</span>
                      </div>
                      <div class="w-full h-2 bg-black rounded-full">
                        <div
                          class="h-2 bg-yellow-400 rounded-full"
                          :style="{ width: `${(relationshipData?.interest_level || 0)}%` }"
                        ></div>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-white">{{ t('modal.character_profile.affection') }}</span>
                        <span class="text-sm text-yellow-400">{{ (relationshipData?.affection_level || 0) }}/100</span>
                      </div>
                      <div class="w-full h-2 bg-black rounded-full">
                        <div
                          class="h-2 bg-yellow-400 rounded-full"
                          :style="{ width: `${(relationshipData?.affection_level || 0)}%` }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Comment Tab -->
              <div v-else-if="activeTab === 'comment'" class="space-y-4">
                <!-- Comments Header -->
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">{{ mockComments.length }} comments</h3>
                </div>

                <!-- Comment List -->
                <div class="space-y-4">
                  <div
                    v-for="comment in mockComments"
                    :key="comment.id"
                    class="p-4 border border-gray-600 rounded-lg bg-[#2D2D2D]"
                  >
                    <div class="flex items-start space-x-3">
                      <div class="flex-shrink-0 w-10 h-10 bg-gray-600 rounded-full">
                        <img
                          :src="comment.avatar"
                          :alt="comment.username"
                          class="object-cover w-full h-full rounded-full"
                        >
                      </div>
                      <div class="flex-1">
                        <div class="flex items-center mb-2 space-x-2">
                          <span class="font-semibold text-white">{{ comment.username }}</span>
                          <span class="text-xs text-gray-500">{{ comment.createdAt }}</span>
                        </div>
                        <p class="mb-3 text-sm text-gray-300">
                          {{ comment.content }}
                        </p>
                        <div class="flex items-center space-x-3">
                          <button class="flex items-center space-x-1 text-gray-400 transition-colors hover:text-white">
                            <Icon name="i-lucide-thumbs-up" class="w-4 h-4" />
                            <span class="text-xs">{{ comment.likes }}</span>
                          </button>
                          <button class="flex items-center space-x-1 text-gray-400 transition-colors hover:text-white">
                            <Icon name="i-lucide-thumbs-down" class="w-4 h-4" />
                          </button>
                          <button class="text-xs text-gray-400 transition-colors hover:text-white">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Add Comment Form -->
                <div class="mt-6 p-4 border border-gray-600 rounded-lg bg-[#2D2D2D]">
                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 w-10 h-10 bg-gray-600 rounded-full">
                      <div class="flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-red-500 to-pink-500">
                        <Icon name="i-lucide-user" class="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div class="flex-1">
                      <textarea
                        placeholder="Write a comment..."
                        class="w-full p-3 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm resize-none focus:outline-none focus:border-red-500 transition-colors"
                        rows="3"
                      ></textarea>
                      <div class="flex justify-end mt-3">
                        <button class="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700">
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
              {{ t('modal.character_profile.start_conversation') }}
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
import { useCharacter } from "#imports";

const runtimeConfig = useRuntimeConfig();
const { isCharacterProfileModalOpen, onCloseCharacterProfileModal } =
  useModal();
const { getRelationship } = useCharacter();
const { t } = useI18n();
const userInfo = useCookie('user-info')

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
const relationshipData = ref(null);

const tabs = [
  { key: "story", label: t('modal.character_profile.story') },
  { key: "comment", label: t('modal.character_profile.comment') },
];

// Mock comments data
const mockComments = ref([
  {
    id: 1,
    username: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    content: "I just tried this recipe and it was amazing! The instructions were clear and easy to follow, and the end result was delicious. I will definitely be making this again. Thanks for sharing!",
    likes: 12,
    createdAt: "2 hours ago"
  },
  {
    id: 2,
    username: "Terry.Wolf",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    content: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
    likes: 8,
    createdAt: "4 hours ago"
  },
  {
    id: 3,
    username: "Angie_Klein",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    content: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
    likes: 5,
    createdAt: "6 hours ago"
  }
]);

// Watch for modal open and character change to fetch relationship data
watch([modalOpen, () => props.character], async ([isOpen, character]) => {
  if (isOpen && character && userInfo.value) {
    try {
      const relationship = await getRelationship(userInfo.value.user_id, character.id);
      relationshipData.value = relationship;
    } catch (error) {
      console.error('Failed to fetch relationship data:', error);
      relationshipData.value = null;
    }
  }
}, { immediate: true });

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
