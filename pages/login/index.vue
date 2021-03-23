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
          >Back</span
        >
      </div>
      <span class="mb-1">Email</span>
      <input v-model="login.email" class="rounded-md mb-3" type="email" />
      <span class="mb-1">Password</span>
      <input v-model="login.password" class="rounded-md mb-3" type="password" />
      <button
        :disabled="isLoading"
        class="bg-main text-white py-2 px-3 rounded-md"
        @click="handleLogin"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      isLoading: false,
    }
  },
  methods: {
    async handleLogin() {
      this.isLoading = true
      if (this.login.email !== '' && this.login.password !== '') {
        await this.$axios
          .post('/api/login', {
            email: this.login.email,
            password: this.login.password,
          })
          .then((res) => {
            const { data } = res
            console.log(data.data.token)
            if (data.success) {
              this.$cookies.set('token', data.data.token, {
                maxAge: 60 * 60 * 24 * 2,
              })
              this.$router.push({ name: 'index' })
            }
            this.isLoading = false
          })
          .catch((err) => {
            console.log(err)
            this.isLoading = false
          })
      }
    },
  },
}
</script>
