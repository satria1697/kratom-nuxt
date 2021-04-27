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
      <input v-model="login.email" class="rounded-md mb-3" type="email" @keyup.enter="handleLogin">
      <span class="mb-1">Password</span>
      <input v-model="login.password" class="rounded-md mb-3" type="password" @keyup.enter="handleLogin">
      <button
        :disabled="isLoading"
        class="mb-3 bg-main border border-main text-white py-2 px-3 rounded-md hover:bg-white hover:text-main transition-colors"
        @click="handleLogin"
      >
        {{ isLoading ? 'Logging in' : 'Login' }}
      </button>
      <button class="mb-3 bg-red-600 border border-red-600 text-white py-2 px-3 rounded-md hover:bg-white hover:text-red-600 transition-colors">
        Login via Google
      </button>
      <span class="mx-auto">Not registered? <span class="underline hover:no-underline text-blue-700 cursor-pointer" @click="$router.push({name: 'register'})">Click Here!</span></span>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

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
      if (this.login.email !== '' && this.login.password !== '') {
        // await this.$auth.loginWith('laravelPassport')
        await this.$axios
          .post('/login', {
            email: this.login.email,
            password: this.login.password
          })
          .then(async (res) => {
            const { data } = res
            if (data.success) {
              this.$cookies.set('token', data.data.token, {
                maxAge: 60 * 60 * 24 * 2
              })
              this.$cookies.set('jwt_token', data.data.jwt, {
                maxAge: 60 * 60 * 24 * 2
              })
              const decode = jwtDecode(data.data.jwt)
              await this.$store.commit('setToken', data.data.token)
              await this.$store.commit('setJwt', data.data.jwt)
              await this.$store.commit('setUserInfo', decode)
              if (this.$store.state.userInfo.level <= 3) {
                await this.$router.push({ name: 'admin-goods' })
              } else {
                await this.$router.push({ name: 'index' })
              }
            }
            this.isLoading = false
          })
          .catch((err) => {
            const { data } = err.response
            if (data.message === 'email-not-verified') {
              this.$toast.error('Email Not Verified', {
                timeout: 2000
              })
            } else {
              this.$toast.error('Failed Login', {
                timeout: 2000
              })
            }
            this.isLoading = false
          })
      }
    }
  }
}
</script>
