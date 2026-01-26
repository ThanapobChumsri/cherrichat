<template>
  <div class="conversation-container">
    <!-- Featured Cards (2 cards) -->
    <div
      v-if="featuredConversations.length > 0"
      class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 lg:mb-16"
    >
      <div
        v-for="(conv, index) in featuredConversations"
        :key="`featured-${index}`"
        class="featured-card liquid-glass !bg-[#212126] backdrop-blur-md border border-white/10 rounded-3xl p-5 cursor-pointer hover:border-white/20 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
        @click="startConversation(conv)"
      >
        <div class="flex gap-5 items-stretch">
          <!-- Character Image -->
          <div class="flex-shrink-0">
            <img
              :src="getImageUrl(conv.url_image)"
              :alt="conv.name"
              class="w-[118px] h-[130px] sm:w-[140px] sm:h-[150px] lg:w-[226px] lg:h-[252px] rounded-2xl object-cover ring-1 ring-white/10"
            />
          </div>

          <!-- Right Side (title/desc + CTA pinned bottom like the mock) -->
          <div class="flex-1 min-w-0 flex flex-col justify-between">
            <!-- Content -->
            <div class="min-w-0">
              <h3
                class="text-white font-extrabold text-xl sm:text-2xl leading-tight mb-2 truncate"
              >
                {{ conv.conversation?.[0] || "Do you feel lonely?" }}
              </h3>
              <p
                class="text-gray-300/70 text-sm sm:text-base leading-relaxed line-clamp-2"
              >
                {{
                  conv.backstory ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                }}
              </p>
            </div>

            <!-- CTA Button (bigger pill, anchored bottom) -->
            <div class="mt-4">
              <button
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient hover:bg-gradient/90 text-white font-extrabold px-6 sm:px-7 py-3 rounded-[16px] text-sm sm:text-md shadow-[0_12px_30px_rgba(220,38,38,0.25)] transition-colors truncate"
                @click.stop="startConversation(conv)"
              >
                <span class="hidden sm:inline">Start chatting with</span>
                <span class="sm:hidden">Chat</span>
                <span class="font-black">{{ conv.name }}</span>
                <Icon name="tabler:send-2" class="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Start a conversation section -->
    <div>
      <div class="flex items-center gap-2 mb-4">
        <h2 class="text-white font-extrabold text-xl">Start a conversation</h2>
        <Icon name="mdi:sparkles" class="text-white/90 text-xl" />
      </div>

      <!-- Desktop / Tablet: Grid -->
      <div class="hidden lg:grid grid-cols-4 gap-4">
        <div
          v-for="(conv, index) in regularConversations"
          :key="`conv-${index}`"
          class="conversation-card liquid-glass !bg-[#212126] backdrop-blur-md border border-white/10 rounded-3xl p-4 cursor-pointer hover:border-white/20 transition-all"
          @click="startConversation(conv)"
        >
          <!-- Character Avatar with Badge -->
          <div class="flex items-center gap-3 mb-3">
            <div class="relative">
              <img
                :src="getImageUrl(conv.url_image)"
                :alt="conv.name"
                class="w-14 h-14 rounded-full object-cover ring-2 ring-white/10"
              />
              <div
                class="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient rounded-full border-2 border-gray-900 flex items-center justify-center shadow"
              >
                <Icon name="mdi:star" class="text-white text-xs" />
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-gray-300/60 text-xs truncate">Talking with...</p>
              <p class="text-white font-extrabold text-sm truncate">
                {{ conv.name }}
              </p>
            </div>
          </div>

          <!-- Conversation Starters -->
          <div class="space-y-2">
            <div
              v-for="(message, msgIndex) in (conv.conversation || []).slice(
                0,
                3,
              )"
              :key="`msg-${msgIndex}`"
              class="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl px-3 py-2 text-gray-200/90 text-sm transition-colors group"
              @click.stop="startConversationWithMessage(conv, message)"
            >
              <span class="truncate flex-1">{{
                message || "Hello, how are you doing?"
              }}</span>
              <Icon
                name="tabler:send-2"
                class="text-gray-400/70 group-hover:text-white transition-colors flex-shrink-0 ml-2"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile: Horizontal slide (FIX overflow) -->
      <div>
        <div
          class="lg:hidden rounded-3xl w-[calc(100vw-2rem)] sm:w-[calc(100vw-13rem)]"
        >
          <div
            class="-mr-4 sm:-mr-16 flex gap-4 overflow-x-auto pb-4 scrollbar-hide overscroll-x-contain snap-x snap-mandatory"
          >
            <div
              v-for="(conv, index) in regularConversations"
              :key="`mobile-${index}`"
              class="conversation-card-mobile flex-shrink-0 w-[280px] max-w-[80vw] liquid-glass !bg-[#212126] backdrop-blur-md border border-white/10 rounded-3xl p-4 cursor-pointer hover:border-white/20 transition-all snap-start"
              @click="startConversation(conv)"
            >
              <!-- Character Avatar with Badge -->
              <div class="flex items-center gap-3 mb-3">
                <div class="relative">
                  <img
                    :src="getImageUrl(conv.url_image)"
                    :alt="conv.name"
                    class="w-14 h-14 rounded-full object-cover ring-2 ring-white/10"
                  />
                  <div
                    class="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient rounded-full border-2 border-gray-900 flex items-center justify-center shadow"
                  >
                    <Icon name="mdi:star" class="text-white text-xs" />
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <p class="text-gray-300/60 text-xs truncate">
                    Talking with...
                  </p>
                  <p class="text-white font-extrabold text-sm truncate">
                    {{ conv.name }}
                  </p>
                </div>
              </div>

              <!-- Conversation Starters -->
              <div class="space-y-2">
                <div
                  v-for="(message, msgIndex) in (conv.conversation || []).slice(
                    0,
                    3,
                  )"
                  :key="`mmsg-${msgIndex}`"
                  class="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl px-3 py-2 text-gray-200/90 text-sm transition-colors group"
                  @click.stop="startConversationWithMessage(conv, message)"
                >
                  <span class="truncate flex-1">{{
                    message || "Hello, how are you doing?"
                  }}</span>
                  <Icon
                    name="tabler:send-2"
                    class="text-gray-400/70 group-hover:text-white transition-colors flex-shrink-0 ml-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="props.conversations.length === 0"
        class="mt-8 text-center text-gray-300/70"
      >
        No conversations yet.
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  conversations: {
    type: Array,
    default: () => [],
  },
  featuredCount: {
    type: Number,
    default: 2,
  },
});

const emit = defineEmits(["startChat", "startChatWithMessage"]);

const runtimeConfig = useRuntimeConfig();

const featuredConversations = computed(() =>
  (props.conversations || []).slice(0, props.featuredCount),
);

const regularConversations = computed(() =>
  (props.conversations || []).slice(props.featuredCount),
);

const getImageUrl = (url) => {
  if (!url) return "/default-avatar.png";
  if (url.startsWith("http")) return url;
  return `${runtimeConfig.public.N8N_IMAGE}${url}`;
};

const startConversation = (conv) => {
  emit("startChat", conv);
};

const startConversationWithMessage = (conv, message) => {
  emit("startChatWithMessage", { character: conv, message });
};
</script>

<style scoped>
.conversation-container {
  @apply w-full;
}

/* Line clamp helper (if you don't have tailwind line-clamp plugin) */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hide scrollbar for mobile horizontal scroll */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
