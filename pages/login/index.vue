<template>
  <div class="h-screen flex lg:items-center justify-center">
    <div
      class="flex flex-col border-2 rounded-md p-6 mx-10 lg:mx-0"
      style="width: 400px; min-width: 300px; height: 380px; min-height: 350px"
    >
      <div class="flex justify-between">
        <span class="text-3xl mb-3">Login</span>
        <span
          class="hover:underline cursor-pointer"
          @click="$router.push({ name: 'index' })"
        >Back</span>
      </div>
      <span class="mb-1">Email</span>
      <input
        v-model="login.email"
        class="rounded-md mb-3"
        type="email"
        @keyup.enter="handleLogin"
      >
      <span class="mb-1">Password</span>
      <input
        v-model="login.password"
        class="rounded-md mb-3"
        type="password"
        @keyup.enter="handleLogin"
      >
      <krt-button
        :text="isLoading ? 'Logging in' : 'Login'"
        :is-loading="isLoading"
        @onClick="handleLogin"
      />
      <krt-button text="Register" @onClick="$router.push({name: 'register'})" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: {
        email: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    async handleLogin () {
      this.isLoading = true
      if (!this.login.email || !this.login.password) {
        this.$toast.error('Please fill email and password')
        this.isLoading = false
      } else {
        const payload = {
          email: this.login.email,
          password: this.login.password
        }
        const res = await this.$store.dispatch('api/auth/login', payload)
        const { data } = res
        if (res.success) {
          this.$cookies.set('token', data.token, {
            maxAge: 60 * 60 * 24 * 2
          })
          this.$cookies.set('jwt_token', data.jwt, {
            maxAge: 60 * 60 * 24 * 2
          })
          await this.$store.dispatch('helper/setAuthState', data)
          if (this.$store.state.userInfo.level <= 3) {
            await this.$router.push({ name: 'admin-goods' })
          } else {
            await this.$router.push({ name: 'index' })
          }
        }
        this.isLoading = false
      }
    }
  }
}
</script>
