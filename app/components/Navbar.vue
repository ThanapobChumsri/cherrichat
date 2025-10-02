<template>
  <header class="top-0 z-50 w-full sm:px-8 sm:py-4 px-1 py-2 fixed">
    <div
      class="flex items-center justify-between h-[65px] rounded-xl bg-gradient shadow-blur sm:px-8 px-8"
    >
      <!-- Left: Logo -->
      <div
        class="flex items-center space-x-2 cursor-pointer"
        @click="onNavigateHome"
      >
        <img :src="logo" alt="" class="max-h-[40px]" />
      </div>

      <!-- Right: Menu -->
      <div class="flex items-center sm:space-x-6 space-x-2 text-white">
        <div class="hidden sm:flex items-center">
          <UInput color="red" class="input-liquid-glass" placeholder="Search">
            <template #leading>
              <Icon
                name="i-lucide-search"
                class="text-white opacity-50 flex items-center w-6"
              />
            </template>
          </UInput>
        </div>

        <TopupModal
          v-if="userInfo"
          class="cursor-pointer"
          :coin_balance="coin_balance"
        />

        <!-- Profile -->
        <div @click="onNavigateProfile"  class="h-6 w-6 sm:h-10 sm:w-10 bg-[#DD344F] rounded-full cursor-pointer">
          <Icon
            name="tdesign:user-circle-filled"
            class="sm:w-full sm:h-full w-6 h-6"
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
import { UButton } from "#components";

const route = useRoute();
const { useGetWallet, useGetWalletDemo, coin_balance } = usePayment();
const { signout } = useAuth();

const userInfo = useCookie("user-info");

const mode = computed(() =>
  route.path.includes("/landing") ? "landing" : "homepage"
);
const isDemoMode = computed(() => route.path.startsWith("/demo"));

const dropdownItem = computed(() => [
  ...(userInfo.value
    ? [
        [
          { label: "username", preventClose: true },
          { label: "coin", icon: "fluent-emoji-flat:coin" },
        ],
      ]
    : []),
  [{ label: "language" }],
  ...(userInfo.value
    ? [[{ label: "navbar.sign_out", onSelect: () => onSignout() }]]
    : [[{ label: "navbar.sign_in", onSelect: () => onSignin() }]]),
]);

onMounted(() => {
  if (route.query.user_id) {
    const user_info = {
      user_id: route.query.user_id,
      username: route.query.username,
      email: route.query.email,
      user_type: route.query.user_type,
    };
    localStorage.setItem("user-info", JSON.stringify(user_info));

    const userInfoCookie = useCookie("user-info", {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      secure: true,
      sameSite: "lax",
    });
    userInfoCookie.value = user_info;

    // Check if we came from demo mode to redirect back to demo
    if (route.query.demo === "true" || route.path.startsWith("/demo")) {
      navigateTo("/demo");
    } else {
      navigateTo("/");
    }
  } else {
    const user_info = JSON.parse(localStorage.getItem("user-info"));

    if (user_info) {
      if (!user_info.user_id || !user_info.username || !user_info.email) {
        localStorage.removeItem("user-info");
        // Don't redirect if we're already on a demo page - let user stay
        if (
          !route.path.startsWith("/demo") &&
          route.path !== "/" &&
          route.path !== "/landing" &&
          route.path !== "/signin"
        ) {
          return navigateTo("/");
        }
      }
    }
  }
});

onMounted(async () => {
  watch(
    userInfo,
    async (newValue) => {
      if (newValue?.user_id) {
        if (isDemoMode.value) {
          await useGetWalletDemo(newValue.user_id);
        } else {
          await useGetWallet(newValue.user_id);
        }
      }
    },
    { immediate: true }
  );
});

const onNavigateHome = () => {
  if (isDemoMode.value) {
    navigateTo("/demo");
  } else {
    navigateTo("/");
  }
};

const onSignin = () => {
  if (isDemoMode.value) {
    navigateTo("/demo/signin");
  } else {
    navigateTo("/signin");
  }
};

const onSignout = async () => {
  if (isDemoMode.value) {
    // For demo mode, just clear local data without API call
    localStorage.removeItem("user-info");
    userInfo.value = null;
    window.location.reload();
  } else {
    const response = await signout(userInfo.value.user_id);
    if (response) {
      localStorage.removeItem("user-info");
      window.location.reload();
    }
    userInfo.value = null;
  }
};

const onNavigateProfile = () => {
  if (isDemoMode.value) {
    navigateTo("/demo/profile");
  } else {
    navigateTo("/profile");
  }
}
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
  box-shadow:
    inset 0 1px 2px rgba(255, 255, 255, 1),
    /* inner shadow ล่าง */
    inset 0 1px 2px rgba(255, 255, 255, 1),
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
</style>
