<template>
  <div class="flex flex-col border rounded-md p-3">
    <span class="text-2xl font-semibold mb-3">Verification</span>
    <div class="flex gap-x-10 w-3/4">
      <div class="flex flex-col mb-3 w-1/2">
        <div class="flex mb-3">
          <div class="relative my-auto">
            <input
              class="absolute w-8 opacity-0 z-10"
              title="upload"
              type="file"
              accept="image/jpeg, image/png"
              @change="handleImage($event, 'companycard')"
            >
            <div class="absolute w-8">
              <img :src="require('../../assets/svg/upload.svg')" alt="upload">
            </div>
            <div class="ml-9 my-auto">
              <span>Company Card</span>
            </div>
          </div>
        </div>
        <span :style="{'background-color': verification.company_status.color}" class="rounded-full py-2 px-3 my-4 text-white">{{ verification.company_status.description }}</span>
        <img v-if="verification.company_card" :src="verification.company_card" alt="companyCard">
      </div>
      <div class="flex flex-col mb-3 w-1/2">
        <div class="flex mb-3">
          <div class="relative my-auto">
            <input
              class="absolute w-8 opacity-0 z-10"
              title="upload"
              type="file"
              accept="image/jpeg, image/png"
              @change="handleImage($event, 'idcard')"
            >
            <div class="absolute w-8">
              <img :src="require('../../assets/svg/upload.svg')" alt="upload">
            </div>
            <div class="ml-9 my-auto">
              <span>ID Card</span>
            </div>
          </div>
        </div>
        <span :style="{'background-color': verification.id_status.color}" class="rounded-full py-2 px-3 my-4 text-white">{{ verification.id_status.description }}</span>
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
    <krt-button text="Submit" @on-click="handleUpload" />
  </div>
</template>

<script>
import { imgToBase64 } from '~/lib/misc/helper'
import KrtButton from '~/components/krt/Button'
import common from '~/mixin/common'

export default {
  name: 'VerificationBar',
  components: { KrtButton },
  mixins: [common],
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
    async handleImage (e, payload) {
      const base64 = await imgToBase64(e)
      if (payload === 'idcard') { this.verification.id_card = base64 } else if (payload === 'companycard') { this.verification.company_card = base64 }
    }
  }
}
</script>
