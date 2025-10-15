<template>
  <UModal
    v-model:open="isDailyLoginModalOpen"
    :dismissible="false"
    :ui="{
      header: 'justify-center',
      content: 'max-w-[800px] bg-black',
    }"
  >
    <template #header>
      <div class="space-y-2 flex flex-col items-center">
        <p class="text-[24px] sm:text-[36px] font-semibold">{{ $t('modal.daily_login.title') }} 🍒</p>
        <p class="text-[14px] opacity-[50%]">{{ $t('modal.daily_login.sub_title') }}</p>
      </div>
    </template>
    <template #body>
      <div class="space-y-4">
        <div class="flex justify-between">
          <div v-for="day in dailyList" class="space-y-2">
            <div 
              class="text-[24px] w-20 h-20 flex items-center justify-center rounded-full text-white font-semibold"
              :class="{ 
                'bg-[#1A1A1A]': dailyCounter.streak_day >= day.day,
                'bg-cherri/40 border-4 border-cherri': dailyCounter.streak_day + 1 === day.day,
                'bg-[#292929]': dailyCounter.streak_day < day.day
              }"
              style="border: linear-gradient(271.93deg, #691A20 -18.01%, #D00000 96.17%) 1;"
            >
              <p v-if="dailyCounter.streak_day < day.day">{{ day.day }}</p>
              <Icon v-else name="charm:tick" class="w-10 h-10 bg-cherri-gradient" />
            </div>
            <p class="text-center">+{{ day.coin }} coin</p>
          </div>
        </div>
        <img :src="CoinImage" alt="coin-image" class="w-32 mx-auto" />
        <p class="text-cherri text-[32px] font-semibold text-center">CHERRI COIN</p>
        <div class="flex gap-4 p-4 bg-cherri/16 rounded-[13px]">
          <img :src="CoinImage" alt="coin-image" class="w-12" />
          <div class="text-cherri">
            <p class="font-semibold">{{ $t('modal.daily_login.text_1') }}</p>
            <p class="text-[14px]">{{ $t('modal.daily_login.text_2') }}</p>
          </div>
        </div>
        <UButton class="bg-cherri-gradient text-white w-full uhover" size="lg" :label="$t('modal.daily_login.check_in')" @click="clickSendDailyLogin" loading-auto/>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { useModal } from '#imports';
import CoinImage from '~/assets/images/coin.png'

const { isDailyLoginModalOpen, onCloseDailyLoginModal, onOpenDailyLoginModal } = useModal();
const { getDailyLoginCounterById, getAllDailyLoginReward, sendDailyLogin } = useUser();
const { useIsSameDay } = useFormat();

const userInfo = ref({})
const dailyCounter = ref({})
const dailyList = ref([])

onMounted(async () => {
  userInfo.value = JSON.parse(localStorage.getItem('user-info'))
  if (!userInfo.value) return;

  dailyCounter.value = await getDailyLoginCounterById(userInfo.value)
  const dailyReward = await getAllDailyLoginReward()

  const latestLoginAt = new Date(dailyCounter.value.latest_login_at)
  const now = new Date()

  if (!useIsSameDay(now, latestLoginAt)) {
    if (dailyCounter.value.streak_day <= 3) {
      dailyList.value = dailyReward.slice(0, 7)
    } else {
      const index = dailyReward.findIndex(e => e.day === dailyCounter.value.streak_day)
      if (index > 2 && dailyReward.length - index >= 5) {
        dailyList.value = dailyReward.slice(index - 2, index + 5)
      } else {
        const last_coin = dailyReward[dailyReward.length - 1].coin
        for (let i = dailyCounter.value.streak_day - 2; i < dailyCounter.value.streak_day + 5; i++) {
          dailyList.value = [...dailyList.value, {day: i, coin: last_coin}]
        }
      }
    }

    onOpenDailyLoginModal()
  }
})

const clickSendDailyLogin = async () => {
  await sendDailyLogin(userInfo.value)

  onCloseDailyLoginModal()
}

</script>

<style scoped></style>