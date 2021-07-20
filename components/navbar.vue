<template>
  <div class="border-b-2 mb-3">
    <div class="container mx-auto flex h-[70px]">
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
      <div v-else class="my-auto flex items-center gap-x-4">
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
            img: require('~/assets/jpg/logo.jpg'),
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
