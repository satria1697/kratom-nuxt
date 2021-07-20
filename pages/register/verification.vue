<template>
  <krt-box-middle>
    <span class="animate-pulse text-center text-xl mt-6">{{ $t('register.verification') }} <br>{{ $t('register.wait') }}</span>
  </krt-box-middle>
</template>

<script>
import jwtDecode from 'jwt-decode'
import common from '~/mixin/common'
import KrtBox from '~/components/krt/simple/Box'
import KrtBoxMiddle from '~/components/krt/fusion/BoxMiddle'

export default {
  name: 'Verification',
  components: { KrtBoxMiddle },
  mixins: [common],
  mounted () {
    const decode = jwtDecode(this.jwt)
    const email = decode.email
    const code = decode.code
    this.handleVerification(email, code)
  },
  methods: {
    async handleVerification (email, code) {
      const payload = {
        email,
        code
      }
      const res = await this.$store.dispatch('api/auth/verification', payload)
      if (res.message === 'code-true') {
        this.$router.push(this.localePath({ name: 'login' }))
      } else {
        this.$toast.error('Wrong Code', {
          timeout: 2000
        })
      }
    }
  }
}
</script>
