<template>
  <div class='container w-screen h-screen flex items-center justify-center'>
    <div class='flex flex-col border-2 rounded-md p-6' style='min-width: 500px'>
      <span class='text-3xl mb-3'>Login</span>
      <span class='mb-1'>Email</span>
      <input class='rounded-md mb-3' type='email' v-model='login.email' />
      <span class='mb-1'>Password</span>
      <input class='rounded-md mb-3' type='password' v-model='login.password' />
      <button @click='handleLogin' class='bg-main text-white py-2 px-3 rounded-md'>Login</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    handleLogin() {
      if (this.login.email !== "" && this.login.password !== "") {
        this.$router.push('/')
      }
    }
  }
}
</script>
