<template>
  <UContainer>
    <div class="max-w-[600px] mx-auto space-y-4 mb-4">
      <div class="mb-16 text-center">
        <p class="text-2xl font-bold">{{ $t("app_name") }}</p>
        <p class="text-[#9898A2]">{{ $t("create_character.create") }}</p>
      </div>

      <UForm
        :state="form"
        :schema="schema"
        @submit="onGenerateCharacter"
        class="space-y-4"
      >
        <!-- <div class="text-xl font-bold">Prompt</div>
        <UTextarea 
          v-model="form.prompt" 
          class="w-full mr-2 max-w-[600px]" 
          :placeholder="$t('create_character.placeholder_prompt')" 
          :rows="4" 
          color="info"
          v-bind="textareaProps"
        /> -->
        <UFormField :label="$t('create_character.name')" name="name">
          <UInput
            v-model="form.name"
            class="w-full mr-2 max-w-[600px]"
            :placeholder="$t('create_character.placeholder_name')"
            :rows="4"
            color="info"
          />
        </UFormField>
        <UFormField :label="$t('create_character.tagline')" name="tagline">
          <UInput
            v-model="form.tagline"
            class="w-full mr-2 max-w-[600px]"
            :placeholder="$t('create_character.placeholder_tagline')"
            :rows="4"
            color="info"
          />
        </UFormField>

        <UFormField
          :label="$t('create_character.description')"
          name="description"
        >
          <UTextarea
            v-model="form.description"
            class="w-full mr-2 max-w-[600px]"
            :placeholder="$t('create_character.placeholder_description')"
            :rows="4"
            color="info"
          />
        </UFormField>

        <UFormField :label="$t('create_character.greeting')" name="greeting">
          <UTextarea
            v-model="form.greeting"
            class="w-full mr-2 max-w-[600px]"
            :placeholder="$t('create_character.placeholder_greeting')"
            :rows="4"
            color="info"
          />
        </UFormField>

        <UFormField
          :label="$t('create_character.character_biography')"
          name="character_biography"
        >
          <UTextarea
            v-model="form.character_biography"
            class="w-full mr-2 max-w-[600px]"
            :placeholder="
              $t('create_character.placeholder_character_biography')
            "
            :rows="4"
            color="info"
          />
        </UFormField>

        <UFormField
          :label="$t('create_character.default_role_name')"
          name="default_role_name"
        >
          <UInput
            v-model="form.default_role_name"
            class="w-full mr-2 max-w-[600px]"
            :placeholder="$t('create_character.placeholder_default_role_name')"
            :rows="4"
            color="info"
          />
        </UFormField>

        <UFormField
          :label="$t('create_character.default_role_detail')"
          name="default_role_detail"
        >
          <UTextarea
            v-model="form.default_role_detail"
            class="w-full mr-2 max-w-[600px]"
            :placeholder="
              $t('create_character.placeholder_default_role_detail')
            "
            :rows="4"
            color="info"
          />
        </UFormField>

        <UFormField
          :label="$t('create_character.default_role_sounding')"
          name="sound_id"
        >
          <div class="role-voice-container">
            <DefaultRoleVoiceSelector
              v-model="form.sound_id"
            />
          </div>
        </UFormField>
        <div class="flex gap-4">
          <UButton
            class="justify-center flex-1 cursor-pointer liquid-glass bg-gradient"
            color="info"
            variant="subtle"
            type="submit"
            >{{ $t("create_character.generate") }}</UButton
          >
          <UButton
            class="justify-center flex-1 cursor-pointer liquid-glass"
            :color="!characterData || !imageUrl ? 'neutral' : 'info'"
            @click="onCreateCharacter"
            :disabled="!characterData || !imageUrl"
          >
            {{ $t("create_character.create") }}
          </UButton>
        </div>
      </UForm>

      <div class="space-y-4 sm:flex sm:gap-4">
        <div
          class="bg-[#27272B] flex-1 aspect-square border border-[#3F3F47] rounded-md"
        >
          <img :src="imageUrl" class="w-full" />
        </div>
        <div class="flex items-center flex-1">
          <UButton
            class="w-full justify-center cursor-pointer liquid-glass !bg-green-500"
            :variant="!imageUrl ? 'solid' : 'subtle'"
            :color="!imageUrl ? 'neutral' : 'success'"
            :disabled="!imageUrl"
            @click="onRefreshImage"
          >
            {{ $t("create_character.refresh_image") }}
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
          class="pb-2 border-b border-gray-700"
        >
          <!-- หัวข้อ -->
          <h2 class="text-lg font-bold text-white capitalize">
            {{ key }}
          </h2>

          <!-- ถ้า value เป็น object หรือ array -->
          <div v-if="typeof value === 'object' && value !== null">
            <ul class="ml-4 list-disc list-inside">
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
import { useNuxtui } from "#imports";
import { useCharacter } from "#imports";
import { object, string } from "yup";

const { useSubmitOnEnter } = useNuxtui();
const { useGenerateCharacter, useGenerateCharacterImage, useCreateCharacter } =
  useCharacter();
const { $toast } = useNuxtApp();

const userInfo = ref(null);
const form = reactive({
  prompt: "",
  name: "",
  tagline: "",
  description: "",
  greeting: "",
  character_biography: "",
  default_role_name: "",
  default_role_detail: "",
  sound_id: "",
});
const { $t } = useI18n();

const schema = object({
  name: string().required($t("create_character.validation.name_required")),
  tagline: string().required($t("create_character.validation.tagline_required")),
  description: string().required($t("create_character.validation.description_required")),
  greeting: string().required($t("create_character.validation.greeting_required")),
  sound_id: string().required($t("create_character.validation.voice_required")),
});
const characterData = ref(null);
const imageUrl = ref("");

onMounted(() => {
  const user_info = JSON.parse(localStorage.getItem("user-info"));

  if (!user_info) {
    navigateTo("/signin");
  }

  userInfo.value = user_info;
});

const onGenerateCharacter = async () => {
  let promptData = "";

  if (form.name) promptData += `Name: ${form.name}\n`;
  if (form.tagline) promptData += `Tagline: ${form.tagline}\n`;
  if (form.description) promptData += `Description: ${form.description}\n`;
  if (form.greeting) promptData += `Greeting: ${form.greeting}\n`;
  if (form.character_biography)
    promptData += `Character Biography: ${form.character_biography}\n`;
  if (form.default_role_name)
    promptData += `Default Role Name: ${form.default_role_name}\n`;
  if (form.default_role_detail)
    promptData += `Default Role Detail: ${form.default_role_detail}\n`;

  const characterResponse = await useGenerateCharacter(
    promptData,
    userInfo.value.user_id
  );

  if (characterResponse) {
    characterData.value = characterResponse.key;
    await onRefreshImage();
  }
};

const onRefreshImage = async () => {
  const imageResponse = await useGenerateCharacterImage(
    characterData.value.backstory,
    characterData.value.appearance,
    userInfo.value.user_id
  );

  if (imageResponse) {
    imageUrl.value = imageResponse.image_url;
  }
};

const onCreateCharacter = async () => {
  await useCreateCharacter(
    characterData.value,
    imageUrl.value,
    userInfo.value.user_id,
    form.sound_id
  );
  navigateTo("/");
};
</script>

<style scoped>
.role-voice-container {
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
}
</style>
