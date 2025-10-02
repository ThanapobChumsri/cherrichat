<template>
  <div>
    <UContainer>
      <div class="py-8 sm:py-16">
        <p
          class="text-center text-xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#FDE824] to-[#FDE824] bg-clip-text text-transparent mb-4"
        >
          {{ $t("index.section2.title") }}
        </p>
        <p
          class="text-center text-sm sm:text-xl font-extrabold text-[#94a3b8] mb-14"
        >
          {{ $t("index.section2.sub_title") }}
        </p>

        <div
          class="grid grid-cols-2 gap-2 mb-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
          <CharacterCardSkeleton v-if="loading" :count="3" />
          <CharacterCard
            v-else
            v-for="(character, index) in characterList"
            :key="index"
            :data="character"
          />
        </div>

        <div class="flex justify-center">
          <UButton
            :size="isMobile ? 'md' : 'xl'"
            class="w-[160px] flex justify-center !bg-black !border-[#FDE824] !border !text-[#FDE824]"
            disabled
            >{{ $t("index.section2.view_all") }}</UButton
          >
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import CharacterCard from "~/components/CharacterCard.vue";
import CharacterCardSkeleton from "~/components/skeletons/CharacterCardSkeleton.vue";

import coverImage from "~/assets/images/main.jpeg";
import { useCharacter } from "~/composables/useCharacter.js";
import { useChat } from "#imports";
import { useBreakpoint } from "#imports";
import { useUser } from "#imports";

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
    label: "🔥 hot",
  },
  {
    value: 2,
    label: "new",
  },
  {
    value: 3,
    label: "top",
  },
  {
    value: 4,
    label: "trending",
  },
]);

const userInfo = useCookie("user-info");

const userType = computed(() => userInfo.value?.user_type || false);

onMounted(async () => {
  localStorage.removeItem("latest-chat");

  const characterRes = await getAllCharacter({
    page: 1,
    per_page: 3,
    is_active: true,
  });
  characterList.value = characterRes.data;
  loading.value = false;

  if (!localStorage.getItem("sound-list")) {
    const soundRes = await getSoundList();
    localStorage.setItem("sound-list", JSON.stringify(soundRes));
  }

  // Detect chagnes in the user's 'user_type'
  if (userInfo.value) {
    const response = await useGetUserById(userInfo.value);
    userInfo.value = {
      ...userInfo.value,
      user_type: response.user_type,
    };
  }
});

const onChangeTab = (index) => {
  tabActive.value = index;
};

const clickCreateCharacter = () => {
  navigateTo("/create-character");
};
</script>

<style scoped></style>
