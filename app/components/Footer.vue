<template>
  <div>
    <div class="shrink-0 bg-border h-[1px] w-full" />

    <div class="py-4 sm:py-10">
      <UContainer>
        <div class="flex flex-col gap-4 sm:flex-row">
          <div class="flex-1">
            <div>
              <img src="~/assets/images/logo.png" class="max-h-[30px]" />
            </div>
            <div class="grid flex-1 grid-cols-4 text-sm sm:text-base pt-4 gap-4">
              <div class="text-[#94a3b8] font-extrabold">
                <p class="transition duration-100 mb-4">
                  {{ "Main" }}
                </p>
                <p class="transition duration-100 ease-in-out hover:text-white">
                  {{ "Home" }}
                </p>
                <p class="transition duration-100 ease-in-out hover:text-white">
                  {{ "Charecter" }}
                </p>
                <p class="transition duration-100 ease-in-out hover:text-white">
                  {{ "Member" }}
                </p>
                <p class="transition duration-100 ease-in-out hover:text-white">
                  {{ "About us" }}
                </p>
                <p class="transition duration-100 ease-in-out hover:text-white">
                  {{ "Contact" }}
                </p>
              </div>
              <div class="text-[#94a3b8] font-extrabold">
                <p class="transition duration-100 mb-4">
                  {{ "Get Started" }}
                </p>
                <p class="transition duration-100 ease-in-out hover:text-white">
                  {{ "For company" }}
                </p>
                <p class="transition duration-100 ease-in-out hover:text-white">
                  {{ "For developer" }}
                </p>
              </div>
              <div class="text-[#94a3b8] font-extrabold">
                <p class="transition duration-100 mb-4">
                  {{ "Get intouch" }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <div
                    class="bg-white text-black w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
                    @click="redirect('https://www.facebook.com')"
                  >
                    <Icon name="jam:facebook" class="h-5 w-5" />
                  </div>
                  <div
                    class="bg-white text-black w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
                    @click="redirect('https://www.tiktok.com')"
                  >
                    <Icon name="ic:baseline-tiktok" class="h-5 w-5" />
                  </div>
                  <div
                    class="bg-white text-black w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
                    @click="redirect('https://www.instagram.com')"
                  >
                    <Icon name="mdi:instagram" class="h-5 w-5" />
                  </div>
                  <div
                    class="bg-white text-black w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
                    @click="redirect('https://www.twitter.com')"
                  >
                    <Icon name="ri:twitter-x-fill" class="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div class="text-[#94a3b8] font-extrabold">
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
const route = useRoute();
const rounter = useRouter();
const isDemoMode = computed(() => route.path.startsWith("/demo"));
const redirect = (url) => {
  window.open(url, "_blank");
}
</script>

<style scoped></style>
