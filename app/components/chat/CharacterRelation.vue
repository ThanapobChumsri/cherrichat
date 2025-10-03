<template>
  <div
    class="max-h-[calc(100vh-16px)] sm:w-[280px] xl:w-[320px] sm:overflow-y-auto relative"
  >
    <div class="px-4 pb-4 flex flex-col gap-4">
      <div class="bg-bio">
        <div class="text-2xl font-semibold mb-4">Bio</div>
        <div class="text-sm">
          {{ characterData?.backstory }}
        </div>
      </div>

      <BioCollapse id="step3" disabled color="yellow" :label="$t('location.info')" test>
        <div class="space-y-2">
          <div class="text-[#9898A2] flex items-center">
            <div class="w-[40%]">Level</div>
            <div class="text-black font-bold bg-[#FFD470] px-3 py-1 rounded-lg">
              {{ overall.level }}/{{ maxLevel }}
            </div>
          </div>

          <div>
            <div class="flex justify-between text-sm mb-2">
              <p class="text-white text-base">{{ $t("character.point") }}</p>
              <p class="font-semibold text-[#DDDDDDAD]">
                {{ overall.points }} /{{ nextPointLevel }}
              </p>
            </div>
            <UProgress
              :model-value="overall.points >= 0 ? overall.points : 0"
              :max="nextPointLevel"
              color="info"
            />
          </div>

          <div v-for="status in statusDisplayList" :key="status">
            <div class="flex justify-between text-sm mb-2">
              <p class="text-white text-base">
                {{ $t(`character.${status}`) }}
              </p>
              <p class="font-semibold text-[#FFBA08]">{{ overall[status] }} /100</p>
            </div>
            <UProgress
              :model-value="overall[status] >= 0 ? overall[status] : 0"
              :max="100"
              color="info"
            />
          </div>
        </div>
      </BioCollapse>

      <div class="space-y-2 mt-2">
        <BioCollapse disabled color="yellow" :label="$t('character.knowledge')">
          <div
            v-for="[key, value] in Object.entries(overall?.knowledge || {})"
            :key="key"
            class="text-sm mb-2"
          >
            <p class="text-white text-base">{{ key }}</p>
            <span>{{ value }}</span>
          </div>
        </BioCollapse>

        <!-- <USeparator size="md" /> -->

        <BioCollapse
          disabled
          color="yellow"
          :label="$t('character.statistics.title')"
        >
          <div
            v-for="stat in StatisticsDisplayList"
            :key="stat"
            class="flex justify-between text-sm mb-2"
          >
            <p class="text-white text-base">
              {{ $t(`character.statistics.${stat}`, "-") }}
            </p>
            <p>
              {{
                [
                  "first_interaction_at",
                  "last_interaction_at",
                  "streak_started_at",
                ].includes(stat)
                  ? useFormattedDateTime(overall[stat])
                  : overall[stat]
              }}
            </p>
          </div>
        </BioCollapse>
      </div>
    </div>
  </div>
</template>

<script setup>
import BioCollapse from "./BioCollapse.vue";
import { useChat } from "#imports";
import { useFormat } from "#imports";

const runtimeConfig = useRuntimeConfig();
const props = defineProps({
  data: {
    type: Object,
  },
  image: {
    type: String,
  },
  imageObject: {
    type: String,
  },
  characterData: {
    type: Object,
  },
});
const { generateImageLoad } = useChat();
const { useFormattedDateTime } = useFormat();

const latestChat = ref({});
const nextPointLevel = ref(0);
const maxLevel = ref(0);
const overall = ref({
  previous_place: "-",
  current_place: "-",
  level: 0,
  points: 0,
  status: "",
  intimacy: 0,
  trust_level: 0,
  comfort_level: 0,
  interest_level: 0,
  affection_level: 0,
  knowledge: "",
  total_messages: 0,
  positive_interactions: 0,
  negative_interactions: 0,
  neutral_interactions: 0,
  daily_streak: 0,
  longest_streak: 0,
  first_interaction_at: "",
  last_interaction_at: "",
  streak_started_at: 0,
});
const levels = [
  { level: 8, status: "soulmate", minPoints: 1000 },
  { level: 7, status: "confidant", minPoints: 750 },
  { level: 6, status: "best_friend", minPoints: 500 },
  { level: 5, status: "close_friend", minPoints: 350 },
  { level: 4, status: "good_friend", minPoints: 200 },
  { level: 3, status: "friend", minPoints: 100 },
  { level: 2, status: "casual_friend", minPoints: 50 },
  { level: 1, status: "acquaintance", minPoints: 20 },
  { level: 0, status: "stranger", minPoints: 0 },
];
const statusDisplayList = [
  "intimacy",
  "trust_level",
  "comfort_level",
  "interest_level",
  "affection_level",
];
const StatisticsDisplayList = [
  "positive_interactions",
  "negative_interactions",
  "neutral_interactions",
  "daily_streak",
  "longest_streak",
  "first_interaction_at",
  "last_interaction_at",
  "streak_started_at",
];

const currentImage = computed(() => {
  if (latestChat.value?.original_place && Object.keys(props.data).length) {
    if (latestChat.value.original_place === props.data.current_place) {
      return runtimeConfig.public.N8N_IMAGE + props.imageObject;
    } else {
      return runtimeConfig.public.N8N_IMAGE + props.image;
    }
  }
  return "";
});

onMounted(() => {
  refreshLocalStorage();
  if (Object.keys(props.data).length) {
    refreshCharacterStatus(props.data);
  }
});

onMounted(() => {
  watch(
    () => props.data,
    (newValue) => {
      refreshLocalStorage();
    }
  );
});

watch(
  () => props.data,
  (newValue) => {
    refreshCharacterStatus(newValue);
  }
);

const refreshCharacterStatus = (newValue) => {
  overall.value = {
    previous_place: newValue.previous_place,
    current_place: newValue.current_place,
    level: Number(newValue.level),
    points: Number(newValue.points),
    status: newValue.status,
    intimacy: Number(newValue.intimacy),
    trust_level: Number(newValue.trust_level),
    comfort_level: Number(newValue.comfort_level),
    interest_level: Number(newValue.interest_level),
    affection_level: Number(newValue.affection_level),
    knowledge: newValue.knowledge,
    total_messages: Number(newValue.total_messages),
    positive_interactions: Number(newValue.positive_interactions),
    negative_interactions: Number(newValue.negative_interactions),
    neutral_interactions: Number(newValue.neutral_interactions),
    daily_streak: Number(newValue.daily_streak),
    longest_streak: Number(newValue.longest_streak),
    first_interaction_at: newValue.first_interaction_at,
    last_interaction_at: newValue.last_interaction_at,
    streak_started_at: Number(newValue.streak_started_at),
  };

  const index = levels.findIndex((l) => newValue.points >= l.minPoints);
  const checkIndex = index >= 0 ? index : levels.length - 1;

  overall.value = {
    ...overall.value,
    level: levels[checkIndex].level,
    status: levels[checkIndex].status,
  };
  if (checkIndex === 0) {
    nextPointLevel.value = "∞";
  } else {
    nextPointLevel.value = levels[checkIndex - 1].minPoints;
  }

  maxLevel.value = Math.max(...levels.map((e) => e.level));
};

const refreshLocalStorage = () => {
  const latest_chat = localStorage.getItem("latest-chat");

  if (!latest_chat) {
    navigateTo("/");
  }

  latestChat.value = JSON.parse(latest_chat);
};
</script>

<style scoped>
.bg-bio {
  color: white;
  position: relative;
  border-radius: 20px;
  padding: 24px;
  background: linear-gradient(164.9deg, #6a8eae 10.62%, #0a3e6e 124.15%);
}

.bg-bio::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px; /* border thickness */
  background: linear-gradient(106.66deg, #a3afbc -2.65%, #232726 90.24%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
</style>
