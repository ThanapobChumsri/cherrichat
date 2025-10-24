<template>
  <div class="flex min-h-screen">
    <div 
      class="sm:w-1/2 hidden sm:block bg-cover bg-center"
      :style="{ backgroundImage: `url(${authCover})` }"
    >
      <div class="mx-auto sm:mx-0 sm:pl-32 py-44">
        <Icon name="gridicons:chat" class="w-[90px] h-[90px]"/>
        <h2 class="text-[44px]/[64px] xl:text-[48px]/[64px] font-bold text-balance">{{ $t('signin_p.tagline_1') }} <br>{{ $t('app_name') }}</h2>
        <h3 class="text-[24px] text-balance">{{ $t('signin_p.tagline_2') }} <br>{{ $t('signin_p.tagline_3') }}</h3>
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
        <p class="text-[24px] sm:text-[32px] font-medium">{{ $t('signin_p.tagline_5') }}</p>
        <UButton block size="lg" class="p-2 border-[1px] border-[#333333] bg-black cursor-pointer" icon="flat-color-icons:google" variant="ghost" color="neutral" :label="$t('signin_p.continue_google')" @click="onSigninGoogle"/>
        <USeparator :label="$t('or')" size="md" />
        <UForm 
          ref="formRef"
          :state="form" 
          :schema="schema"
          class="space-y-4 w-full"
          @submit="onSignup"
        >
          <UFormField :label="$t('email')" name="email">
            <UInput 
              v-model="form.email"
              class="w-full border-[1px] border-[#333333]"
              size="lg"
              color="neutral"
              variant="ghost"
            />
          </UFormField>
          <UFormField :label="$t('password')" name="password">
            <UInput 
              v-model="form.password"
              class="w-full border-[1px] border-[#333333]"
              size="lg"
              color="neutral"
              variant="ghost"
              type="password"
            />
          </UFormField>
          <UFormField :label="$t('confirm_password')" name="confirm_password">
            <UInput 
              v-model="form.confirm_password"
              class="w-full border-[1px] border-[#333333]"
              size="lg"
              color="neutral"
              variant="ghost"
              type="password"
            />
          </UFormField>
          <div id="signup-recaptcha" class="w-full"></div>
          <p v-if="showRecaptchaNotice" class="text-xs text-[#94A3B8]">
            {{ $t('recaptcha_disclaimer') }}
          </p>
          <UButton
            type="submit"
            class="w-full justify-center liquid-glass bg-gradient"
            :loading="submitting"
            :disabled="submitting"
          >
            {{ $t('signup') }}
          </UButton>
        </UForm>
        <USeparator size="md" />
        <p class="text-center text-sm">{{ $t('have_account') }} <span class="underline cursor-pointer" @click="navigateTo('/signin')">{{ $t('signin' )}}</span></p>
        <p class="text-center text-sm underline cursor-pointer hover:text-[#94A3B8]" @click="navigateTo('/forgot-password')">{{ $t('forgot_password') }}?</p>
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
const { locale, t } = useI18n()
const runtimeConfig = useRuntimeConfig();

const recaptchaSiteKey = runtimeConfig.public.RECAPTCHA_SITE_KEY;

const form = ref({
  email: '',
  password: '',
  confirm_password: '',
})
const formRef = ref(null)
const submitting = ref(false)
const recaptchaWidgetId = ref(null)
const recaptchaToken = ref('')
const recaptchaReady = ref(false)
let recaptchaInitPromise

const showRecaptchaNotice = computed(() => Boolean(recaptchaSiteKey))

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
  if (submitting.value) {
    return
  }

  submitting.value = true

  if (process.client && recaptchaSiteKey) {
    const initialized = await initRecaptcha()
    if (initialized && window.grecaptcha && recaptchaWidgetId.value !== null) {
      try {
        window.grecaptcha.execute(recaptchaWidgetId.value)
        return
      } catch (error) {
        console.error('Failed to execute reCAPTCHA', error)
      }
    }
  }

  await submitSignup()
}

async function submitSignup () {
  try {
    const payload = { ...form.value }
    if (recaptchaToken.value) {
      payload.recaptcha_token = recaptchaToken.value
    }
    const response = await signup(payload)
    if (response) {
      navigateTo('/signin')
    }
  } finally {
    submitting.value = false
    resetRecaptcha()
  }
}

const onRecaptchaSuccess = async (token) => {
  recaptchaToken.value = token
  await submitSignup()
}

const onRecaptchaError = () => {
  resetRecaptcha()
  submitting.value = false
  $toast.error(t('toast.something_wrong'), t('recaptcha_failed'))
}

const onRecaptchaExpired = () => {
  resetRecaptcha()
  submitting.value = false
}

const initRecaptcha = () => {
  if (!process.client || !recaptchaSiteKey) {
    return Promise.resolve(false)
  }

  if (recaptchaReady.value) {
    return Promise.resolve(true)
  }

  if (recaptchaInitPromise) {
    return recaptchaInitPromise
  }

  recaptchaInitPromise = new Promise((resolve) => {
    const activate = (grecaptcha) => {
      if (!grecaptcha) {
        resolve(false)
        return
      }

      if (recaptchaReady.value) {
        resolve(true)
        return
      }

      try {
        recaptchaWidgetId.value = grecaptcha.render('signup-recaptcha', {
          sitekey: recaptchaSiteKey,
          size: 'invisible',
          callback: onRecaptchaSuccess,
          'error-callback': onRecaptchaError,
          'expired-callback': onRecaptchaExpired,
        })
        recaptchaReady.value = true
        resolve(true)
      } catch (error) {
        console.error('Failed to render reCAPTCHA', error)
        resolve(false)
      }
    }

    const handleReady = (grecaptcha) => {
      if (!grecaptcha) {
        resolve(false)
        return
      }

      try {
        grecaptcha.ready(() => activate(grecaptcha))
      } catch (error) {
        console.error('Failed to initialize reCAPTCHA', error)
        resolve(false)
      }
    }

    if (window.grecaptcha) {
      handleReady(window.grecaptcha)
      return
    }

    const scriptId = 'google-recaptcha-script'
    const existingScript = document.getElementById(scriptId)

    const onLoad = () => handleReady(window.grecaptcha)
    const onError = (error) => {
      console.error('Failed to load reCAPTCHA script', error)
      resolve(false)
    }

    if (existingScript) {
      existingScript.addEventListener('load', onLoad, { once: true })
      existingScript.addEventListener('error', onError, { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = onLoad
    script.onerror = onError
    document.head.appendChild(script)
  }).finally(() => {
    recaptchaInitPromise = null
  })

  return recaptchaInitPromise
}

const resetRecaptcha = () => {
  if (!process.client) {
    recaptchaToken.value = ''
    return
  }

  if (window.grecaptcha && recaptchaWidgetId.value !== null) {
    window.grecaptcha.reset(recaptchaWidgetId.value)
  }
  recaptchaToken.value = ''
}

onMounted(() => {
  if (process.client && recaptchaSiteKey) {
    initRecaptcha()
  }
})

</script>

<style scoped></style>
