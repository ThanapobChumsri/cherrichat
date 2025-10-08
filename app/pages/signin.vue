<template>
  <UContainer>
    <div class="max-w-[400px] mx-auto space-y-6">
      <div class="text-center my-16">
        <p class="text-2xl font-bold">{{ $t('app_name') }}</p>
        <p class="text-[#9898A2]">{{ $t('signin') }}</p>
      </div>
      <UForm 
        :state="form" 
        :schema="schema"
        class="space-y-4"
        @submit="onSigninRegister"
      >
        <UFormField label="email" name="email">
          <UInput 
            v-model="form.email"
            label="email"
            placeholder="email"
            class="w-full"
            size="lg"
            color="neutral"
          />
        </UFormField>
        
        <UFormField label="password" name="password">
          <UInput 
            v-model="form.password"
            label="password"
            placeholder="password"
            class="w-full"
            size="lg"
            color="neutral"
            type="password"
          />
        </UFormField>

        <UButton type="submit" class="w-full justify-center liquid-glass bg-gradient">{{ $t('signin') }}</UButton>

        <p class="text-center text-xs text-[#9898A2]">{{ $t('dont_have_account') }} <span class="underline cursor-pointer" @click="navigateTo('/signup')">{{ $t('signup' )}}</span></p>
      </UForm>

      <USeparator :label="$t('or')" size="md" />

      <UButton class="w-full justify-center" icon="flat-color-icons:google" color="neutral" @click="onSigninGoogle">Sign in with Google</UButton>
    </div>
  </UContainer>
</template>

<script setup>
import { useAuth } from '#imports';
import * as yup from 'yup'

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
const { signin, signinRegister, storeAuthData } = useAuth();
const { $toast } = useNuxtApp()

const form = ref({
  email: '',
  password: '',
})

const schema = computed(() => {
  return yup.object({
    email: yup.string().required($t('enter_email')),
    password: yup.string().required($t('enter_password')),
  })
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

const onSigninRegister = async () => {
  try {
    const response = await signinRegister(form.value)
    
    storeAuthData(response)
    navigateTo('/')
  } catch (error) {

  }
  
}

const onSigninGoogle = async () => {
  const res = await signin();
  navigateTo(`${res.oauth_url}`, { external: true })
}

</script>

<style></style>