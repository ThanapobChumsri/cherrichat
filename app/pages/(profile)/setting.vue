<template>
  <div class="mb-4 mx-4 sm:mx-16">
    <div class="p-4 sm:p-8 bg-[#1F272F] rounded-[20px] space-y-8">
      <h3 class="text-[20px] sm:text-[32px] font-bold">Setting</h3>

      <div class="space-y-2">
        <div>
          <p class="sm:text-[24px]">รูปแบบการแสดงผล</p>
          <p class="text-sm text-white/60">ปรับแต่งวิธีการแสดงผลข้อความในแชท</p>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="text-base sm:text-lg">ภาษา</p>  
            <p class="text-sm text-white/60">เปลี่ยนภาษาแอปพลิเคชัน</p>
          </div>
          <ChangeLang />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="text-base sm:text-lg">การแสดงผลแบบอ่านนิยาย</p>  
            <p class="text-sm text-white/60">เปลี่ยนรูปแบบการแสดงผลจากแบบธรรมดาเป็นแบบอ่านนิยาย</p>
          </div>
          <USwitch :ui="{ 'thumb': 'bg-white'}" size="lg" />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="text-base sm:text-lg">พื้นหลังตัวละคร</p>  
            <p class="text-sm text-white/60">ใช้รูปภาพตัวละครเป็นพื้นหลังแชท</p>
          </div>
          <USwitch :ui="{ 'thumb': 'bg-white'}" size="lg" />
        </div>
      </div>

      <div class="space-y-2">
        <div>
          <p class="sm:text-[24px]">ข้อความและบอลลูน</p>
          <p class="text-sm text-white/60">ปรับแต่งขนาดตัวอักษรและความโปร่งใสของบอลลูนแชท</p>
        </div>

        <div>
          <div>
            <p class="text-base sm:text-lg">ขนาดตัวอักษรแชท</p>  
            <p class="text-sm text-white/60">ปรับขนาดตัวอักษรในข้อความแชท</p>
          </div>
          
          <div class="flex gap-8 p-4 sm:p-8 bg-[#333E48] rounded-lg liquid-glass-cherri">
            <p class="w-12 text-white text-[20px] font-bold">A<span class="text-[28px]">A</span></p>
            <div class="flex-1">
              <p class="w-28 text-center">Text size</p>
              <div class="flex items-center gap-8">
                <p class="text-[20px] font-bold w-28 text-center">A</p>
                <USlider 
                  :ui="{ 
                    'range': 'bg-cherri-gradient',
                    'thumb': 'bg-white ring-cherri outline-none',
                    'track': 'bg-[#1F272F]'
                  }"
                  :default-value="50"
                />
                <p class="text-[28px] font-bold w-28 text-center">A</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p class="text-base sm:text-lg">ความโปร่งใสของบอลลูนแชท</p>  
            <p class="text-sm text-white/60">ปรับความโปร่งใสของบอลลูนข้อความ</p>
          </div>
          
          <div class="flex gap-8 p-4 sm:p-8 bg-[#333E48] rounded-lg liquid-glass-cherri">
            <div class="w-12 h-12 bg-cherri/30 rounded-lg" />
            <div class="flex-1">
              <p class="w-28 text-center">ความโปร่งใส</p>
              <div class="flex items-center gap-8">
                <p class="w-28 text-center">โปร่งใส 0%</p>
                <USlider 
                  :ui="{ 
                    'range': 'bg-cherri-gradient',
                    'thumb': 'bg-white ring-cherri outline-none',
                    'track': 'bg-[#1F272F]'
                  }"
                  :default-value="50"
                />
                <p class="w-28 text-center">ทึบ 100%</p>
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