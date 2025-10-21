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
          <p class="sm:text-lg text-center font-semibold">นโยบายความเป็นส่วนตัว (CherriChat)</p>
          <div v-for="(item) in pdpaContent" class="mb-2 sm:mb-4 text-sm sm:text-base">
            <p>{{ item.title }}</p>
            <p class=" whitespace-pre-line">{{ item.content }}</p>
          </div>

          <div class="bg-[#2D2D2D] rounded-lg px-6 py-4 space-y-4">
            <UCheckbox :ui="{ base: 'bg-white' }" v-model="form.isOver18" label="ฉันอายุ 18 ปีขึ้นไป" required color="secondary" size="lg" />
            <UCheckbox :ui="{ base: 'bg-white' }" v-model="form.acceptedPrivacyPolicy" label="ฉันยอมรับนโยบายความเป็นส่วนตัว" required color="secondary" size="lg" />
            <UCheckbox :ui="{ base: 'bg-white' }" v-model="form.acceptedTerms" label="ฉันยอมรับข้อกำหนดการใช้งาน" required color="secondary" size="lg" />
          </div>
          <div class="text-xs sm:text-sm text-[#4A4A4A]">
            <p>การยอมรับนี้แสดงว่าคุณ:</p>
            <ul class="list-disc ml-4">
              <li>มีอายุ 18 ปีขึ้นไป</li>
              <li>ได้อ่านและยอมรับ ข้อกำหนดการใช้งาน และนโยบายความเป็นส่วนตัว</li>
            </ul>
          </div>
          <UButton @click="clickClosePdpaModal" :disabled="!isFormValid" block size="lg" class="bg-cherri-gradient text-white cursor-pointer" :class="{ 'uhover': isFormValid }">ยืนยันและยอมรับ</UButton>
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
            class="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-black cursor-pointer rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
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
const isPdpaFirst = useCookie("pdpa-accept");

const userInfo = ref({})
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
  userInfo.value = JSON.parse(localStorage.getItem('user-info'))
  if (userInfo.value && !isPdpaFirst.value) {
    onOpenPdpaModal()
  }
})

const clickClosePdpaModal = () => {
  const isPdpaFirst = useCookie('pdpa-accept')
  isPdpaFirst.value = true
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