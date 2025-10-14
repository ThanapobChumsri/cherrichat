<template>
  <div class="flex min-h-screen">
    <div 
      class="sm:w-1/2 hidden sm:block bg-cover bg-center"
      :style="{ backgroundImage: `url(${authCover})` }"
    >
      <div class="mx-auto sm:mx-0 sm:pl-32 py-44">
        <Icon name="gridicons:chat" class="w-[90px] h-[90px]"/>
        <h2 class="text-[44px]/[64px] xl:text-[48px]/[64px] font-bold text-balance">Talk with <br>CherriChat</h2>
        <h3 class="text-[24px] text-balance">Experience intelligent conversations <br>designed to understand you better</h3>
      </div>
    </div>
    <div
      class="w-full sm:w-1/2 flex items-center justify-center"
      style="
        background: 
          linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent),
          radial-gradient(
            127.11% 127.11% at 94.62% -46.17%, 
            rgba(152, 4, 4, 0.51) 0%, 
            rgba(0, 0, 0, 0.51) 98.07%
          );
      "
    >
      <div class="w-[600px] p-8 space-y-8 flex flex-col items-center">
        <img :src="logo" alt="" class="max-h-[60px] sm:max-h-[80px] w-auto" />
        <p class="text-[24px] sm:text-[32px] font-medium">Create your account</p>
        <UButton block size="lg" class="p-2 border-[1px] border-[#333333] bg-black cursor-pointer" icon="flat-color-icons:google" variant="ghost" color="neutral" label="Continue with Google" @click="onSigninGoogle"/>
        <USeparator :label="$t('or')" size="md" />
        <UForm 
          ref="formRef"
          :state="form" 
          :schema="schema"
          class="space-y-4 w-full"
          @submit="onSignup"
        >
          <UFormField label="Email Address" name="email">
            <UInput 
              v-model="form.email"
              class="w-full border-[1px] border-[#333333]"
              size="lg"
              color="neutral"
              variant="ghost"
            />
          </UFormField>
          <UFormField label="Password" name="password">
            <UInput 
              v-model="form.password"
              class="w-full border-[1px] border-[#333333]"
              size="lg"
              color="neutral"
              variant="ghost"
              type="password"
            />
          </UFormField>
          <UFormField label="Confirm Password" name="confirm_password">
            <UInput 
              v-model="form.confirm_password"
              class="w-full border-[1px] border-[#333333]"
              size="lg"
              color="neutral"
              variant="ghost"
              type="password"
            />
          </UFormField>
          <UButton type="submit" class="w-full justify-center liquid-glass bg-gradient">{{ $t('signup') }}</UButton>
        </UForm>
        <USeparator size="md" />
        <p class="text-center text-sm">{{ $t('have_account') }} <span class="underline cursor-pointer" @click="navigateTo('/signin')">{{ $t('signin' )}}</span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '#imports';
import * as yup from 'yup'
import logo from "@/assets/images/logo.png";
import authCover from "@/assets/images/auth/auth-cover.jpg";

definePageMeta({
  layout: 'signin'
})

const { signin, signup } = useAuth();
const { $toast } = useNuxtApp()
const { locale } = useI18n()

const form = ref({
  email: '',
  password: '',
  confirm_password: '',
})
const formRef = ref(null)

const schema = computed(() => {
  return yup.object({
    email: yup.string().required($t('enter_email')).email($t('validate_email')),
    password: yup.string().required($t('enter_password')).min(6, $t('password_must_6')),
    confirm_password: yup.string().required($t('enter_confirm_password')).oneOf([yup.ref('password')], $t('password_not_match')),
  })
})

watch(locale, async () => {
  await nextTick()
  if (formRef.value && Object.keys(formRef.value.errors).length > 0) {
    const name = formRef.value.errors.map(e => e.name)
    try {
      await formRef.value.validate({ name: name })
    } catch (error) {
    }
  }
})

const onSigninGoogle = async () => {
  const res = await signin();
  navigateTo(`${res.oauth_url}`, { external: true })
}

const onSignup = async () => {
  const response = await signup(form.value)
  if (response) {
    navigateTo('/signin')
  }
}

</script>

<style scoped></style>