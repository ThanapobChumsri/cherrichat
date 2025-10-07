<template>
  <UContainer>
    <div class="max-w-[400px] mx-auto space-y-6">
      <div class="text-center my-16">
        <p class="text-2xl font-bold">{{ $t('app_name') }}</p>
        <p class="text-[#9898A2]">{{ $t('signup') }}</p>
      </div>
      <UForm 
        :state="form" 
        :schema="schema"
        class="space-y-4"
        @submit="onSignup"
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

        <UFormField label="confirm password" name="confirm_password">
          <UInput 
            v-model="form.confirm_password"
            label="confirm password"
            placeholder="confirm password"
            class="w-full"
            size="lg"
            color="neutral"
            type="password"
          />
        </UFormField>

        <UButton type="submit" class="w-full justify-center liquid-glass bg-gradient">{{ $t('signup') }}</UButton>

        <p class="text-center text-xs text-[#9898A2]">{{ $t('have_account') }} <span class="underline cursor-pointer" @click="navigateTo('/signin')">{{ $t('signin' )}}</span></p>
      </UForm>

      <USeparator :label="$t('or')" size="md" />

      <UButton class="w-full justify-center" icon="flat-color-icons:google" color="neutral" @click="onSigninGoogle">Sign in with Google</UButton>
    </div>
  </UContainer>
</template>

<script setup>
import { useAuth } from '#imports';
import * as yup from 'yup'

definePageMeta({
  layout: 'signin'
})

const { signin, signup } = useAuth();
const { $toast } = useNuxtApp()

const form = ref({
  email: '',
  password: '',
  confirm_password: '',
})
const schema = yup.object({
  email: yup.string().required('กรุณากรอกอีเมล์').email('กรุณากรอกอีเมลให้ถูกต้อง'),
  password: yup.string().required('กรุณากรอกรหัสผ่าน').min(6, 'รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร'),
  confirm_password: yup.string().required('กรุณายืนยันรหัสผ่าน').oneOf([yup.ref('password')], 'รหัสผ่านไม่ตรงกัน'),
})

const onSigninGoogle = async () => {
  const res = await signin();
  navigateTo(`${res.oauth_url}`, { external: true })
}

const onSignup = async () => {
  await signup(form.value)
  navigateTo('/signin')
}

</script>

<style scoped></style>