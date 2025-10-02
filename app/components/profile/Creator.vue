<template>
  <div>
    <UForm v-if="status !== 'approved'" :state="form" class="w-full max-w-[600px] mx-auto space-y-4">
      <UFormField
        v-for="field in Object.keys(form)" :key="field" :name="field" :label="field"
      >
        <UTextarea
          v-model="form[field]"
          class="w-full"
          color="neutral"
          :placeholder="$t(`profile.creator_data.placeholder`)"
          :rows="3"
          :disabled="!isRegistrable"
        />
      </UFormField>

      <UButton v-if="isRegistrable" class="mt-4 w-full justify-center bg-gradient cursor-pointer liquid-glass" @click="clickRegisterCreator">{{ $t('profile.register_creator') }}</UButton>
      <UButton v-else class="mt-4 w-full justify-center" color="neutral" variant="subtle liquid-glass" disabled>{{ $t('pending_review') }}</UButton>
    </UForm>

    <div v-else>
      <div class="space-y-2">
        <div v-for="(key, index) in Object.keys(form)" :key="index" class="flex items-center">
          <p class="w-20 text-[#b7b7b9]">{{ key }}</p>
          <p>: {{ form[key] || "-" }}</p>
        </div>
      </div>
      <USeparator color="error" size="sm" class="mt-8 mb-8" />
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mb-8">
        <CharacterCard
          v-for="(character, index) in characterList"
          :key=index
          :data="character"
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { useUser } from '#imports';
import { useCharacter } from '#imports';

const { useRegisterCreator, useGetCreatorUser } = useUser()
const { getAllCharacter } = useCharacter()

const props = defineProps({
  userInfo: {
    type: Object,
  }
})

const form = ref({
  facebook: "",
  instagram: "",
  youtube: "",
})
const isRegistrable = ref(true)
const status = ref('')
const characterList = ref([]);

onMounted(async () => {
  watch(() => props.userInfo, async (newValue) => {
    const response = await useGetCreatorUser({ user_id: newValue.user_id})
  
    if (Object.keys(response).length > 0) {
      const merged = Object.fromEntries(
        Object.keys(form.value).map(key => [key, key in response ? (response[key] ?? "") : form.value[key]])
      )
      form.value = merged
      isRegistrable.value = response.status === 'rejected' ? true : false
      status.value = response.status
    }
  })
})

onMounted(async () => {
  watch(status, async (newValue) => {
    const response = await getAllCharacter({ page: 1, per_page: 100, is_active: true, created_by: props.userInfo.user_id})
    characterList.value = response.data;
  })
})

const clickRegisterCreator = async () => {
  const response = await useRegisterCreator({user_id: props.userInfo.user_id, ...form.value})
  if (Object.keys(response).length > 0) {
    isRegistrable.value = false  
    status.value = 'pending'
  }
}

</script>

<style scoped></style>