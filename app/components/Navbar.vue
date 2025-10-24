<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 flex-1 px-1 py-2 sm:px-8 sm:py-4"
    :class="{'sm:left-20': userInfo?.user_id}"
  >
    <!-- Backdrop blur layer -->
    <div class="absolute inset-0 w-full glass-effect -z-10"></div>

    <div
      class="relative flex items-center justify-between h-[65px] rounded-xl bg-gradient shadow-blur sm:px-8 px-4"
    >
      <!-- Left: Logo -->
      <div
        class="flex items-center space-x-2 cursor-pointer"
        @click="onNavigateHome"
      >
        <img :src="logo" alt="" class="max-h-[40px]" />
      </div>

      <!-- Right: Menu -->
      <div class="flex items-center space-x-2 text-white sm:space-x-6">
        <div class="items-center hidden sm:flex">
          <UInput
            color="red"
            class="input-liquid-glass"
            :placeholder="$t('navbar.search_placeholder')"
            @keydown.enter.prevent="onSearch"
            v-model="search"
          >
            <template #leading>
              <Icon
                name="i-lucide-search"
                class="flex items-center w-6 text-white opacity-50"
              />
            </template>
          </UInput>
        </div>

        <ChangeLang />
        <TopupModal
          v-if="userInfo"
          class="cursor-pointer"
          :coin_balance="coin_balance"
        />

        <!-- Profile -->
        <div
          @click="onNavigateProfile"
          class="h-6 w-6 sm:h-10 sm:w-10 bg-[#DD344F] rounded-full cursor-pointer"
        >
          <Icon
            name="tdesign:user-circle-filled"
            class="w-6 h-6 sm:w-full sm:h-full"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import logo from "@/assets/images/logo.png";
import ChangeLang from "./ChangeLang.vue";
import TopupModal from "./modal/TopupModal.vue";
import { usePayment } from "#imports";
import { useAuth } from "#imports";
import { useSearchBus } from "#imports";

const search = ref("");
const searchBus = useSearchBus();
const route = useRoute();
const { useGetWallet, coin_balance } = usePayment();
const { storeAuthData } = useAuth()

const userInfo = useCookie("user-info");

onMounted(() => {
  // if (route.query.user_id) {
  //   const user_info = {
  //     user_id: route.query.user_id,
  //     username: route.query.username,
  //     email: route.query.email,
  //     user_type: route.query.user_type,
  //   };

  //   storeAuthData(user_info)
  //   navigateTo("/");
  // } else {
    const user_info = JSON.parse(localStorage.getItem("user-info"));
    if (user_info) {
      if (!user_info.user_id || !user_info.username || !user_info.email) {
        localStorage.removeItem("user-info");
        // Don't redirect if we're already on a demo page - let user stay
        if (
          route.path !== "/" &&
          route.path !== "/landing" &&
          route.path !== "/signin"
        ) {
          return navigateTo("/");
        }
      }
    }
  // }
});

onMounted(async () => {
  watch(
    userInfo,
    async (newValue) => {
      if (newValue?.user_id) {
        await useGetWallet(newValue.user_id);
      }
    },
    { immediate: true }
  );
  watch(
    search,
    async (newValue) => {
      if (!newValue) {
        searchBus.emit(search.value);
      }
    },
    { immediate: true }
  );
});

const onNavigateHome = () => {
  navigateTo("/");
};

const onNavigateProfile = () => {
  navigateTo("/profile");
};

const onSearch = () => {
  searchBus.emit(search.value); // send search term to index
};
</script>

<style scoped>

.bg-gradient {
  border-radius: 16px;
  background: linear-gradient(271.93deg, #691a20 -18.01%, #d00000 96.17%)
      padding-box,
    linear-gradient(
        147.91deg,
        rgba(255, 255, 255, 0.6) 10%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 0.4) 90%
      )
      border-box;
  border: #691a20 1.5px solid transparent;
}

.shadow-blur {
  backdrop-filter: blur(70px);
}

:deep(.input-liquid-glass input) {
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

:deep(.input-liquid-glass input::placeholder) {
  color: white;
}
:deep(.input-liquid-glass .ring-accented) {
  --tw-ring-color: unset !important;
}
:deep(.input-liquid-glass .ring-accented) {
  --tw-ring-color: unset !important;
}
:deep(.input-liquid-glass .ring) {
  --tw-ring-shadow: unset !important;
}

.glass-effect {
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.02) 20%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter:
    blur(5px)
    contrast(1.1)
    brightness(1.1);
  -webkit-backdrop-filter:
    blur(5px)
    contrast(1.1)
    brightness(1.1);
  /* box-shadow removed to eliminate bottom border */
}

.glass-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  mask: linear-gradient(
    to top,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0.7) 60%,
    white 100%
  );
  -webkit-mask: linear-gradient(
    to top,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0.7) 60%,
    white 100%
  );
  pointer-events: none;
}
</style>
