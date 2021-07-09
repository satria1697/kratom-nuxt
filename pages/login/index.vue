<template>
  <krt-box>
    <div class="flex justify-between">
      <span class="text-3xl mb-3">{{ $t('login.login') }}</span>
      <span
        class="hover:underline cursor-pointer"
        @click="$router.push(this.localePath({ name: 'index' }))"
      >{{ $t('login.back') }}</span>
    </div>
    <span class="mb-1">Email</span>
    <input
      v-model="login.email"
      class="rounded-md mb-3"
      type="email"
      @keyup.enter="handleLogin"
    >
    <span class="mb-1">Password</span>
    <input
      v-model="login.password"
      class="rounded-md mb-3"
      type="password"
      @keyup.enter="handleLogin"
    >
    <krt-button
      clas-props="mb-3"
      :text="isLoading ? 'Logging in' : 'Login'"
      :is-loading="isLoading"
      @on-click="handleLogin"
    />
    <krt-button :text="$t('button.register')" @on-click="$router.push(this.localePath({name: 'register'}))" />
  </krt-box>
</template>

<script>
import KrtButton from '~/components/krt/Button'
import common from '~/mixin/common'
import KrtBox from '~/components/krt/Box'
export default {
  components: { KrtBox, KrtButton },
  mixins: [common],
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  head () {
    return {
      title: 'GlobalIndo International'
    }
  },
  methods: {
    async handleLogin () {
      this.isLoading = true
      if (!this.login.email || !this.login.password) {
        this.$toast.error('Please fill email and password')
        this.isLoading = false
      } else {
        const payload = {
          email: this.login.email,
          password: this.login.password
        }
        const res = await this.$store.dispatch('api/auth/login', payload)
        const { data } = res
        if (res.success) {
          this.$cookies.set('jwt_token', data.jwt, {
            maxAge: 60 * 60 * 24 * 2
          })
          await this.$store.dispatch('helper/setAuthState', data)
          if (this.$store.state.userInfo.level <= 3) {
            this.goTo('admin-goods')
          } else {
            this.goTo('index')
          }
        }
        this.isLoading = false
      }
    }
  }
}
</script>
