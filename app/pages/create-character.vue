<template>
  <UContainer>
    <div class="max-w-[600px] mx-auto space-y-4 mb-4">
      <div class="text-center my-16">
        <p class="text-2xl font-bold">{{ $t('app_name') }}</p>
        <p class="text-[#9898A2]">{{ $t('create_character.create') }}</p>
      </div>

      <UForm
        :state="form"
        @submit="onGenerateCharacter"
        class="space-y-4"
      >
        <div class="text-xl font-bold">Prompt</div>
        <UTextarea 
          v-model="form.prompt" 
          class="w-full mr-2 max-w-[600px]" 
          :placeholder="$t('create_character.placeholder_prompt')" 
          :rows="4" 
          color="info"
          v-bind="textareaProps"
        />

        <div class="flex gap-4">
          <UButton class="flex-1 justify-center cursor-pointer liquid-glass bg-gradient" color="info" variant="subtle" @click="onGenerateCharacter">{{ $t('create_character.generate') }}</UButton>
          <UButton 
            class="flex-1  justify-center cursor-pointer liquid-glass" 
            :color="!characterData || !imageUrl ? 'neutral' : 'info'"
            @click="onCreateCharacter"  
            :disabled="!characterData || !imageUrl"
          >
            {{ $t('create_character.create') }}
          </UButton>
        </div>
      </UForm>

      <div class="space-y-4 sm:flex sm:gap-4">
        <div class="bg-[#27272B] flex-1 aspect-square border border-[#3F3F47] rounded-md">
          <img :src="imageUrl" class="w-full"/>
        </div>
        <div class="flex-1 flex items-center">
          <UButton 
            class="w-full justify-center cursor-pointer liquid-glass !bg-green-500" 
            :variant="!imageUrl ? 'solid' : 'subtle'"
            :color="!imageUrl ? 'neutral' : 'success'" 
            :disabled="!imageUrl"
            @click="onRefreshImage"
          >
            {{ $t('create_character.refresh_image') }}
        </UButton>
        </div>
      </div>

      <div
        v-if="characterData"
        class="bg-gray-900 text-[#94a3b8] p-4 rounded space-y-4"
      >
        <div
          v-for="(value, key) in characterData"
          :key="key"
          class="border-b border-gray-700 pb-2"
        >
          <!-- หัวข้อ -->
          <h2 class="text-lg font-bold text-white capitalize">
            {{ key }}
          </h2>

          <!-- ถ้า value เป็น object หรือ array -->
          <div v-if="typeof value === 'object' && value !== null">
            <ul class="list-disc list-inside ml-4">
              <li v-for="(subVal, subKey) in value" :key="subKey">
                <span class="font-semibold">{{ subKey }}:</span>
                <span>
                  <!-- เช็คถ้าเป็น object ซ้อน -->
                  <span v-if="typeof subVal === 'object'">
                    {{ JSON.stringify(subVal, null, 2) }}
                  </span>
                  <span v-else>
                    {{ subVal }}
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <!-- ถ้า value เป็นข้อความธรรมดา -->
          <p v-else>{{ value }}</p>
        </div>
      </div>

    </div>
  </UContainer>
</template>

<script setup>
  import { useNuxtui } from '#imports'
  import { useCharacter } from '#imports';

  definePageMeta({
    layout: 'signin'
  })

  const { useSubmitOnEnter } = useNuxtui();
  const { useGenerateCharacter, useGenerateCharacterImage, useCreateCharacter } = useCharacter();
  const { $toast } = useNuxtApp()

  const userInfo = ref(null)
  const form = ref({
    prompt: '',
  })
  const characterData = ref(null)
  const imageUrl = ref("")

  const textareaProps = useSubmitOnEnter(() => onGenerateCharacter())

  onMounted(() => {
    const user_info = JSON.parse(localStorage.getItem('user-info'))

    if (!user_info) {
      navigateTo('/signin')
    }

    userInfo.value = user_info
  })

  const onGenerateCharacter = async () => {
    if (form.value.prompt) {
      const characterResponse = await useGenerateCharacter(form.value.prompt, userInfo.value.user_id)

      if (characterResponse) {
        characterData.value = characterResponse.key
        await onRefreshImage()
      }
    }
  }

  const onRefreshImage = async () => {
    const imageResponse = await useGenerateCharacterImage(characterData.value.backstory, characterData.value.appearance, userInfo.value.user_id)

    if (imageResponse) {
      imageUrl.value = imageResponse.image_url
    }
  }

  const onCreateCharacter = async () => {
    await useCreateCharacter(characterData.value, imageUrl.value, userInfo.value.user_id)
    navigateTo('/')
  }
</script>

<style scoped></style>