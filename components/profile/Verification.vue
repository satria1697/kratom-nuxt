<template>
  <div class="flex flex-col border rounded-md p-3">
    <span class="text-2xl font-semibold mb-3">Verification</span>
    <div class="flex gap-x-10 w-3/4">
      <div class="flex flex-col mb-3 w-1/2">
        <span>Company ID</span>
        <input class="rounded-md" type="file" accept="image/jpeg, image/png" @change="handleImage($event, 'companycard')">
      </div>
      <div class="flex flex-col mb-3 w-1/2">
        <span>ID Card</span>
        <input class="rounded-md" type="file" accept="image/jpeg, image/png" @change="handleImage($event, 'idcard')">
      </div>
    </div>
    <div class="flex gap-x-10 w-3/4">
      <div class="flex flex-col mb-3 w-1/2">
        <span>Company ID</span>
        <input v-model="verfication.companyId" class="rounded-md" type="text">
      </div>
      <div class="w-1/2" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerificationBar',
  data () {
    return {
      verfication: {
        idCard: '',
        companyCard: '',
        companyId: ''
      }
    }
  },
  methods: {
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
          const base64 = canvas.toDataURL('image/jpg')
          if (payload === 'idcard') { this.verfication.idCard = base64 } else if (payload === 'companycard') { this.verfication.companyCard = base64 }
        }
      }
    }
  }
}
</script>
