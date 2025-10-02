<template>
  <UContainer>
    <div class="max-w-[400px] mx-auto space-y-6">
      <div class="my-16 text-center">
        <p class="text-2xl font-bold">{{ $t('app_name') }} <span class="text-sm font-normal text-[#9898A2]">(DEMO)</span></p>
        <p class="text-[#9898A2]">{{ $t('signin') }}</p>
      </div>

      <UButton class="justify-center w-full" icon="flat-color-icons:google" color="neutral" @click="onSigninGoogle">Sign in with Google</UButton>

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

        <UButton type="submit" class="w-full justify-center bg-gradient-to-r from-[#FDE824] to-[#FDE824] text-black hover:opacity-90" disabled>{{ $t('signin') }}</UButton>

        <p class="text-end text-xs text-[#9898A2]">{{ $t('dont_have_account') }} <span class="underline">{{ $t('create_account' )}}</span></p>
      </UForm>
    </div>
  </UContainer>
</template>

<script setup>
import { useAuth } from '#imports';

useHead({
  title: "cherrichat - sign in (DEMO)",
  meta: [
    {
      name: "Chat with ai character",
      content:
        "Chat with many character - Demo version",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});
definePageMeta({
  layout: 'signin'
})

const route = useRoute();
const { signinDemo } = useAuth();
const { $toast } = useNuxtApp()

const form = ref({
  username: '',
  password: '',
})

onMounted(() => {
  if (route?.query?.error === "suspended") {
    $toast.error($t('toast.something_wrong'), $t('account_suspended'))
    navigateTo('/demo/signin')
  }

  const user_info = localStorage.getItem('user-info')
  if (user_info) {
    navigateTo('/demo')
  }
})

const onSigninGoogle = async () => {
  const res = await signinDemo();
  // Add demo parameter to OAuth URL to identify demo mode callback
  const oauthUrl = new URL(res.oauth_url);
  oauthUrl.searchParams.set('demo', 'true');
  navigateTo(oauthUrl.toString(), { external: true })
}

</script>

<style scoped></style>