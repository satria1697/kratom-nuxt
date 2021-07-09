<template>
  <div class="border-b-2 mb-3">
    <div class="container mx-auto flex h-[70px]">
      <div class="my-auto flex items-center">
        <div class="ml-2 cursor-pointer mr-5" @click="goTo('index')">
          <img class="w-44" :src="require('~/assets/jpg/logo.jpg')" alt="logo">
        </div>
        <div class="cursor-pointer hover:border-b-2 hover:border-main mr-3 hidden lg:block" @click="goTo('index')">
          <span class="lg:text-xl font-semibold">Home</span>
        </div>
        <div class="cursor-pointer hover:border-b-2 hover:border-main" @click="goTo('article')">
          <span class="lg:text-xl font-semibold">Blog</span>
        </div>
      </div>

      <div class="flex ml-auto my-auto">
        <div class="mr-3">
          <select class="py-1 px-8 rounded-md" @change="handleChangeLanguage">
            <option v-for="(local, index) in availableLocales" :key="index" :value="local.code">
              {{ local.name }}
            </option>
          </select>
        </div>
        <div v-if="isLoading">
          <span class="animate-pulse">Loading...</span>
        </div>
        <div v-else class="flex">
          <div class="mr-3 lg:mr-6 cursor-pointer" @click="goTo('cart')">
            <img class="w-6 lg:w-8" :src="require('../assets/svg/shopping-cart.svg')">
          </div>
          <div
            v-if="jwt !== null && userInfo && userInfo.level < 3"
            class="mr-3 lg:mr-6 cursor-pointer"
            @click="goTo('admin-goods')"
          >
            <img class="w-6 lg:w-8" :src="require('../assets/svg/profile-user.svg')">
          </div>
          <div
            v-else-if="jwt !== null && userInfo && userInfo.level >= 3"
            class="mr-3 lg:mr-6 cursor-pointer"
            @click="goTo('profile')"
          >
            <img class="w-6 lg:w-8" :src="require('../assets/svg/profile-user.svg')">
          </div>
          <div
            v-if="jwt === null"
            class="mr-3 lg:mr-6 cursor-pointer"
            @click="goTo('login')"
          >
            <img class="w-6 lg:w-8" :src="require('../assets/svg/enter.svg')">
          </div>
          <div
            v-else
            class="mr-3 lg:mr-6 cursor-pointer"
            @click="handleLogout"
          >
            <img class="w-6 lg:w-8" :src="require('../assets/svg/logout.svg')">
          </div>
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
      this.$router.push({ name: payload })
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
        this.$router.push({ name: 'index' })
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
