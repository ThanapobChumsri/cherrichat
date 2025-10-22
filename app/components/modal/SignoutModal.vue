<template>
  <UModal
    v-model:open="isSignoutModalOpen"
    :ui="{ 
      header: 'justify-center',
      content: 'bg-black',
      footer: 'justify-center'
    }"
    title="Are you sure"
  >
    <template #header>
      <p>{{ $t('modal.signout.title') }}</p>
    </template>
    <template #body>
      <div>
        <p class="text-center">{{ $t('modal.signout.description') }}?</p>
      </div>
    </template>
    <template #footer="{ close }">
        <UButton :label="$t('cancel')" class="uhover w-full" color="neutral" variant="outline" @click="close"/>
        <UButton :label="$t('submit')" class="bg-cherri-gradient text-white uhover w-full" @click="onSignout" loading-auto/>
    </template>
  </UModal>
</template>

<script setup>
import { useModal } from '#imports';

const props = defineProps({
  onSignout: {
    type: Function,
  }
})

const { isSignoutModalOpen } = useModal();

</script>

<style scoped></style>