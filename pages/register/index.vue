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
      <input v-model="register.name" class="rounded-md mb-3" type="text" @keyup.enter="onSubmit">
      <span class="mb-1">Email</span>
      <input v-model="register.email" class="rounded-md mb-3" type="email" @keyup.enter="onSubmit">
      <span class="mb-1">Password</span>
      <input v-model="register.password" class="rounded-md mb-3" type="password" @keyup.enter="onSubmit">
      <krt-button
        :text="isLoading ? 'Registering' : 'Register'"
        :is-loading="isLoading"
        @onClick="onSubmit"
      />
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
      if (!this.register.name || !this.register.email || !this.register.password) {
        this.$toast.error('please fill all fields')
        this.isLoading = false
      } else {
        const payload = {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password
        }
        this.$axios.post('/register', payload).then(() => {
        }).finally(() => {
          this.isLoading = false
          this.goTo('register/done')
        })
      }
    },
    goTo (payload) {
      this.$router.push(payload)
    }
  }
}
</script>
