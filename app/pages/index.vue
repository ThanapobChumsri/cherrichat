<template>
  <div>
    <PDPAModal />
    <DailyLoginModal />
    <div class="min-h-screen w-full bg-cover bg-center">
      <Banner />
      <div
        class="flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-20 px-4 sm:px-16 w-full"
      >
        <!-- Left section -->
        <div
          class="w-full sm:w-1/2 text-center sm:text-left mt-4 sm:mt-0 space-y-4 sm:space-y-10"
        >
          <div class="text-xl sm:text-[36px] font-extrabold text-white">
            {{ $t('index.section1.title') }}
          </div>
          <div class="text-sm sm:text-[16px] text-[#94A3B8]">
            {{ $t('index.section1.sub_title') }}
          </div>
          <div class="flex justify-center sm:justify-start">
            <UButton
              v-if="userInfo?.user_type === 'creator'"
              :size="isMobile ? 'md' : 'xl'"
              class="w-[140px] sm:w-[200px] flex justify-center liquid-glass !rounded-lg !h-[42px] bg-gradient cursor-pointer"
              @click="clickCreateCharacter"
            >
              <div class="flex items-center w-full">
                <div class="w-full">
                  {{ $t("index.section1.create_character") }}
                </div>
              </div>
            </UButton>
          </div>
        </div>
        <div class="flex sm:hidden items-center w-full">
          <UInput
            color="red"
            class="input-liquid-glass w-full"
            placeholder="Search"
            v-model="search"
            enterkeyhint="go"
            @keypress="
              (e) => {
                if (e.key === 'Enter') getCharacterList();
              }
            "
          >
            <template #leading>
              <Icon
                name="i-lucide-search"
                class="text-white opacity-50 flex items-center w-6"
              />
            </template>
          </UInput>
        </div>

        <!-- Right section -->
        <div class="w-full sm:w-1/2">
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
                <div class="w-full truncate">{{ $t(`index.section2.${tab.label}`) }}</div>
              </UButton>
            </div>
          </div>

          <!-- Character grid -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <CharacterCardSkeleton v-if="loading" :count="12" />
            <CharacterCard
              v-for="(character, index) in tabActive === 1
                ? characterList
                : characterList.slice(1, tabActive + 1)"
              :key="index"
              :data="character"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CharacterCard from "~/components/CharacterCard.vue";
import CharacterCardSkeleton from "~/components/skeletons/CharacterCardSkeleton.vue";
import PDPAModal from "~/components/modal/PDPAModal.vue";
import DailyLoginModal from "~/components/modal/DailyLoginModal.vue";
import Banner from "~/components/Banner.vue";

import { useCharacter } from "~/composables/useCharacter.js";
import { useChat } from "#imports";
import { useBreakpoint } from "#imports";
import { useUser } from "#imports";
import { UButton } from "#components";
import { useSearchBus } from "#imports";

const searchBus = useSearchBus();
const { getAllCharacter } = useCharacter();
const { getSoundList } = useChat();
const { useGetUserById } = useUser();
const { isMobile } = useBreakpoint();

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

// get user-info and set cookie on server before mounted
await useAsyncData('user-info', async () => {
    if (userInfo.value) {
      const response = await useGetUserById(userInfo.value);
      userInfo.value = {
        ...userInfo.value,
        user_type: response.user_type,
        pdpa_consent: response.pdpa_consent,
        chat_tutorial: response.chat_tutorial,
      };
    }
  }
)

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

watch(
  search,
  async (newValue) => {
    if (!newValue) {
      await getCharacterList();
    }
  }
)

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
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 1),
    /* inner shadow ล่าง */ inset 0 1px 2px rgba(255, 255, 255, 1),
    /* outer shadow ฟุ้ง */ 0 4px 12px rgba(0, 0, 0, 0.25),
    /* glow ขอบจาง ๆ */ 0 0 6px rgba(255, 255, 255, 0.5);
  /* --- กำหนด mask --- */
  -webkit-mask-image:
    /* base capsule (ไม่ให้ shape ขาด) */ linear-gradient(
      white,
      white
    ),
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
