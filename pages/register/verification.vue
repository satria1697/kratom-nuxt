<template>
  <div class="h-screen flex lg:items-center justify-center">
    <div
      class="flex flex-col border-2 rounded-md p-6 mx-10 lg:mx-0"
      style="width: 100%; min-width: 100px; height: 100%; max-height: 150px"
    >
      <span class="animate-pulse mx-auto">Your Email is being verified</span>
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
      this.$axios.post('/verification', payload).then((res) => {
        const { data } = res
        if (data.message === 'code-true') {
          this.$router.push({ name: 'login' })
        } else {
          this.$toast.error('Wrong Code', {
            timeout: 2000
          })
        }
      }).catch(() => {
        this.$toast.error('Wrong Code', {
          timeout: 2000
        })
      })
    }
  }
}
</script>
