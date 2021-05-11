<template>
  <div class="h-screen flex lg:items-center justify-center">
    <div
      class="flex flex-col border-2 max-w-xs rounded-md p-6 mx-10 lg:mx-0"
      style="width: 100%; height: 100%; max-height: 150px"
    >
      <span class="animate-pulse text-center text-xl mt-6">Your Email is being verified... <br>Please wait</span>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  mounted () {
    const jwt = this.$route.query.key
    const decode = jwtDecode(jwt)
    const email = decode.email
    const code = decode.code
    this.handleVerification(email, code)
  },
  methods: {
    handleVerification (email, code) {
      const payload = {
        email,
        code
      }
      const res = this.$store.dispatch('api/auth/verification', payload)
      if (res.message === 'code-true') {
        this.$router.push({ name: 'register-done' })
      } else {
        this.$toast.error('Wrong Code', {
          timeout: 2000
        })
      }
    }
  }
}
</script>
