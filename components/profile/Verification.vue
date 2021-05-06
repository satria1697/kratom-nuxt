<template>
  <div class="flex flex-col border rounded-md p-3">
    <span class="text-2xl font-semibold mb-3">Verification</span>
    <div class="flex gap-x-10 w-3/4">
      <div class="flex flex-col mb-3 w-1/2">
        <span>Company ID</span>
        <input class="rounded-md" type="file" accept="image/jpeg, image/png" @change="handleImage($event, 'companycard')">
        <img v-if="verification.company_card" :src="verification.company_card" alt="companyCard">
        <span class="bg-main rounded-full py-2 px-3 my-4 text-white">{{ verification.company_status.description }}</span>
      </div>
      <div class="flex flex-col mb-3 w-1/2">
        <span>ID Card</span>
        <input class="rounded-md" type="file" accept="image/jpeg, image/png" @change="handleImage($event, 'idcard')">
        <img v-if="verification.id_card" :src="verification.id_card" alt="idCard">
        <span class="bg-main rounded-full py-2 px-3 my-4 text-white">{{ verification.id_status.description }}</span>
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
      Upload
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
