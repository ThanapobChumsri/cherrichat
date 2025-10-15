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
      <p class="text-[24px] sm:text-[32px] font-medium">{{ $t('reset_password') }}</p>
      <p>{{ $t('for_email') }} {{ data.email }}</p>
      <UForm 
        ref="formRef"
        :state="form" 
        :schema="schema"
        class="space-y-4 w-full"
        @submit="clickResetPassword"
      >
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

const { getForgotPasswordOrder, updateUserPassword } = useAuth()
const route = useRoute();
const { locale } = useI18n()

const data = ref({})
const isExpired = ref(false)
const form = ref({
  password: '',
  confirm_password: '',
})
const formRef = ref(null)

const schema = computed(() => {
  return yup.object({
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

const { data: forgotOrder, error } = await useAsyncData('forgot-order', () =>
  getForgotPasswordOrder({ order_id: route.query.order_id })
)

if (!forgotOrder.value || forgotOrder.value.status !== 'pending') {
  await navigateTo('/')
} else {
  const expiredAt = new Date(forgotOrder.value.expired_at).getTime()
  const now = new Date().getTime()

  if (now > expiredAt) {
    isExpired.value = true
    // await navigateTo('/')
  }

  data.value = forgotOrder.value
}

const clickResetPassword = async () => {
  const response = await updateUserPassword({
    ...data.value,
    ...form.value
  })

  if (response) {
    return navigateTo('/signin')
  }
}

</script>

<style scoped></style>