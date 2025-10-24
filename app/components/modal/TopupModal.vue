<template>
  <UModal 
    v-model:open="modalOpen"
    :ui="{
      content: 'max-w-[800px] bg-[radial-gradient(127.11%_127.11%_at_94.62%_-46.17%,rgba(152,4,4,0.18)_40%,rgba(0,0,0,0.18)_98.07%)]'
    }"
  >
    <UButton variant="none" class="w-full justify-center sm:w-fit liquid-glass">
      {{ "$" + (coin_balance ? coin_balance : "") }}
      <Icon
        :name="
          coin_balance !== null ? 'octicon:feed-plus-16' : 'eos-icons:loading'
        "
      />
    </UButton>

    <template #header>
      <div class="space-y-2">
        <p class="text-[24px] sm:text-[36px] font-semibold">{{ $t('payment.title') }}</p>
        <p class="text-[14px] opacity-[50%]">Starting from 1 Coin = 1 Message</p>
      </div>
    </template>
    <template #body>
      <UTabs
        v-model="selectTab"
        :items="tabItem"
        :ui="{
          tab: 'px-4 py-2 text-gray-500 hover:text-[#FDE824]',
          active: 'text-[#FDE824]',
          inactive: 'text-gray-500',
          indicator: 'liquid-glass bg-gradient',
        }"
      >
        <template #content="{ item }">
          <div
            v-if="item.key === 'package'"
            class="space-y-2 h-[524px] sm:h-[390px] overflow-y-scroll p-2"
          >
            <div 
              v-for="(packages, index) in topupPackageList"
              class="sm:flex justify-between rounded-[8px] p-4 sm:p-6 bg-[linear-gradient(314.28deg,rgba(40,40,40,0.72)_19.54%,rgba(56,56,56,0.72)_99.22%)]"
            >
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <img :src="CoinImg" alt="coin_image" class="w-6" />
                  <p class="text-[12px]">Starter Pack</p>
                  <UBadge v-show="index === 0" size="sm" color="neutral">Best Price</UBadge>
                </div>
                <div class="flex items-end gap-2">
                  <p class="font-semibold">{{ packages.notes.split("=")[1].split(" ")[1] }} Coins</p>
                  <p class="text-[14px] text-[#989898]">({{ Number(packages.max_amount) }} + {{ packages.notes.split("=")[1].split(" ")[1] - packages.max_amount }}) |</p>
                  <p class="text-[14px] text-[#34852A]">+{{ Math.round(((packages.notes.split("=")[1].split(" ")[1] - Number(packages.max_amount)) / Number(packages.max_amount) ) * 100) }}% Bonus</p>
                </div>
                <p class="text-[12px] text-[#989898]" :class="{ 'invisible': index !== 0}">Perfect for beginners to get started</p>
              </div>
              <div class="space-y-2 sm:space-y-4">
                <UButton 
                  :ui="{ label: 'text-white font-semibold' }" 
                  :label="`${packages.max_amount} ฿`"
                  @click="clickSelectPackage(packages.id)"
                  class="bg-cherri-gradient uhover w-full"
                />
                <p class="text-center text-[12px] text-[#989898]">{{ packages.rate }} Coins /THB</p>
              </div>
            </div>
            
          </div>
          <div
            v-else-if="item.key === 'coupon'"
            class="space-y-4 h-[400px] sm:h-[390px] overflow-y-scroll p-2"
          >
            <p class="flex items-center gap-2">
              <icon name="mdi:coupon-outline" />{{
                $t("payment.coupon.sub_title")
              }}
            </p>
            <UInput
              v-model="couponCode"
              class="w-full"
              :placeholder="$t('payment.coupon.placeholder')"
              color="neutral"
            />
            <UButton
              :disabled="couponCode === ''"
              class="w-[120px] justify-center liquid-glass bg-gradient cursor-pointer"
              @click="clickRedeemCoupon"
              >{{ $t("submit") }}</UButton
            >
          </div>
        </template>
      </UTabs>
    </template>
  </UModal>
</template>

<script setup>
import { usePayment } from "#imports";
import { useModal } from "#imports";
import CoinImg from "~/assets/images/coin.png"

const route = useRoute();
const {
  useGetHistoryPayment,
  useGetTopUpPackage,
  useSelectTopUpPackage,
  useRedeemCoupon,
} = usePayment();
const { isTopUpModalOpen } = useModal();

const isDemoMode = computed(() => route.path.startsWith("/demo"));
const modalOpen = computed({
  get: () => (isDemoMode.value ? false : isTopUpModalOpen.value),
  set: (value) => {
    if (!isDemoMode.value) {
      isTopUpModalOpen.value = value;
    }
  },
});

const props = defineProps({
  coin_balance: {
    type: Number,
  },
});

const userInfo = ref(null);
const topupPackageList = ref([]);
const selectTab = ref("0");
const couponCode = ref("");

const tabItem = computed(() => [
  { key: "package", label: $t("payment.package") },
  { key: "coupon", label: $t("payment.coupon.title") },
]);

onMounted(async () => {
  const user_info = JSON.parse(localStorage.getItem("user-info"));
  userInfo.value = user_info;

  const topupPackageData = await useGetTopUpPackage();
  topupPackageList.value = topupPackageData;
});

const clickSelectPackage = async (package_id) => {
  const response = await useSelectTopUpPackage(
    userInfo.value.user_id,
    package_id
  );
  if (response) {
    navigateTo(`${response[0].data.paymentLink}`, { external: true });
  }
};

const clickRedeemCoupon = async () => {
  const response = await useRedeemCoupon(
    userInfo.value.user_id,
    couponCode.value
  );
  if (response) {
    couponCode.value = "";
  }
};
</script>

<style scoped></style>
