<template>
  <UContainer class="my-8">
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <UAvatar :text="avatarString" size="3xl" />
        <span class="text-xl font-bold">{{ userInfo?.username }}</span>
      </div>
      <div class="flex gap-8 text-sm">
        <p class="cursor-pointer" :class="{'text-[#9898A2]': state !== 1}" @click="clickState(1)">{{ $t('profile.profile_data.title') }}</p>
        <p class="cursor-pointer" :class="{'text-[#9898A2]': state !== 2}" @click="clickState(2)">{{ $t('profile.creator') }}</p>
        <p class="cursor-pointer" :class="{'text-[#9898A2]': state !== 3}" @click="clickState(3)">{{ $t('profile.transaction') }}</p>
        <p class="cursor-pointer" :class="{'text-[#9898A2]': state !== 4}" @click="onSignout()">{{ $t('navbar.sign_out') }}</p>
      </div>
    </div>

    <USeparator color="error" size="sm" class="mt-4 mb-8" />

    <div>
      <ProfileDetail v-show="state === 1"/>
      <Creator v-show="state === 2" :userInfo="userInfo"/>
      <HistoryCoin v-show="state === 3"/>
    </div>
  </UContainer>
</template>

<script setup>
import { USeparator } from '#components'
import ProfileDetail from '~/components/profile/ProfileDetail.vue'
import HistoryCoin from '~/components/profile/HistoryCoin.vue'
import Creator from '~/components/profile/Creator.vue'

definePageMeta({
  layout: "signin",
})

const userInfo = ref(null)
const avatarString = ref("")
const state = ref(1)
const { signout } = useAuth()

onMounted(() => {
  const user_info = JSON.parse(localStorage.getItem('user-info'))

  if (!user_info) {
    return navigateTo('/')
  }

  userInfo.value = user_info
  avatarString.value = user_info.username[0].toUpperCase()
 })

const clickState = (index) => {
  state.value = index
}

const onSignout = async () => {
  const currentUserInfo = userInfo.value
    const response = await signout(currentUserInfo?.user_id)
    if (response) {
      localStorage.removeItem('user-info')
      const normalCookie = useCookie('user-info')
      normalCookie.value = null
      window.location.reload();
    }
}

</script>

<style scoped></style>