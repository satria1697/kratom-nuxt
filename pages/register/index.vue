<template>
  <krt-box-middle>
    <div class="flex justify-between">
      <span class="text-3xl mb-3">{{ $t('register.register') }}</span>
      <span
        class="hover:underline cursor-pointer"
        @click="$router.push(localePath({ name: 'login' }))"
      >{{ $t('register.backToLogin') }}</span>
    </div>
    <span class="mb-1">{{ $t('register.name') }}</span>
    <input
      v-model="register.name"
      class="rounded-md mb-3"
      type="text"
      @keyup.enter="onSubmit"
    >
    <span class="mb-1">Email</span>
    <input
      v-model="register.email"
      class="rounded-md mb-3"
      type="email"
      @keyup.enter="onSubmit"
    >
    <span class="mb-1">Password</span>
    <input
      v-model="register.password"
      class="rounded-md mb-3"
      type="password"
      @keyup.enter="onSubmit"
    >
    <krt-button
      :text="isLoading ? 'Registering' : 'Register'"
      :is-loading="isLoading"
      @on-click="onSubmit"
    />
  </krt-box-middle>
</template>

<script>
import KrtButton from '~/components/krt/Button'
import common from '~/mixin/common'
import KrtBoxMiddle from '~/components/krt/fusion/BoxMiddle'

export default {
  components: { KrtBoxMiddle, KrtButton },
  mixins: [common],
  data () {
    return {
      register: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  head () {
    return {
      title: 'GlobalIndo International | Register'
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
        const res = this.$store.dispatch('api/auth/register', payload)
        if (res) {
          this.goTo('register-done')
        }
      }
    }
  }
}
</script>
