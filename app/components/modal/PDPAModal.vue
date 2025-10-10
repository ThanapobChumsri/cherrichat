<template>
<UModal
  class="max-w-none"
  v-model:open="isPdpaModalOpen"
  :dismissible="false"
  :ui="{ 
    header: 'bg-[linear-gradient(314.28deg,#20333D_19.54%,#1D2C34_99.22%)]',
    content: 'w-[900px] bg-black',
  }"
>
  <template #header class="bg-red-100">
    <div class="space-y-2">
      <p class="text-[36px] font-bold leading-12">โปรดอ่านและยอมรับ ‘นโยบายความเป็นส่วนตัว’ และ ‘เงื่อนไขการให้บริการ’</p>
      <p class="text-[14px] opacity-[50%]">เราได้อัปเดตนโยบายความเป็นส่วนตัวและเงื่อนไขการให้บริการของแอป เพื่อให้สอดคล้องกับการพัฒนาแอปและการให้บริการที่ดีขึ้น เราได้ทำการปรับปรุง นโยบายความเป็นส่วนตัว และ เงื่อนไขการให้บริการ กรุณาอ่านและยอมรับก่อนใช้งาน ]</p>
      <p class="text-[12px] opacity-[50%]">ปรับปรุงล่าสุด: 26 กรกฎาคม 2568</p>
    </div>
  </template>
  <template #body> 
    <div class="h-[500px] overflow-y-scroll px-2 space-y-4">
      <p class="text-lg text-center font-semibold">นโยบายความเป็นส่วนตัว (CherriChat)</p>
      <div v-for="(item, index) in pdpaContent" class="mb-4">
        <p>{{ item.title }}</p>
        <p class="whitespace-pre-line">{{ item.content }}</p>
      </div>

      <div class="bg-[#2D2D2D] rounded-lg px-6 py-4 space-y-4">
        <UCheckbox :ui="{ base: 'bg-white' }" v-model="form.isOver18" label="ฉันอายุ 18 ปีขึ้นไป" required color="secondary" size="lg" />
        <UCheckbox :ui="{ base: 'bg-white' }" v-model="form.acceptedPrivacyPolicy" label="ฉันยอมรับนโยบายความเป็นส่วนตัว" required color="secondary" size="lg" />
        <UCheckbox :ui="{ base: 'bg-white' }" v-model="form.acceptedTerms" label="ฉันยอมรับข้อกำหนดการใช้งาน" required color="secondary" size="lg" />
      </div>
      <div class="text-[14px] text-[#4A4A4A]">
        <p>การยอมรับนี้แสดงว่าคุณ:</p>
        <ul class="list-disc ml-4">
          <li>มีอายุ 18 ปีขึ้นไป</li>
          <li>ได้อ่านและยอมรับ ข้อกำหนดการใช้งาน และนโยบายความเป็นส่วนตัว</li>
        </ul>
      </div>
      <UButton type="submit" @click="clickClosePdpaModal" :disabled="!isFormValid" block size="lg" class="liquid-glass bg-gradient cursor-pointer">ยืนยันและยอมรับ</UButton>
    </div>
  </template>
</UModal>
</template>

<script setup>
import { useModal } from '#imports';
import { pdpaContent } from '~/constants/pdpaContent'

const { isPdpaModalOpen, onClosePdpaModal } = useModal();

const form = ref({
  isOver18: false,
  acceptedPrivacyPolicy: false,
  acceptedTerms: false,
})

const isFormValid = computed(() =>
  form.value.isOver18 &&
  form.value.acceptedPrivacyPolicy &&
  form.value.acceptedTerms
)

const clickClosePdpaModal = () => {
  const isPdpaFirst = useCookie('pdpa-accept')
  isPdpaFirst.value = true
  onClosePdpaModal();  
}

</script>

<style scoped></style>