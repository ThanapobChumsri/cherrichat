<template>
  <UModal :title="$t('payment.title')" v-model:open="modalOpen">
    <UButton variant="none" class="w-full justify-center sm:w-fit liquid-glass">
      {{ "$" + (coin_balance ? coin_balance : "") }}
      <Icon
        :name="
          coin_balance !== null ? 'octicon:feed-plus-16' : 'eos-icons:loading'
        "
      />
    </UButton>

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
            class="space-y-2 h-[400px] sm:h-[390px] overflow-y-scroll p-2"
          >
            <UCard
              v-for="(packages, index) in topupPackageList"
              :key="index"
              variant="solid"
              class="text-sm text-center cursor-pointer transition active:scale-99 hover:bg-gray-200"
              @click="clickSelectPackage(packages.id)"
            >
              <p>{{ packages.min_amount }} {{ $t("payment.bath") }}</p>
              <p class="flex justify-center items-center gap-2">
                {{ packages.notes }}<Icon name="fluent-emoji-flat:coin" />
              </p>
            </UCard>
          </div>

          <!-- <div v-else-if="item.key === 'history'" class="space-y-2 h-[400px] sm:h-[390px] overflow-y-scroll p-2">
            <div v-if="historyPaymentList.length === 0 && !hasMore" class="h-full flex justify-center items-center">
              <p class="text-sm text-[#9898A2] h-full flex justify-center items-center">{{ $t('payment.no_use_coin') }}</p>
            </div>
            <div
              v-else
              v-for="(history, index) in historyPaymentList" :key="index"
              class="text-sm text-[#0F172B] p-4 border rounded-md flex bg-white"
            >
              <Icon name="hugeicons:reverse-withdrawal-02" class="text-gray-500 w-[40px] h-[40px]"/>
              <div class="flex-1 ml-4">
                <p>{{ history.transaction_type }}</p>
                <p>{{ Number(history.balance_after) > Number(history.balance_before) ? '+' : '-' }} {{ history.amount }}</p>
              </div>
              <div class="text-end">
                <p class="text-gray-500">{{ useFormattedDateTime(history.created_at) }}</p>
                <p>{{ history.status }}</p>
              </div>
            </div>
            <InfiniteLoading @infinite="getHistoryPayment">
              <template #spinner>
                <p class="text-center"><Icon name="eos-icons:loading" style="width: 28px; height: 28px" /></p class="text-center">
              </template>
              <template #complete><span></span></template>
            </InfiniteLoading>
          </div> -->

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
const historyPaymentList = ref([]);
const selectTab = ref("0");
const couponCode = ref("");
const hasMore = ref(true);
let historyPaymentPage = 1;
let perPage = 10;

const tabItem = computed(() => [
  { key: "package", label: $t("payment.package") },
  // { key: "history", label: $t('payment.history') },
  { key: "coupon", label: $t("payment.coupon.title") },
]);

onMounted(async () => {
  const user_info = JSON.parse(localStorage.getItem("user-info"));
  userInfo.value = user_info;

  const historyPaymentData = await useGetHistoryPayment(
    userInfo.value.user_id,
    historyPaymentPage,
    perPage
  );
  historyPaymentList.value = historyPaymentData.data;
  historyPaymentPage++;

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

const getHistoryPayment = async ($state) => {
  const response = await useGetHistoryPayment(
    userInfo.value.user_id,
    historyPaymentPage,
    perPage
  );
  const hasRealData =
    Array.isArray(response.data) &&
    response.data.some((item) => Object.keys(item).length > 0);

  if (hasRealData) {
    historyPaymentList.value.push(...response.data);
    historyPaymentPage++;
    $state.loaded();
  } else {
    hasMore.value = false;
    $state.complete();
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
