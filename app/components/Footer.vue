<template>
  <div class="bg-[#18181C]">
    <div class="shrink-0 bg-border h-[1px] w-full" />

    <div class="py-4 sm:py-10">
      <UContainer>
        <div class="flex flex-col gap-4 sm:flex-row">
          <div class="flex-1">
            <div>
              <img src="~/assets/images/logo.png" class="max-h-[30px]" />
            </div>
            <div class="grid flex-1 grid-cols-2 sm:grid-cols-4 text-sm sm:text-base pt-4 gap-4">
              <div class="text-[#94a3b8] font-semibold sm:font-extrabold">
                <p class="transition duration-100 mb-4">
                  {{ $t('footer.main.title') }}
                </p>
                <p v-for="value in main" 
                  class="transition duration-100 ease-in-out" 
                  :class="value.enable ? 'hover:text-white cursor-pointer' : 'cursor-not-allowed'"
                  @click="value.enable && navigateTo(value.url)"
                >
                  {{ $t(value.title) }}
                </p>
              </div>

              <div class="text-[#94a3b8] font-semibold sm:font-extrabold">
                <p class="transition duration-100 mb-4">
                  {{ $t('footer.started.title') }}
                </p>
                <p class="transition duration-100 ease-in-out cursor-not-allowed">
                  {{ $t('footer.started.sub_title1') }}
                </p>
                <p class="transition duration-100 ease-in-out cursor-not-allowed">
                  {{ $t('footer.started.sub_title2') }}
                </p>
              </div>
              <div class="text-[#94a3b8] font-semibold sm:font-extrabold">
                <p class="transition duration-100 mb-4">
                  {{ $t('footer.link') }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <div
                    class="bg-white text-black w-8 h-8 flex justify-center items-center rounded-full"
                    @click="redirect('https://www.facebook.com')"
                  >
                    <Icon name="jam:facebook" class="h-5 w-5" />
                  </div>
                  <div
                    class="bg-white text-black w-8 h-8 flex justify-center items-center rounded-full"
                    @click="redirect('https://www.tiktok.com')"
                  >
                    <Icon name="ic:baseline-tiktok" class="h-5 w-5" />
                  </div>
                  <div
                    class="bg-white text-black w-8 h-8 flex justify-center items-center rounded-full"
                    @click="redirect('https://www.instagram.com')"
                  >
                    <Icon name="mdi:instagram" class="h-5 w-5" />
                  </div>
                  <div
                    class="bg-white text-black w-8 h-8 flex justify-center items-center rounded-full"
                    @click="redirect('https://www.twitter.com')"
                  >
                    <Icon name="ri:twitter-x-fill" class="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div class="text-[#94a3b8] font-semibold sm:font-extrabold">
                <p class="transition duration-100 text-[13px]">
                  Copyright © 2025 Cherrichat. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<script setup>
const redirect = (url) => {
  window.open(url, "_blank");
}

const main = [
  {
    title: "footer.main.sub_title1",
    url: "/",
    enable: true,
  },
  {
    title: "footer.main.sub_title2",
    url: "/character",
    enable: false,
  },
  {
    title: "footer.main.sub_title3",
    url: "/profile",
    enable: true,
  },
  { 
    title: "footer.main.sub_title4",
    url: "/about-us",
    enable: false,
  },
  {
    title: "footer.main.sub_title5",
    url: "/contact",
    enable: false,
  },
]

const clickNav = (value) => {
  if (value.enable) {
    navigateTo(value.url)
  }
}

</script>

<style scoped></style>
