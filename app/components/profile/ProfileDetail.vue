<template>
  <UForm :state="preferences" class="w-full max-w-[600px] mx-auto space-y-4">

    <UFormField :label="$t('profile.profile_data.file')" :hint="$t('profile.profile_data.optional')">
      <UFileUpload
        v-model="selectedFile"
        class="w-full h-40" 
        accept=".pdf"
        :label="$t('profile.profile_data.file_placeholder')"
        :description="$t('profile.profile_data.file_description')"
      />
    </UFormField>

    <USeparator size="md" :label="$t('profile.profile_data.manual')" class="my-8"/>

    <UFormField 
      v-for="field in profileField" :key="field.name" :name="field.name" :label="$t(`profile.profile_data.${field.name}`)" :hint="$t('profile.profile_data.optional')"
    >
      <UTextarea 
        v-model="preferences[field.name]"
        class="w-full" 
        color="neutral"
        :placeholder="$t(`profile.profile_data.${field.name}_placeholder`)"
        :rows="3" 
      />
    </UFormField>

    <UButton class="mt-4 w-full justify-center liquid-glass bg-gradient cursor-pointer" @click="clickUpdateUserKnowledge">{{ $t('profile.save_change') }}</UButton>

  </UForm>
</template>

<script setup>
import { profileField } from '~/constants/profileField'
import { useUser } from '#imports';

const { useGetUserKnowledge, useUpdateUserKnowledge, useUploadKnowledgeFile } = useUser()
const { $toast } = useNuxtApp()

const max_file_size = 10 * 1024 * 1024 // 10MB
const userInfo = ref(null)
const selectedFile = ref(null)
const preferences = ref({
  name: "",
  hobby: "",
  color: "",
  food: "",
  animal: "",
  song: "",
  drink: "",
  movie: "",
  zodiac: "",
  collectibles: "",
  cartoon: "",
  sport: "",
})

onMounted(async () => {
  const user_info = JSON.parse(localStorage.getItem('user-info'))

  if (!user_info) {
    return navigateTo('/')
  }

  userInfo.value = user_info

  const response = await useGetUserKnowledge(user_info.user_id)
  preferences.value = response.preferences
})

const clickUpdateUserKnowledge = async () => {
  try {
    const trimmedProfile = Object.fromEntries(
      Object.entries(preferences.value).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    )

    await useUpdateUserKnowledge(userInfo.value.user_id, trimmedProfile)
    $toast.success('บันทึกข้อมูลสำเร็จ', '')
  } catch (error) {
    $toast.error($t('toast.something_wrong'), String(error))
  }
}

watch(selectedFile, async (newValue) => {
  if (newValue) {
    if (newValue.size > max_file_size) {
      $toast.error($t('toast.something_wrong'), $t('file_limit_10mb'))
      selectedFile.value = null
      return 
    }

    const response = await useUploadKnowledgeFile(newValue)

    preferences.value = response
    selectedFile.value = null
  }
})

</script>

<style scoped></style>