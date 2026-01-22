<template>
  <div v-if="top10List.length > 0" class="top10-container">
    <!-- Header -->

    <!-- Desktop Layout -->
    <div
      class="hidden lg:block relative bg-cover bg-no-repeat rounded-[16px] overflow-hidden p-6 relative"
      :style="{ backgroundImage: `url(${top10bg})` }"
    >
      <div class="absolute top-6 flex items-center gap-2 mb-6 lg:mb-8">
        <Icon name="material-symbols:crown" class="crown-icon text-4xl" />
        <h2 class="text-[32px] font-bold text-white">
          Top 10 weekly interaction users
        </h2>
      </div>
      <div class="flex gap-6">
        <!-- Left: Top 3 Podium -->
        <div class="basis-1/2 shrink-0 flex flex-col justify-center">
          <div class="flex items-end gap-4 mb-8">
            <!-- Rank 2 -->
            <div class="flex flex-col items-center w-full">
              <div
                class="podium-shadow podium-shadow--2 relative mb-[-30px] z-10"
              >
                <img
                  referrerpolicy="no-referrer"
                  crossorigin="anonymous"
                  :src="topUsers[1]?.avatar_url || defaultUserAvatar"
                  :alt="topUsers[1]?.username"
                  class="w-24 h-24 rounded-full object-cover border-4 border-blue-400"
                />
                <div
                  class="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm"
                >
                  2
                </div>
              </div>
              <div
                class="bg-top10 backdrop-blur-sm border border-red-800/30 rounded-2xl px-6 pt-12 pb-4 min-w-[160px]"
              >
                <p class="text-white font-semibold text-center mb-1 text-sm">
                  {{ topUsers[1]?.username }}
                </p>
                <div class="flex items-center justify-center gap-1">
                  <Icon
                    name="material-symbols:star-shine-rounded"
                    class="text-yellow-400 text-sm"
                  />
                  <span class="text-white text-[16px]"
                    >{{ topUsers[1]?.total_points }} pts</span
                  >
                </div>
              </div>
            </div>

            <!-- Rank 1 -->
            <div class="flex flex-col items-center mb-10">
              <Icon
                name="material-symbols:crown"
                class="crown-icon text-5xl -mb-3 z-999"
              />
              <div
                class="podium-shadow podium-shadow--1 relative mb-[-50px] z-10"
              >
                <img
                  referrerpolicy="no-referrer"
                  crossorigin="anonymous"
                  :src="topUsers[0]?.avatar_url || defaultUserAvatar"
                  :alt="topUsers[0]?.username"
                  class="w-36 h-36 rounded-full object-cover border-4 border-yellow-400"
                />
                <div
                  class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-11 h-11 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg"
                >
                  1
                </div>
              </div>
              <div
                class="bg-top10 backdrop-blur-sm border border-red-800/30 rounded-2xl px-8 pt-16 pb-5 min-w-[200px]"
              >
                <p class="text-white font-bold text-center mb-1 text-base">
                  {{ topUsers[0]?.username }}
                </p>
                <div class="flex items-center justify-center gap-1">
                  <Icon
                    name="material-symbols:star-shine-rounded"
                    class="text-yellow-400"
                  />
                  <span class="text-white text-[16px]"
                    >{{ topUsers[0]?.total_points }} pts</span
                  >
                </div>
              </div>
            </div>

            <!-- Rank 3 -->
            <div class="flex flex-col items-center w-full">
              <div
                class="podium-shadow podium-shadow--3 relative mb-[-30px] z-10"
              >
                <img
                  referrerpolicy="no-referrer"
                  crossorigin="anonymous"
                  :src="topUsers[2]?.avatar_url || defaultUserAvatar"
                  :alt="topUsers[2]?.username"
                  class="w-24 h-24 rounded-full object-cover border-4 border-orange-400"
                />
                <div
                  class="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm"
                >
                  3
                </div>
              </div>
              <div
                class="bg-top10 backdrop-blur-sm border border-red-800/30 rounded-2xl px-6 pt-12 pb-4 min-w-[160px]"
              >
                <p class="text-white font-semibold text-center mb-1 text-sm">
                  {{ topUsers[2]?.username }}
                </p>
                <div class="flex items-center justify-center gap-1">
                  <Icon
                    name="material-symbols:star-shine-rounded"
                    class="text-yellow-400 text-sm"
                  />
                  <span class="text-white text-[16px]"
                    >{{ topUsers[2]?.total_points }} pts</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Ranks 4-10 Grid -->
        <div class="basis-1/2 min-w-0">
          <div class="grid grid-cols-1 gap-3">
            <div
              v-for="(user, index) in remainingUsers"
              :key="index"
              class="liquid-glass backdrop-blur-sm border border-slate-600/30 !rounded-xl !bg-gray-600 px-4 py-3 flex items-center gap-3"
            >
              <span class="text-white font-bold text-lg min-w-[24px]">{{
                index + 4
              }}</span>
              <img
                referrerpolicy="no-referrer"
                crossorigin="anonymous"
                :src="user?.avatar_url || defaultUserAvatar"
                :alt="user?.username"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div class="flex-1">
                <p class="text-white font-bold text-[16px]">
                  {{ user?.username }}
                </p>
              </div>
              <span class="text-white text-[16px]"
                >{{ user?.total_points }} pts</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Layout -->
    <div
      class="lg:hidden relative bg-cover bg-center bg-no-repeat rounded-[16px] overflow-hidden p-4"
      :style="{ backgroundImage: `url(${top10bgMobile})` }"
    >
      <div class="flex items-center justify-center gap-2 mb-6 lg:mb-8">
        <Icon
          name="material-symbols:crown"
          class="crown-icon text-2xl lg:text-3xl"
        />
        <h2 class="text-lg lg:text-xl font-bold text-white">
          Top 10 weekly interaction users
        </h2>
      </div>
      <!-- Top 3 Podium Mobile -->
      <div class="flex items-end justify-center gap-2 mb-6">
        <!-- Rank 2 -->
        <div class="flex flex-col items-center flex-1">
          <div class="podium-shadow podium-shadow--2 relative mb-[-20px] z-10">
            <img
              referrerpolicy="no-referrer"
              crossorigin="anonymous"
              :src="topUsers[1]?.avatar_url || defaultUserAvatar"
              :alt="topUsers[1]?.username"
              class="w-18 h-18 rounded-full object-cover border-3 border-blue-400"
            />
            <div
              class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xs"
            >
              2
            </div>
          </div>
          <div
            class="bg-top10 backdrop-blur-sm border border-red-800/30 rounded-xl px-1 pt-8 pb-2 w-full"
          >
            <p
              class="text-white font-semibold text-center mb-0.5 text-xs truncate"
            >
              {{ topUsers[1]?.username }}
            </p>
            <div class="flex items-center justify-center gap-1">
              <Icon
                name="material-symbols:star-shine-rounded"
                class="text-yellow-400 text-xs"
              />
              <span class="text-white text-xs"
                >{{ topUsers[1]?.total_points }} pts</span
              >
            </div>
          </div>
        </div>

        <!-- Rank 1 -->
        <div class="flex flex-col items-center flex-1 mb-5">
          <Icon
            name="material-symbols:crown"
            class="crown-icon text-3xl -mb-2 z-999"
          />
          <div class="podium-shadow podium-shadow--1 relative mb-[-30px] z-10">
            <img
              referrerpolicy="no-referrer"
              crossorigin="anonymous"
              :src="topUsers[0]?.avatar_url || defaultUserAvatar"
              :alt="topUsers[0]?.username"
              class="w-24 h-24 rounded-full object-cover border-3 border-yellow-400"
            />
            <div
              class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm"
            >
              1
            </div>
          </div>
          <div
            class="bg-top10 backdrop-blur-sm border border-red-800/30 rounded-xl px-1 pt-10 pb-2 w-full"
          >
            <p class="text-white font-bold text-center mb-0.5 text-sm truncate">
              {{ topUsers[0]?.username }}
            </p>
            <div class="flex items-center justify-center gap-1">
              <Icon
                name="material-symbols:star-shine-rounded"
                class="text-yellow-400 text-xs"
              />
              <span class="text-white text-sm"
                >{{ topUsers[0]?.total_points }} pts</span
              >
            </div>
          </div>
        </div>

        <!-- Rank 3 -->
        <div class="flex flex-col items-center flex-1">
          <div class="podium-shadow podium-shadow--3 relative mb-[-20px] z-10">
            <img
              referrerpolicy="no-referrer"
              crossorigin="anonymous"
              :src="topUsers[2]?.avatar_url || defaultUserAvatar"
              :alt="topUsers[2]?.username"
              class="w-18 h-18 rounded-full object-cover border-3 border-orange-400"
            />
            <div
              class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xs"
            >
              3
            </div>
          </div>
          <div
            class="bg-top10 backdrop-blur-sm border border-red-800/30 rounded-xl px-1 pt-8 pb-2 w-full"
          >
            <p
              class="text-white font-semibold text-center mb-0.5 text-xs truncate"
            >
              {{ topUsers[2]?.username }}
            </p>
            <div class="flex items-center justify-center gap-1">
              <Icon
                name="material-symbols:star-shine-rounded"
                class="text-yellow-400 text-xs"
              />
              <span class="text-white text-xs"
                >{{ topUsers[2]?.total_points }} pts</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Ranks 4-10 List Mobile -->
      <div class="space-y-2">
        <div
          v-for="(user, index) in remainingUsers"
          :key="index"
          class="liquid-glass backdrop-blur-sm border border-slate-600/30 !rounded-xl !bg-gray-600 px-3 py-2.5 flex items-center gap-3"
        >
          <span class="text-white font-bold text-sm min-w-[20px]">{{
            index + 4
          }}</span>
          <img
            referrerpolicy="no-referrer"
            crossorigin="anonymous"
            :src="user?.avatar_url || defaultUserAvatar"
            :alt="user?.username"
            class="w-9 h-9 rounded-full object-cover"
          />
          <div class="flex-1">
            <p class="text-white font-bold text-sm">{{ user?.username }}</p>
          </div>
          <span class="text-white text-xs">{{ user?.total_points }} pts</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import top10bg from "~/assets/images/BG_Top_10.png";
import top10bgMobile from "~/assets/images/BG_Top_10_Mobile.png";
import { useTop10 } from "#imports";
import defaultUserAvatar from "@/assets/images/default_user.png";

const { getTop10User } = useTop10();

const top10List = ref([]);

const topUsers = computed(() => top10List.value.slice(0, 3) || []);
const remainingUsers = computed(() => top10List.value.slice(3) || []);

onMounted(async () => {
  let res = await getTop10User();
  top10List.value = res;
});
</script>

<style scoped>
.top10-container {
  @apply w-full;
}

.podium-shadow {
  position: relative;
  isolation: isolate;
}

.podium-shadow::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 9999px;
  filter: blur(22px);
  z-index: -1;
  pointer-events: none;
  opacity: 0.95;
}
@media (max-width: 640px) {
  .podium-shadow::before {
    width: 150px;
    height: 150px;
    filter: blur(14px); /* ลด blur นิดนึง จะคมกว่า */
    opacity: 0.85;
  }
}

/* Rank 1: Gold */
.podium-shadow--1::before {
  background: radial-gradient(
    circle at center,
    rgba(255, 215, 0, 0.45) 0%,
    rgba(255, 215, 0, 0.22) 45%,
    rgba(255, 215, 0, 0) 75%
  );
}

/* Rank 2: Blue */
.podium-shadow--2::before {
  background: radial-gradient(
    circle at center,
    rgba(59, 130, 246, 0.45) 0%,
    rgba(59, 130, 246, 0.2) 45%,
    rgba(59, 130, 246, 0) 75%
  );
}

/* Rank 3: Orange */
.podium-shadow--3::before {
  background: radial-gradient(
    circle at center,
    rgba(249, 115, 22, 0.45) 0%,
    rgba(249, 115, 22, 0.2) 45%,
    rgba(249, 115, 22, 0) 75%
  );
}
</style>
