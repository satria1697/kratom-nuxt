<template>
  <div class="border-b-2 flex flex-row-reverse md:block py-3 md:py-0">
    <div class="container mx-auto">
      <div class="grid sm:grid-cols-3 justify-items-stretch mt-0 md:mt-3 items-center">
        <div>
        </div>
        <div class="ml-2 cursor-pointer mr-5 justify-self-center sm:block hidden" @click="goTo('index')">
          <img class="w-44" :src="require('~/assets/jpg/logo.jpg')" alt="logo">
        </div>
        <div class="mr-3 justify-self-end flex">
          <div v-if="isLoading">
            <span class="animate-pulse">Loading...</span>
          </div>
          <div v-else class="flex my-auto items-center">
            <div class="mr-3 lg:mr-6 cursor-pointer text-gray-500 hover:text-black" @click="goTo('cart')">
              <h1 class="sm:block hidden">Cart</h1>
              <img class="w-6 lg:w-8 block md:hidden" :src="require('../assets/svg/shopping-cart.svg')">
            </div>
            <div
              v-if="jwt !== null && userInfo && userInfo.level >= 3"
              class="mr-3 lg:mr-6 cursor-pointer text-gray-500 hover:text-black"
              @click="goTo('profile')"
            >
              <h1 class="sm:block hidden">Profile</h1>
              <img class="w-6 lg:w-8 block md:hidden" :src="require('../assets/svg/profile-user.svg')">
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
          <div v-if="!isMobile" class="mr-3">
            <select class="py-1 px-8 rounded-md" @change="handleChangeLanguage">
              <option v-for="(local, index) in availableLocales" :key="index" :value="local.code">
                {{ local.name }}
              </option>
            </select>
          </div>
          <div v-else class="mr-3 border border-main px-2 rounded-md uppercase" @click="handleChangeLanguage(availableLocal)">
            {{ availableLocal.code }}
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto flex sm:mt-7">
      <div v-if="isMobile" class="relative ml-2 my-auto flex flex-col items-center gap-x-4">
        <div class="w-6" @click="handleNavbarState">
          <img :src="require('~/assets/svg/hamburger-menu.svg')">
        </div>
        <krt-blur v-if="navbar.state">
          <transition name="fade">
            <div class="bg-white h-screen pt-6 px-4">
              <span class="text-4xl" @click="handleNavbarState">&times;</span>
              <div
                v-for="(item, index) in navbar.data"
                :key="index"
                class="cursor-pointer"
                :class="{'hover:border-b-2 hover:border-main': !item.img, 'border-b-2 border-main': item.route === $route.name.split('__')[0]}"
                @click="goTo(item.route)"
              >
                <img
                  v-if="item.img"
                  class="w-44"
                  :src="item.img"
                  :alt="item.name"
                >
                <span v-else class="lg:text-xl font-semibold">{{ item.name }}</span>
              </div>
            </div>
          </transition>
        </krt-blur>
      </div>
      <div v-else class="my-auto mx-auto flex items-center gap-x-4">
        <div
          v-for="(item, index) in navbar.data"
          :key="index"
          class="cursor-pointer hidden lg:block pb-4 px-5 text-gray-500"
          :class="{'hover:border-b-2 hover:border-black hover:text-black': !item.img, 'border-b-2 border-black text-black': item.route === $route.name.split('__')[0]}"
          @click="goTo(item.route)"
        >
          <img
            v-if="item.img"
            class="w-44"
            :src="item.img"
            :alt="item.name"
          >
          <span v-else class="lg:text-xl font-light tracking-wider">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from '~/mixin/common'
import KrtBlur from '~/components/krt/simple/Blur'
export default {
  components: { KrtBlur },
  mixins: [common],
  data () {
    return {
      dropdown: {
        user: false
      },
      navbar: {
        state: false,
        data: [
          {
            name: 'Home',
            img: '',
            route: 'index'
          }, {
            name: 'News',
            img: '',
            route: 'article'
          },
          {
            name: 'Product',
            img: '',
            route: 'store'
          },
          {
            name: 'About Us',
            img: '',
            route: 'about-us'
          },
          {
            name: 'Contact',
            img: '',
            route: 'contact'
          },
          {
            name: 'FAQ',
            img: '',
            route: 'faq'
          }
        ]
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    availableLocales () {
      return this.$i18n.locales
    },
    availableLocal () {
      return this.availableLocales.filter(local => local.code !== this.langState)[0]
    }
  },
  methods: {
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
      if (event.target) {
        this.$i18n.setLocaleCookie(event.target.value)
        this.$router.replace(this.switchLocalePath(event.target.value))
      } else {
        this.$i18n.setLocaleCookie(event.code)
        this.$router.replace(this.switchLocalePath(event.code))
      }
    },
    handleNavbarState () {
      this.navbar.state = !this.navbar.state
    },
    goTo (payload, params) {
      this.$router.push(this.localePath({ name: payload, params }))
      this.handleNavbarState()
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Eczar:wght@800&display=swap');
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
