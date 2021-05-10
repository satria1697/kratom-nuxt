<template>
  <div class="flex flex-col h-screen">
    <div style="flex: 1 0 auto">
      <navbar />
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import Footer from '~/components/footer'

export default {
  components: { Footer },
  async created () {
    let payload = {
      jwt: this.$cookies.get('jwt_token'),
      token: this.$cookies.get('token')
    }
    if (payload.jwt && payload.token) {
      payload = { ...payload, decode: jwtDecode(payload.jwt) }
      await this.$store.dispatch('helper/setAuthState', payload)
    }
  }
}
</script>

<style>
@import "assets/css/main.css";
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
