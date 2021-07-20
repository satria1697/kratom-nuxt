<template>
  <div class="border-b-2">
    <div class="container mx-auto">
      <div class="grid grid-cols-3 justify-items-stretch mt-3 items-center">
        <div></div>
        <div class="ml-2 cursor-pointer mr-5 justify-self-center" @click="goTo('index')">
          <img class="w-44" :src="require('~/assets/jpg/logo.jpg')" alt="logo">
        </div>
        <div class="mr-3 justify-self-end flex">
          <div v-if="isLoading">
            <span class="animate-pulse">Loading...</span>
          </div>
          <div v-else class="flex my-auto">
            <div class="mr-3 lg:mr-6 cursor-pointer text-gray-500 hover:text-black" @click="goTo('cart')">
              Cart
              <!-- <img class="w-6 lg:w-8" :src="require('../assets/svg/shopping-cart.svg')"> -->
            </div>
            <div
              v-if="jwt !== null && userInfo && userInfo.level >= 3"
              class="mr-3 lg:mr-6 cursor-pointer text-gray-500 hover:text-black"
              @click="goTo('profile')"
            >
              Profile
              <!-- <img class="w-6 lg:w-8" :src="require('../assets/svg/profile-user.svg')"> -->
            </div>
            <div
              v-if="jwt === null"
              class="mr-3 lg:mr-6 cursor-pointer text-gray-500 hover:text-black"
              @click="goTo('login')"
            >
              Login
              <!-- <img class="w-6 lg:w-8" :src="require('../assets/svg/enter.svg')"> -->
            </div>
            <div
              v-else
              class="mr-3 lg:mr-6 cursor-pointer"
              @click="handleLogout"
            >
              <img class="w-6 lg:w-8" :src="require('../assets/svg/logout.svg')">
            </div>
          </div>
          <div class="mr-3">
            <select class="py-1 px-8 rounded-md" @change="handleChangeLanguage">
              <option v-for="(local, index) in availableLocales" :key="index" :value="local.code">
                {{ local.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto flex mt-7">
      <div class="my-auto flex items-center mx-auto">
        <div class="cursor-pointer hover:border-b-2 hover:border-main hidden lg:block pb-4 px-5 text-gray-500 hover:text-black" @click="goTo('index')">
          <span class="lg:text-xl font-light tracking-wider">Home</span>
        </div>
        <div class="cursor-pointer hover:border-b-2 hover:border-main pb-4 px-5 text-gray-500 hover:text-black" @click="goTo('article')">
          <span class="lg:text-xl font-light tracking-wider">Product</span>
        </div>
        <div class="cursor-pointer hover:border-b-2 hover:border-main hidden lg:block pb-4 px-5 text-gray-500 hover:text-black" @click="goTo('index')">
          <span class="lg:text-xl font-light tracking-wider">News</span>
        </div>
        <div class="cursor-pointer hover:border-b-2 hover:border-main pb-4 px-5 text-gray-500 hover:text-black" @click="goTo('article')">
          <span class="lg:text-xl font-light tracking-wider">About Us</span>
        </div>
        <div class="cursor-pointer hover:border-b-2 hover:border-main hidden lg:block pb-4 px-5 text-gray-500 hover:text-black" @click="goTo('index')">
          <span class="lg:text-xl font-light tracking-wider">Contact</span>
        </div>
        <div class="cursor-pointer hover:border-b-2 hover:border-main pb-4 px-5 text-gray-500 hover:text-black" @click="goTo('article')">
          <span class="lg:text-xl font-light tracking-wider">Faq</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from '~/mixin/common'

export default {
  mixins: [common],
  data () {
    return {
      dropdown: {
        user: false
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    availableLocales () {
      return this.$i18n.locales
    }
  },
  methods: {
    goTo (payload) {
      this.$router.push(this.localePath({ name: payload }))
    },
    openDropdown (payload) {
      if (payload === 'user') {
        this.dropdown.user = !this.dropdown.user
      }
    },
    async handleLogout () {
      this.isLoading = true
      const res = await this.$store.dispatch('api/auth/logout')
      if (res.success) {
        this.$cookies.remove('jwt_token')
        this.$store.commit('setJwt', null)
        this.$store.commit('setToken', null)
        this.$store.commit('setUserInfo', null)
        this.$router.push(this.localePath({ name: 'index' }))
      }
      this.isLoading = false
    },
    handleChangeLanguage (event) {
      console.log(event.target.value)
      this.$i18n.setLocaleCookie(event.target.value)
      this.$router.replace(this.switchLocalePath(event.target.value))
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Eczar:wght@800&display=swap');
</style>
