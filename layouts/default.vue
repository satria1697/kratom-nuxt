<template>
  <div>
    <navbar />
    <nuxt />
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  created () {
    const jwt = this.$cookies.get('jwt_token')
    const token = this.$cookies.get('token')
    if (jwt && token) {
      const payload = jwtDecode(this.$cookies.get('jwt_token'))
      this.$store.commit('setUserInfo', payload)
      this.$store.commit('setToken', this.$cookies.get('token'))
      this.$store.commit('setJwt', this.$cookies.get('jwt_token'))
    }
  }
}
</script>

<style>
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
