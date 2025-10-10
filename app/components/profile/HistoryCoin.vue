<template>
  <div class="w-full mx-auto space-y-2 bg-[#1F272F] p-4 sm:p-8 rounded-[20px]">
    <p class="text-sm sm:text-base opacity-60">From quick questions to deep chats CherriChat keeps it yours</p>
    <div class="text-end space-x-2">
      <USelect v-model="day" :items="dayItems" variant="outline" color="neutral" class="w-40"/>
      <USelect v-model="transactionType" :items="transactionTypeItem" variant="outline" color="neutral" class="w-40"/>
    </div>
    
    <div v-if="historyPaymentList.length === 0 && !hasMore" class="h-full flex justify-center items-center">
      <p class="text-[#9898A2] h-full flex justify-center items-center">{{ $t('payment.no_use_coin') }}</p>
    </div>
    <div
      v-else
      v-for="(history, index) in historyPaymentList" :key="index"
      class="text-[#0F172B] p-4 border rounded-md flex items-center bg-[#14191F]"
    >
      <div class="rounded-full h-[40px] w-[40px] flex justify-center items-center">
        <Icon 
          :name="Number(history.balance_after) > Number(history.balance_before) ? 'ic:twotone-save-alt' : 'iconoir:coin'"
          class="w-[28px] h-[28px]"
          :class="Number(history.balance_after) > Number(history.balance_before) ? 'text-green-600' : 'text-red-600'"
        />
      </div>
      <div class="flex-1 ml-4">
        <p class="text-white">{{ history.description ?? '-' }}</p>
        <p class="text-sm text-gray-500">{{ useFormattedDateTime(history.created_at) }}</p>
      </div>
      <div class="text-end">
        <p class="flex items-center gap-2" :class="Number(history.balance_after) > Number(history.balance_before) ? 'text-green-600' : 'text-red-600'">{{ Number(history.balance_after) > Number(history.balance_before) ? '+' : '-' }} {{ history.amount }}<img :src="CoinImg" alt="coin_image" class="w-4" /></p>
      </div>
    </div>
    <InfiniteLoading @infinite="getHistoryPayment">
      <template #spinner>
        <p class="text-center"><Icon name="eos-icons:loading" style="width: 28px; height: 28px" /></p class="text-center">
      </template>
      <template #complete><span></span></template>
    </InfiniteLoading>
  </div>
</template>

<script setup>
import { usePayment } from '#imports';
import { useFormat } from '#imports';
import InfiniteLoading from "v3-infinite-loading";
import CoinImg from "~/assets/images/coin.png"

const { useGetHistoryPayment } = usePayment()
const { useFormattedDateTime } = useFormat()

const day = ref('Today')
const dayItems = ref([
  {
    label: "Today",
    value: "today",
  },
  { 
    label: "Yesterday",
    value: "yesterday",
  },
])
const transactionType = ref('Type')
const transactionTypeItem = ref([
  {
    label: "Type",
    value: "all",
  },
  {
    label: "Free Credit",
    value: "free credit",
  }
])
const userInfo = ref(null)
const historyPaymentList = ref([])
const hasMore = ref(true)
let historyPaymentPage = 1
let perPage = 10

onMounted(async () => {
  const user_info = JSON.parse(localStorage.getItem('user-info'))
  userInfo.value = user_info
})

const getHistoryPayment = async ($state) => {
  const response = await useGetHistoryPayment(userInfo.value.user_id, historyPaymentPage, perPage)
  const hasRealData = Array.isArray(response.data) && response.data.some(item => Object.keys(item).length > 0)

  if (hasRealData) {
    historyPaymentList.value.push(...response.data)
    historyPaymentPage++
    $state.loaded()
  } else {
    hasMore.value = false
    $state.complete()
  }
}

</script>

<style scoped></style>