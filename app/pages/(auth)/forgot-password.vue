<template>
  <div
    class="w-full min-h-screen flex items-center justify-center"
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
      <p class="text-[24px] sm:text-[32px] font-medium">{{ $t('forgot_password') }}</p>
      <p>{{ $t('reset_password_description') }}</p>
      <UForm 
        ref="formRef"
        :state="form" 
        :schema="schema"
        class="space-y-4 w-full"
        @submit="clickForgotPassword"
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
        <UButton type="submit" block size="lg" class="liquid-glass bg-gradient cursor-pointer" loading-auto>{{ $t('submit') }}</UButton>
      </UForm>
      <p class="text-center text-sm">{{ $t('have_account') }} <span class="underline cursor-pointer hover:text-[#94A3B8]" @click="navigateTo('/signin')">{{ $t('signin' )}}</span></p>
    </div>
  </div>
</template>

<script setup>
import logo from "@/assets/images/logo.png";
import * as yup from 'yup'

definePageMeta({
  layout: 'signin'
})

const { sendEmailForgotPassword } = useAuth()
const { locale } = useI18n()

const form = ref({
  email: '',
})
const formRef = ref(null)

const schema = computed(() => {
  return yup.object({
    email: yup.string().required($t('enter_email')).email($t('validate_email')),
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

const clickForgotPassword = async () => {
  const response = await sendEmailForgotPassword(form.value)
  if (response) {
    return navigateTo('/signin')
  }
}

</script>

<style scoped></style>