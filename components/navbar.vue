<template>
  <div class="flex border-b-2 mb-3" style="height: 50px">
    <div class="my-auto">
      <div class="ml-2 cursor-pointer" @click="goTo('index')">
        <img class="w-14" :src="require('static/icon.png')" alt="logo" />
      </div>
    </div>
    <div class="flex ml-auto my-auto">
      <span class="mr-2 cursor-pointer">Cart</span>
      <span
        v-if="token !== ''"
        class="mr-2 cursor-pointer"
        @click="goTo('admin')"
        >User</span
      >
      <span
        v-if="token === ''"
        class="mr-2 cursor-pointer"
        @click="goTo('login')"
        >Login</span
      >
      <span v-else class="mr-2 cursor-pointer" @click="handleLogout"
        >Logout</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdown: {
        user: false,
      },
      token: '',
    }
  },
  created() {
    this.token = this.$cookies.get('token')
  },
  methods: {
    goTo(payload) {
      this.$router.push({ name: payload })
    },
    openDropdown(payload) {
      if (payload === 'user') {
        this.dropdown.user = !this.dropdown.user
      }
    },
    async handleLogout() {
      await this.$axios
        .post('api/logout', null, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('token'),
          },
        })
        .then((res) => {
          const { data } = res
          if (data.success) {
            this.$cookies.remove('token')
            this.token = ''
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
