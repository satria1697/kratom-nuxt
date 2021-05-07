<template>
  <div class="flex flex-col border rounded-md p-3">
    <span class="text-2xl font-semibold mb-3">Verification</span>
    <div class="flex gap-x-10 w-3/4">
      <div class="flex flex-col mb-3 w-1/2">
        <div class="flex mb-3">
          <div class="relative my-auto">
            <input class="absolute w-8 opacity-0 z-10" title="upload" type="file" accept="image/jpeg, image/png" @change="handleImage($event, 'companycard')">
            <div class="absolute w-8">
              <img :src="require('../../assets/svg/upload.svg')" alt="upload">
            </div>
            <div class="ml-9 my-auto">
              <span>Company Card</span>
            </div>
          </div>
        </div>
        <span class="bg-main rounded-full py-2 px-3 my-4 text-white">{{ verification.company_status.description }}</span>
        <img v-if="verification.company_card" :src="verification.company_card" alt="companyCard">
      </div>
      <div class="flex flex-col mb-3 w-1/2">
        <div class="flex mb-3">
          <div class="relative my-auto">
            <input class="absolute w-8 opacity-0 z-10" title="upload" type="file" accept="image/jpeg, image/png" @change="handleImage($event, 'idcard')">
            <div class="absolute w-8">
              <img :src="require('../../assets/svg/upload.svg')" alt="upload">
            </div>
            <div class="ml-9 my-auto">
              <span>ID Card</span>
            </div>
          </div>
        </div>
        <span class="bg-main rounded-full py-2 px-3 my-4 text-white">{{ verification.id_status.description }}</span>
        <img v-if="verification.id_card" :src="verification.id_card" alt="idCard">
      </div>
    </div>
    <div class="flex gap-x-10 w-3/4">
      <div class="flex flex-col mb-3 w-1/2">
        <span>Company ID</span>
        <input v-model="verification.company_id" class="rounded-md" type="text">
      </div>
      <div class="w-1/2" />
    </div>
    <button class="bg-main rounded-full py-2 px-3 my-4 text-white rounded-md" @click="handleUpload">
      Submit
    </button>
  </div>
</template>

<script>
export default {
  name: 'VerificationBar',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      verification: this.user.verification
    }
  },
  methods: {
    handleUpload () {
      const payload = {
        idCard: this.user.verification.id_card,
        companyCard: this.user.verification.company_card,
        companyId: this.user.verification.company_id,
        jwt: this.$store.state.jwt
      }
      this.$axios.post(`/id.verification/${this.user.id}`, payload).then((res) => {
        console.log(res)
      })
    },
    handleImage (e, payload) {
      const url = URL.createObjectURL(e.target.files[0])
      const img = new Image()
      img.src = url
      img.onload = () => {
        URL.revokeObjectURL(img.src)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const base64 = canvas.toDataURL('image/png')
          if (payload === 'idcard') { this.verification.id_card = base64 } else if (payload === 'companycard') { this.verification.company_card = base64 }
        }
      }
    }
  }
}
</script>
