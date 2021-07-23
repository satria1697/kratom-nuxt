<template>
  <div>
    <div class="container mx-auto pt-10">
      <div class="grid grid-cols-2 sm:grid-cols-3">
        <div class="mx-3 sm:mx-0">
          <div class="text-main text-3xl mt-auto tracking-wider font-light">
            About Us
          </div>
          <transition name="fade">
            <span class="2xl:p-8 pb-0 leading-relaxed text-sm text-gray-700">Etiam nec nisi blandit, pulvinar mauris finibus, pulvinar felis. Nulla euismod quam</span>
          </transition>
        </div>
        <div class="col-span-1 sm:col-span-2 justify-center sm:justify-end flex">
          <img src="@/assets/jpg/team.jpeg" alt="" class="object-cover w-3/4">
        </div>
      </div>
    </div>
    <div class="w-screen bg-gradient-to-r from-main to-green-500  h-64 mt-10 text-center flex items-center justify-center">
      <div>
        <h1 class="sm:text-4xl text-3xl font-bold title-font text-white">
          Why Choose Us?
        </h1>
        <span class="leading-relaxed text-base text-white">Etiam nec nisi blandit, pulvinar mauris finibus, pulvinar felis. Nulla euismod quam</span>
        <div class="flex justify-center pt-5">
          <button class="hover:bg-main hover:text-white hover:border-white text-main bg-white border-main p-2 sm:p-3 rounded-md">
            Contact Us
          </button>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="container mx-auto pt-10 pb-10">
        <div class="text-center">
          <h1 class="text-main text-3xl sm:text-4xl mt-auto tracking-wider font-light">
            Our kelebihan
          </h1>
        </div>
        <div class="grid sm:grid-cols-2 gap-7 pt-5 mr-2 sm:mr-0">
          <div class="grid grid-cols-5 items-center">
            <div class="flex justify-center box relative">
              <img class="w-6 lg:w-8 absolute -bottom-1 left-1/4 img" :src="require('@/assets/svg/shopping-cart.svg')">
            </div>
            <div class="col-span-4">
              <h2 class="text-main text-xl font-semibold">
                Our kelebihan
              </h2>
              <span class="2xl:p-8 pb-0 leading-relaxed text-base text-gray-500">Etiam nec nisi blandit, pulvinar mauris finibus, pulvinar felis. Nulla euismod quam</span>
            </div>
          </div>
          <div class="grid grid-cols-5 items-center">
            <div class="flex justify-center box relative">
              <img class="w-6 lg:w-8 absolute -bottom-1 left-1/4 img" :src="require('@/assets/svg/shopping-cart.svg')">
            </div>
            <div class="col-span-4">
              <h2 class="text-main text-xl font-semibold">
                Our kelebihan
              </h2>
              <span class="2xl:p-8 pb-0 leading-relaxed text-base text-gray-500">Etiam nec nisi blandit, pulvinar mauris finibus, pulvinar felis. Nulla euismod quam</span>
            </div>
          </div>
          <div class="grid grid-cols-5 items-center">
            <div class="flex justify-center box relative">
              <img class="w-6 lg:w-8 absolute -bottom-1 left-1/4 img" :src="require('@/assets/svg/shopping-cart.svg')">
            </div>
            <div class="col-span-4">
              <h2 class="text-main text-xl font-semibold">
                Our kelebihan
              </h2>
              <span class="2xl:p-8 pb-0 leading-relaxed text-base text-gray-500">Etiam nec nisi blandit, pulvinar mauris finibus, pulvinar felis. Nulla euismod quam</span>
            </div>
          </div>
          <div class="grid grid-cols-5 items-center">
            <div class="flex justify-center box relative">
              <img class="w-6 lg:w-8 absolute -bottom-1 left-1/4 img" :src="require('@/assets/svg/shopping-cart.svg')">
            </div>
            <div class="col-span-4">
              <h2 class="text-main text-xl font-semibold">
                Our kelebihan
              </h2>
              <span class="2xl:p-8 pb-0 leading-relaxed text-base text-gray-500">
                Etiam nec nisi blandit, pulvinar mauris finibus, pulvinar felis. Nulla euismod quam
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AboutUsPage',
  head () {
    return {
      title: 'Globalindo | About Us'
    }
  }
}
</script>

<style scoped>
.box::before {
  content: "";
  height: 45px;
  width: 45px;
  border-radius: 30px;
  background-color: #10b981;
  opacity: 70%;
  }
</style>
