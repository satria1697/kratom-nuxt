<template>
  <div class="h-screen flex lg:items-center justify-center">
    <div
      class="flex flex-col border-2 rounded-md p-6 mx-10 lg:mx-0"
      style="width: 400px; min-width: 300px; height: 100%; max-height: 150px"
    >
      <div class="mb-3">
        <p>Verification Code</p>
        <input v-model="code" class="w-full rounded-md" type="number">
      </div>
      <button class="py-2 px-3 bg-main rounded-md text-white" @click="handleVerification">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'verif',
  data () {
    return {
      code: ''
    }
  },
  methods: {
    handleVerification () {
      const payload = {
        email: this.$route.params.email,
        code: this.code
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
