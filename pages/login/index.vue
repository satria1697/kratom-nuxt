<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div
      class="flex flex-col border-2 rounded-md p-6 mx-10"
      style="width: 400px; min-width: 300px"
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
      <button class="bg-red-600 border border-red-600 text-white py-2 px-3 rounded-md hover:bg-white hover:text-red-600 transition-colors">
        Login via Google
      </button>
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
          .then((res) => {
            const { data } = res
            if (data.success) {
              this.$cookies.set('token', data.data.token, {
                maxAge: 60 * 60 * 24 * 2
              })
              this.$cookies.set('jwt_token', data.data.jwt, {
                maxAge: 60 * 60 * 24 * 2
              })
              const decode = jwtDecode(data.data.jwt)
              this.$store.commit('setToken', data.data.token)
              this.$store.commit('setJwt', data.data.jwt)
              this.$store.commit('setUserInfo', decode)
              this.$router.push({ name: 'index' })
            }
            this.isLoading = false
          })
          .catch(() => {
            this.$toast.error('Failed Login', {
              timeout: 2000
            })
            this.isLoading = false
          })
      }
    }
  }
}
</script>
