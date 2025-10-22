<template>
  <UModal
    v-model:open="isPdpaModalOpen"
    :dismissible="false"
    :ui="{ 
      header: 'bg-[linear-gradient(314.28deg,#20333D_19.54%,#1D2C34_99.22%)]',
      content: 'max-w-[900px] bg-black',
    }"
  >
    <template #header>
      <div class="space-y-2">
        <p class="text-[18px] sm:text-[36px] font-bold sm:leading-12">โปรดอ่านและยอมรับ ‘นโยบายความเป็นส่วนตัว’ และ ‘เงื่อนไขการให้บริการ’</p>
        <p class="hidden sm:block text-[14px] opacity-[50%]">เราได้อัปเดตนโยบายความเป็นส่วนตัวและเงื่อนไขการให้บริการของแอป เพื่อให้สอดคล้องกับการพัฒนาแอปและการให้บริการที่ดีขึ้น เราได้ทำการปรับปรุงนโยบายความเป็นส่วนตัวและเงื่อนไขการให้บริการกรุณาอ่านและยอมรับก่อนใช้งาน</p>
        <p class="text-[12px] opacity-[50%]">ปรับปรุงล่าสุด: 26 กรกฎาคม 2568</p>
      </div>
    </template>
    <template #body> 
      <div class="relative">
        <div ref="scrollContainer" @scroll="handleScroll" class="h-[500px] overflow-y-scroll px-2 space-y-2 sm:space-y-4">
          <p class="font-semibold text-center sm:text-lg">นโยบายความเป็นส่วนตัว (CherriChat)</p>
          <div v-for="(item) in pdpaContent" class="mb-2 text-sm sm:mb-4 sm:text-base">
            <p>{{ item.title }}</p>
            <p class="whitespace-pre-line ">{{ item.content }}</p>
          </div>

          <div class="bg-[#2D2D2D] rounded-lg px-6 py-4 space-y-4">
            <UCheckbox :ui="{ base: 'bg-white' }" v-model="form.isOver18" label="ฉันอายุ 18 ปีขึ้นไป" required color="secondary" size="lg" />
            <UCheckbox :ui="{ base: 'bg-white' }" v-model="form.acceptedPrivacyPolicy" label="ฉันยอมรับนโยบายความเป็นส่วนตัว" required color="secondary" size="lg" />
            <UCheckbox :ui="{ base: 'bg-white' }" v-model="form.acceptedTerms" label="ฉันยอมรับข้อกำหนดการใช้งาน" required color="secondary" size="lg" />
          </div>
          <div class="text-xs sm:text-sm text-[#4A4A4A]">
            <p>การยอมรับนี้แสดงว่าคุณ:</p>
            <ul class="ml-4 list-disc">
              <li>มีอายุ 18 ปีขึ้นไป</li>
              <li>ได้อ่านและยอมรับ ข้อกำหนดการใช้งาน และนโยบายความเป็นส่วนตัว</li>
            </ul>
          </div>
          <UButton @click="clickClosePdpaModal" :disabled="!isFormValid" block size="lg" class="text-white cursor-pointer bg-cherri-gradient" :class="{ 'uhover': isFormValid }">ยืนยันและยอมรับ</UButton>
        </div>

        <Transition
            enter-active-class="transition-opacity duration-200"
            leave-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
          >
          <UButton
            v-if="showScrollButton"
            @click="scrollToBottom"
            class="absolute p-2 text-black transition-all duration-200 rounded-full shadow-lg cursor-pointer bottom-4 right-4 bg-white/90 hover:bg-white hover:scale-110"
            color="neutral"
            icon="stash:arrow-down-solid"
            aria-label="scroll-to-bottom"
          />
        </Transition>
      </div>
    </template>
  </UModal>
</template>

<script setup>
import { useModal } from '#imports';
import { pdpaContent } from '~/constants/pdpaContent'

const { isPdpaModalOpen, onOpenPdpaModal, onClosePdpaModal } = useModal();
const { updateUserField } = useUser();

const userInfo = useCookie('user-info')
const form = ref({
  isOver18: false,
  acceptedPrivacyPolicy: false,
  acceptedTerms: false,
})
const scrollContainer = ref(null)
const showScrollButton = ref(true)

const isFormValid = computed(() =>
  form.value.isOver18 &&
  form.value.acceptedPrivacyPolicy &&
  form.value.acceptedTerms
)

onMounted(() => {
  if (userInfo.value && !userInfo.value?.pdpa_consent) {
    onOpenPdpaModal()
  }
})

const clickClosePdpaModal = async () => {
  await updateUserField({
    user_id: userInfo.value.user_id,
    column: "pdpa_consent",
    value: true,
  });

  onClosePdpaModal();  
}

const scrollToBottom = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      top: scrollContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  if (scrollContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value
    showScrollButton.value = scrollHeight - scrollTop - clientHeight > 50
  }
}

</script>

<style scoped></style>