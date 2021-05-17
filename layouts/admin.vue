<template>
  <div class="flex flex-col h-screen">
    <div style="flex: 1 0 auto">
      <navbar />
      <nuxt />
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  async created () {
    let payload = {
      jwt: this.$cookies.get('jwt_token')
    }
    if (payload.jwt) {
      payload = { ...payload, decode: jwtDecode(payload.jwt) }
      await this.$store.dispatch('helper/setAuthState', payload)
    }
  }
}
</script>
