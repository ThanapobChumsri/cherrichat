<template>
  <UModal>
    <UButton variant="ghost" class="hover:bg-[#FDE824] text-white">เข้าสู่ระบบ</UButton>

    <template #content>
      <div class="h-40">
        <UButton icon="flat-color-icons:google" color="neutral" @click="onSigninGoogle">Sign in with Google</UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { useAuth } from '#imports';

const { signin } = useAuth();

const onSigninGoogle = async () => {
  const res = await signin();
  window.open(res.oauth_url, '_blank');
}

</script>

<style scoped></style>