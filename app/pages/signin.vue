<template>
  <UContainer>
    <div class="max-w-[400px] mx-auto space-y-6">
      <div class="text-center my-16">
        <p class="text-2xl font-bold">{{ $t('app_name') }}</p>
        <p class="text-[#9898A2]">{{ $t('signin') }}</p>
      </div>
      
      <UButton class="w-full justify-center" icon="flat-color-icons:google" color="neutral" @click="onSigninGoogle">Sign in with Google</UButton>
      
      <USeparator :label="$t('or')" size="md" />

      <UForm 
        :state="form" 
        class="space-y-4"
      >
        <UFormField label="username">
          <UInput 
          v-model="form.username"
          label="username"
          placeholder="username"
          class="w-full"
          size="lg"
          disabled
          />
        </UFormField>
        
        <UFormField label="password">
          <UInput 
          v-model="form.password"
          label="password"
          placeholder="password"
          class="w-full"
          size="lg"
          disabled
          />
        </UFormField>

        <UButton type="submit" class="w-full justify-center liquid-glass bg-gradient" disabled>{{ $t('signin') }}</UButton>

        <p class="text-end text-xs text-[#9898A2]">{{ $t('dont_have_account') }} <span class="underline">{{ $t('create_account' )}}</span></p>
      </UForm>
    </div>
  </UContainer>
</template>

<script setup>
import { useAuth } from '#imports';

useHead({
  title: "cherrichat - sign in",
  meta: [
    {
      name: "Chat with ai character",
      content:
        "Chat with many character",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});
definePageMeta({
  layout: 'signin'
})

const route = useRoute();
const { signin } = useAuth();
const { $toast } = useNuxtApp()

const form = ref({
  username: '',
  password: '',
})

onMounted(() => {
  if (route?.query?.error === "suspended") {
    $toast.error($t('toast.something_wrong'), $t('account_suspended'))
    navigateTo('/signin')
  }

  const user_info = localStorage.getItem('user-info')
  if (user_info) {
    navigateTo('/')
  }
})

const onSigninGoogle = async () => {
  const res = await signin();
  navigateTo(`${res.oauth_url}`, { external: true })
}

</script>

<style></style>