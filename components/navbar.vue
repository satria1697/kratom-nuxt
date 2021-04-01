<template>
  <div class="flex border-b-2 mb-3" style="height: 50px">
    <div class="my-auto">
      <div class="ml-2 cursor-pointer" @click="goTo('index')">
        <img class="w-14" :src="require('static/icon.png')" alt="logo">
      </div>
    </div>

    <div class="flex ml-auto my-auto">
      <div v-if="isLoading">
        <span class="animate-pulse">Loading...</span>
      </div>
      <div v-else class="flex">
        <div class="mr-6 cursor-pointer" @click="goTo('cart')">
          <img class="w-8" :src="require('../assets/svg/shopping-cart.svg')">
        </div>
        <div
          v-if="token !== null && userInfo && userInfo.level < 3"
          class="mr-6 cursor-pointer"
          @click="goTo('admin')"
        >
          <img class="w-8" :src="require('../assets/svg/profile-user.svg')">
        </div>
        <div
          v-else-if="token !== null && userInfo && userInfo.level >= 3"
          class="mr-6 cursor-pointer"
        >
          <img class="w-8" :src="require('../assets/svg/profile-user.svg')">
        </div>
        <div
          v-if="token === null"
          class="mr-6 cursor-pointer"
          @click="goTo('login')"
        >
          <img class="w-8" :src="require('../assets/svg/enter.svg')">
        </div>
        <div
          v-else
          class="mr-6 cursor-pointer"
          @click="handleLogout"
        >
          <img class="w-8" :src="require('../assets/svg/logout.svg')">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dropdown: {
        user: false
      },
      isLoading: false
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    token () {
      return this.$store.state.token
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
      await this.$axios
        .post('api/logout', null, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        })
        .then((res) => {
          const { data } = res
          if (data.success) {
            this.$cookies.remove('token')
            this.$cookies.remove('jwt')
            this.$store.commit('setJwt', null)
            this.$store.commit('setToken', null)
            this.$store.commit('setUserInfo', null)
          }
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          console.log(err)
        })
    }
  }
}
</script>
