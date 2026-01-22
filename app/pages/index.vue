<template>
  <div>
    <PDPAModal />
    <DailyLoginModal />
    <div class="min-h-screen w-full bg-cover bg-center">
      <div class="sm:px-10 md:px-20 lg:px-30 xl:px-40"><Banner /></div>
      <div
        class="flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-20 px-4 sm:px-16 w-full"
      >
        <div class="w-full">
          <div class="flex justify-center items-start mb-8">
            <!-- Tabs -->

            <div
              v-for="(tab, index) in tabItem"
              :key="index"
              class="w-1/4 px-1 sm:px-4"
              @click="onChangeTab(tab.value)"
            >
              <UButton
                class="font-extrabold text-[10px] sm:text-base liquid-glass w-full"
                :class="tabActive === tab.value ? 'active-bg' : ''"
                style="border-radius: 8px !important"
              >
                <div class="w-full truncate">
                  {{ $t(`index.section2.${tab.label}`) }}
                </div>
              </UButton>
            </div>
          </div>

          <!-- Character grid -->
          <div class="hidden md:grid md:grid-cols-6 gap-4 mb-8">
            <CharacterCardSkeleton v-if="loading" :count="12" />
            <CharacterCard
              v-for="(character, index) in tabActive === 1
                ? characterList
                : characterList.slice(1, tabActive + 1)"
              :key="index"
              :data="character"
              @openProfile="openCharacterProfile"
            />
          </div>

          <!-- Mobile: Carousel -->
          <div class="md:hidden mb-8 relative grid">
            <CharacterCardSkeleton v-if="loading" :count="2" />

            <div v-else class="overflow-hidden">
              <!-- Carousel Container -->
              <div
                ref="carouselRef"
                class="flex"
                :style="{
                  transform: `translateX(calc(-${currentSlide * 100}%))`,
                  transition: isTransitioning
                    ? 'transform 0.3s ease-in-out'
                    : 'none',
                }"
                @transitionend="handleTransitionEnd"
              >
                <!-- Clone last page -->
                <div class="flex-shrink-0 w-full flex gap-4">
                  <div
                    v-for="(character, index) in getLastItems()"
                    :key="`clone-last-${index}`"
                    class="flex-shrink-0 w-[calc(50%-8px)]"
                  >
                    <CharacterCard
                      :data="character"
                      @openProfile="openCharacterProfile"
                    />
                  </div>
                </div>

                <!-- Original items grouped by pages -->
                <div
                  v-for="(page, pageIndex) in paginatedCharacters"
                  :key="`page-${pageIndex}`"
                  class="flex-shrink-0 w-full flex gap-4"
                >
                  <div
                    v-for="(character, index) in page"
                    :key="`original-${pageIndex}-${index}`"
                    class="flex-shrink-0 w-[calc(50%-8px)]"
                  >
                    <CharacterCard
                      :data="character"
                      @openProfile="openCharacterProfile"
                    />
                  </div>
                </div>

                <!-- Clone first page -->
                <div class="flex-shrink-0 w-full flex gap-4">
                  <div
                    v-for="(character, index) in getFirstItems()"
                    :key="`clone-first-${index}`"
                    class="flex-shrink-0 w-[calc(50%-8px)]"
                  >
                    <CharacterCard
                      :data="character"
                      @openProfile="openCharacterProfile"
                    />
                  </div>
                </div>
              </div>

              <!-- Navigation Arrows -->
              <button
                @click="prevSlide"
                class="absolute left-2 ip:-left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FFFFFF80] rounded-2xl flex items-center justify-center text-gray-700 hover:bg-gray-900 transition z-999"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                @click="nextSlide"
                class="absolute right-2 ip:-right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#FFFFFF80] rounded-2xl flex items-center justify-center text-gray-700 hover:bg-gray-900 transition z-999"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <Top10 class="mb-8" />

          <Recommend class="mb-8" @openProfile="openCharacterProfile" />
        </div>
      </div>
    </div>

    <!-- Character Profile Modal -->
    <CharacterProfileModal
      :index="characterList.findIndex((e) => e?.id === selectedCharacter?.id)"
      :character-list="characterList"
      :character="selectedCharacter"
      @startConversation="goToChat"
    />
  </div>
</template>

<script setup>
import CharacterCard from "~/components/CharacterCard.vue";
import CharacterCardSkeleton from "~/components/skeletons/CharacterCardSkeleton.vue";
import PDPAModal from "~/components/modal/PDPAModal.vue";
import DailyLoginModal from "~/components/modal/DailyLoginModal.vue";
import Banner from "~/components/Banner.vue";
import CharacterProfileModal from "~/components/modal/CharacterProfileModal.vue";
import Top10 from "~/components/Top10.vue";
import Recommend from "~/components/Recommend.vue";

import { useCharacter } from "~/composables/useCharacter.js";
import { useChat } from "#imports";
import { useBreakpoint } from "#imports";
import { useUser } from "#imports";
import { UButton } from "#components";
import { useSearchBus } from "#imports";
import { useModal } from "#imports";

const searchBus = useSearchBus();
const { getAllCharacter } = useCharacter();
const { getSoundList } = useChat();
const { useGetUserById } = useUser();
const { isMobile } = useBreakpoint();
const { onOpenCharacterProfileModal } = useModal();

const characterList = ref([]);
const loading = ref(true);
const tabActive = ref(1);
const tabItem = ref([
  {
    value: 1,
    label: "all",
  },
  {
    value: 2,
    label: "popular",
  },
  {
    value: 3,
    label: "category_1",
  },
  {
    value: 4,
    label: "category_2",
  },
]);

const userInfo = useCookie("user-info");
const search = ref("");
const selectedCharacter = ref(null);

// get user-info and set cookie on server before mounted
await useAsyncData("user-info", async () => {
  if (userInfo.value) {
    const response = await useGetUserById(userInfo.value);
    userInfo.value = {
      ...userInfo.value,
      user_type: response.user_type,
      pdpa_consent: response.pdpa_consent,
      chat_tutorial: response.chat_tutorial,
    };
  }
});

onMounted(async () => {
  searchBus.on(async (term) => {
    search.value = term;
    await getCharacterList();
  });
  localStorage.removeItem("latest-chat");

  await getCharacterList();

  if (!localStorage.getItem("sound-list")) {
    await getSoundListData();
  }
});

watch(search, async (newValue) => {
  if (!newValue) {
    await getCharacterList();
  }
});

const getSoundListData = async () => {
  const soundRes = await getSoundList();
  localStorage.setItem("sound-list", JSON.stringify(soundRes));
};

const getCharacterList = async () => {
  const characterRes = await getAllCharacter({
    page: 1,
    per_page: 100,
    search: search.value,
    is_active: true,
    user_id: userInfo.value?.user_id || null,
  });
  characterList.value = characterRes.data;
  tabActive.value = 1;
  loading.value = false;
};
const onChangeTab = (index) => {
  tabActive.value = index;
};

const clickCreateCharacter = () => {
  navigateTo("/create-character");
};

const openCharacterProfile = (character) => {
  selectedCharacter.value = character;
  onOpenCharacterProfileModal();
};

const goToChat = (character) => {
  const route = useRoute();
  const userInfoData = JSON.parse(localStorage.getItem("user-info"));

  if (!userInfoData) {
    // Check if we're in demo mode
    if (route.path.startsWith("/demo")) {
      navigateTo("/demo/signin");
    } else {
      navigateTo("/signin");
    }
    return;
  }

  const runtimeConfig = useRuntimeConfig();

  let setImageURL = character.emotions
    ? Object.fromEntries(
        Object.entries(character.emotions).map(([key, value]) => [
          key,
          `${runtimeConfig.public.N8N_IMAGE}${value}`,
        ]),
      )
    : null;
  let setVidelURL = character.emotions_video
    ? Object.fromEntries(
        Object.entries(character.emotions_video).map(([key, value]) => [
          key,
          `${runtimeConfig.public.N8N_VIDEO}${value}`,
        ]),
      )
    : null;

  localStorage.setItem(
    "latest-chat",
    JSON.stringify({
      character_info: character,
      user_id: userInfoData.user_id,
      character_id: character.id,
      session_key: `session_${userInfoData.user_id}_${character.id}_ver_0`,
      url_image: `${runtimeConfig.public.N8N_IMAGE}${character.url_image}`,
      emotions: setImageURL,
      url_video: `${runtimeConfig.public.N8N_VIDEO}${character.url_video}`,
      emotions_video: setVidelURL,
      original_place: character.original_place,
      is_user_like: character.is_user_like,
    }),
  );

  // Navigate to appropriate chat page based on current mode
  if (route.path.startsWith("/demo")) {
    navigateTo("/demo/chat");
  } else {
    navigateTo("/chat");
  }
};

const currentSlide = ref(1);
const slidesPerView = 2;
const carouselRef = ref(null);
const isTransitioning = ref(true);

const filteredCharacters = computed(() => {
  return tabActive.value === 1
    ? characterList.value
    : characterList.value.slice(1, tabActive.value + 1);
});

// แบ่งเป็นหน้าๆ ละ 2 items
const paginatedCharacters = computed(() => {
  const chars = filteredCharacters.value;
  const pages = [];

  for (let i = 0; i < chars.length; i += slidesPerView) {
    pages.push(chars.slice(i, i + slidesPerView));
  }

  return pages;
});

const totalPages = computed(() => paginatedCharacters.value.length);

const getLastItems = () => {
  const pages = paginatedCharacters.value;
  return pages[pages.length - 1] || [];
};

const getFirstItems = () => {
  const pages = paginatedCharacters.value;
  return pages[0] || [];
};

const nextSlide = () => {
  if (!isTransitioning.value) return;
  currentSlide.value++;
};

const prevSlide = () => {
  if (!isTransitioning.value) return;
  currentSlide.value--;
};

const handleTransitionEnd = () => {
  if (currentSlide.value >= totalPages.value + 1) {
    isTransitioning.value = false;
    currentSlide.value = 1;
    setTimeout(() => {
      isTransitioning.value = true;
    }, 50);
  } else if (currentSlide.value <= 0) {
    isTransitioning.value = false;
    currentSlide.value = totalPages.value;
    setTimeout(() => {
      isTransitioning.value = true;
    }, 50);
  }
};

watch(
  () => tabActive.value,
  () => {
    currentSlide.value = 1;
    isTransitioning.value = true;
  },
);
</script>

<style>
.active-bg {
  background: linear-gradient(
    271.93deg,
    #691a20 -18.01%,
    #d00000 96.17%
  ) !important;
}
.input-liquid-glass input {
  background: #ffffff1a;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);

  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  box-shadow:
    inset 0 1px 2px rgba(255, 255, 255, 1),
    /* inner shadow ล่าง */ inset 0 1px 2px rgba(255, 255, 255, 1),
    /* outer shadow ฟุ้ง */ 0 4px 12px rgba(0, 0, 0, 0.25),
    /* glow ขอบจาง ๆ */ 0 0 6px rgba(255, 255, 255, 0.5);
  /* --- กำหนด mask --- */
  -webkit-mask-image:
    /* base capsule (ไม่ให้ shape ขาด) */
    linear-gradient(white, white),
    /* fade ล่างซ้าย */
    radial-gradient(
        circle at bottom left,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 40%
      ),
    /* fade บนขวา */
    radial-gradient(
        circle at top right,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 40%
      );

  -webkit-mask-composite: destination-in, destination-in, destination-in;
}

.input-liquid-glass input::placeholder {
  color: white;
}
.input-liquid-glass .ring-accented {
  --tw-ring-color: unset !important;
}
.input-liquid-glass .ring-accented {
  --tw-ring-color: unset !important;
}
.input-liquid-glass .ring {
  --tw-ring-shadow: unset !important;
}
</style>
