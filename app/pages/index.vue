<template>
  <div>
    <div
      class="min-h-screen w-full bg-cover bg-center flex justify-center items-start"
      :style="{
        backgroundImage: `url(${coverImage})`,
      }"
    >
      <div
        class="flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-20 px-4 sm:px-16 w-full py-16 sm:py-48"
      >
        <!-- Left section -->
        <div
          class="w-full sm:w-1/2 text-center sm:text-left mt-10 sm:mt-0 space-y-10"
        >
          <div class="text-xl sm:text-[36px] font-extrabold text-white">
            YOUR THOUGHTS, AMPLIFIED. YOUR PRIVACY, GUARANTEED.
          </div>
          <div class="text-sm sm:text-[16px] text-[#94A3B8]">
            Cherrichat isn't just a chat app. It's where your ideas find their
            voice. Get personal expert advice or a confidential ear from a
            friend. All of it is secure and just for you.
          </div>
          <div class="flex justify-center sm:justify-start">
            <UButton
              :disabled="userInfo?.user_type == 'client'"
              :size="isMobile ? 'md' : 'xl'"
              class="w-[140px] sm:w-[200px] flex justify-center liquid-glass bg-gradient !rounded-lg !h-[42px]"
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
              class="w-1/4 sm:px-4 px-1"
              @click="onChangeTab(tab.value)"
            >
              <UButton
                class="font-extrabold text-[10px] sm:text-base liquid-glass w-full"
                :class="tabActive === tab.value ? 'active-bg' : ''"
                style="border-radius: 8px !important"
              >
                <div class="w-full truncate">{{ tab.label }}</div>
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

import coverImage from "~/assets/images/main-bg.png";
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
    label: "ALL",
  },
  {
    value: 2,
    label: "POPULAR",
  },
  {
    value: 3,
    label: "CATEGORY 1",
  },
  {
    value: 4,
    label: "CATEGORY 2",
  },
]);

const userInfo = useCookie("user-info");
const search = ref("");
const userType = computed(() => userInfo.value?.user_type || false);

onMounted(async () => {
  searchBus.on(async (term) => {
    console.log("term", term);
    
    search.value = term;
    await getCharacterList();
  });
  localStorage.removeItem("latest-chat");

  await getCharacterList();

  if (!localStorage.getItem("sound-list")) {
    await getSoundListData();
  }

  // Detect chagnes in the user's 'user_type'
  if (userInfo.value) {
    await getUserData();
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

const getUserData = async () => {
  const response = await useGetUserById(userInfo.value);
  userInfo.value = {
    ...userInfo.value,
    user_type: response.user_type,
  };
};

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
