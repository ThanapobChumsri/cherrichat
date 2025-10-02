<template>
  <div class="w-full max-w-[600px] mx-auto space-y-2">
    <div v-if="historyPaymentList.length === 0 && !hasMore" class="h-full flex justify-center items-center">
      <p class="text-[#9898A2] h-full flex justify-center items-center">{{ $t('payment.no_use_coin') }}</p>
    </div>
    <div
      v-else
      v-for="(history, index) in historyPaymentList" :key="index"
      class="text-[#0F172B] p-4 border rounded-md flex items-center bg-white"
    >
      <div class="bg-gray-100 rounded-full h-[40px] w-[40px] flex justify-center items-center">
        <Icon 
          :name="Number(history.balance_after) > Number(history.balance_before) ? 'ic:twotone-save-alt' : 'iconoir:coin'"
          class="w-[28px] h-[28px]"
          :class="Number(history.balance_after) > Number(history.balance_before) ? 'text-green-600' : 'text-red-600'"
        />
      </div>
      <div class="flex-1 ml-4">
        <p>{{ history.description ?? '-' }}</p>
        <p class="text-sm text-gray-500">{{ useFormattedDateTime(history.created_at) }}</p>
      </div>
      <div class="text-end">
        <p class="flex items-center gap-2">{{ Number(history.balance_after) > Number(history.balance_before) ? '+' : '-' }} {{ history.amount }}<Icon name="fluent-emoji-flat:coin"/></p>
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

const { useGetHistoryPayment } = usePayment()
const { useFormattedDateTime } = useFormat()

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