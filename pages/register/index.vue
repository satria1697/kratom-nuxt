<template>
  <div class="h-screen flex lg:items-center justify-center">
    <div
      class="flex flex-col border-2 rounded-md p-6 mx-10 lg:mx-0"
      style="width: 400px; min-width: 300px; height: 400px; min-height: 350px"
    >
      <div class="flex justify-between">
        <span class="text-3xl mb-3">Register</span>
        <span
          class="hover:underline cursor-pointer"
          @click="$router.push({ name: 'login' })"
        >Back to login</span>
      </div>
      <span class="mb-1">Name</span>
      <input v-model="register.name" class="rounded-md mb-3" type="text">
      <span class="mb-1">Email</span>
      <input v-model="register.email" class="rounded-md mb-3" type="email">
      <span class="mb-1">Password</span>
      <input v-model="register.password" class="rounded-md mb-3" type="password">
      <button
        :disabled="isLoading"
        class="mb-3 bg-main border border-main text-white py-2 px-3 rounded-md hover:bg-white hover:text-main transition-colors"
        @click="onSubmit"
      >
        {{ isLoading ? 'Registering' : 'Register' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      register: {
        name: '',
        email: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    onSubmit () {
      this.isLoading = true
      const payload = {
        name: this.register.name,
        email: this.register.email,
        password: this.register.password
      }
      this.$axios.post('/register', payload).then(() => {
        this.$router.push({ name: 'register-verification', params: { email: this.register.email } })
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
