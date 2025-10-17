<template>
  <div class="mb-4 mx-4 sm:mx-16">
    <div class="p-4 sm:p-8 bg-[#1F272F] rounded-[20px] space-y-8">
      <h3 class="text-[18px] sm:text-[32px] font-bold">Setting</h3>

      <div class="space-y-2">
        <div>
          <p class="sm:text-[20px]">รูปแบบการแสดงผล</p>
          <p class="text-xs sm:text-sm text-white/60">ปรับแต่งวิธีการแสดงผลข้อความในแชท</p>
        </div>

        <div class="flex items-center justify-between">
          <div class="w-3/5">
            <p class="text-sm sm:text-base">ภาษา</p>  
            <p class="text-xs sm:text-sm text-white/60">เปลี่ยนภาษาแอปพลิเคชัน</p>
          </div>
          <ChangeLang />
        </div>

        <div class="flex items-center justify-between">
          <div class="w-3/5">
            <p class="text-sm sm:text-base">การแสดงผลแบบอ่านนิยาย</p>  
            <p class="text-sm text-white/60">เปลี่ยนรูปแบบการแสดงผลจากแบบธรรมดาเป็นแบบอ่านนิยาย</p>
          </div>
          <USwitch :ui="{ 'thumb': 'bg-white'}" size="lg" />
        </div>

        <div class="flex items-center justify-between">
          <div class="w-3/5">
            <p class="text-sm sm:text-base">พื้นหลังตัวละคร</p>  
            <p class="text-xs sm:text-sm text-white/60">ใช้รูปภาพตัวละครเป็นพื้นหลังแชท</p>
          </div>
          <USwitch :ui="{ 'thumb': 'bg-white'}" size="lg" />
        </div>
      </div>

      <div class="space-y-2">
        <div>
          <p class="sm:text-[20px]">ข้อความและบอลลูน</p>
          <p class="text-xs sm:text-sm text-white/60">ปรับแต่งขนาดตัวอักษรและความโปร่งใสของบอลลูนแชท</p>
        </div>

        <div class="space-y-2">
          <div>
            <p class="text-sm sm:text-base">ขนาดตัวอักษรแชท</p>  
            <p class="text-xs sm:text-sm text-white/60">ปรับขนาดตัวอักษรในข้อความแชท</p>
          </div>
          
          <div class="flex items-center gap-8 p-4 sm:px-8 bg-[#333E48] rounded-lg liquid-glass-cherri">
            <p class="hidden sm:block w-12 text-white text-[12px] sm:text-[20px] font-bold">A<span class="text-[18px] sm:text-[28px]">A</span></p>
            <div class="flex-1">
              <p class="hidden sm:block w-28 text-center">Text size</p>
              <div class="flex items-center gap-2 sm:gap-8 h-[42px]">
                <p class="text-[12px] sm:text-[20px] font-bold w-20 sm:w-28 text-center">A</p>
                <USlider 
                  :ui="{ 
                    'range': 'bg-cherri-gradient',
                    'thumb': 'bg-white ring-cherri outline-none',
                    'track': 'bg-[#1F272F]'
                  }"
                  :default-value="50"
                />
                <p class="text-[18px] sm:text-[28px] font-bold w-20 sm:w-28 text-center">A</p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <div>
            <p class="text-sm sm:text-base">ความโปร่งใสของบอลลูนแชท</p>  
            <p class="text-xs sm:text-sm text-white/60">ปรับความโปร่งใสของบอลลูนข้อความ</p>
          </div>
          
          <div class="flex items-center gap-8 p-4 sm:px-8 bg-[#333E48] rounded-lg liquid-glass-cherri">
            <div class="hidden sm:block w-12 h-12 bg-cherri/30 rounded-lg" />
            <div class="flex-1">
              <p class="hidden sm:block w-28 text-center">ความโปร่งใส</p>
              <div class="flex items-center gap-2 sm:gap-8 h-[42px]">
                <p class="text-sm sm:text-base w-20 sm:w-28 text-center">โปร่งใส 0%</p>
                <USlider 
                  :ui="{ 
                    'range': 'bg-cherri-gradient',
                    'thumb': 'bg-white ring-cherri outline-none',
                    'track': 'bg-[#1F272F]'
                  }"
                  :default-value="50"
                />
                <p class="text-sm sm:text-base w-20 sm:w-28 text-center">ทึบ 100%</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import ChangeLang from '~/components/ChangeLang.vue';


</script>

<style scoped></style>