<template>
  <div class="container mx-auto">
    <span class="text-4xl mb-3 font-semibold">User Info</span>
    <div v-if="!user">
      <span>Loading Data</span>
    </div>
    <template v-else>
      <div class="flex w-full mb-3">
        <div class="flex flex-col w-1/3">
          <span>Name</span>
          <span>{{ user.profile.name || '-' }}</span>
        </div>
        <div class="flex flex-col w-1/3">
          <span>Email</span>
          <span>{{ user.email || '-' }}</span>
        </div>
        <div class="flex flex-col w-1/3">
          <span>Level</span>
          <select
            v-model="user.level.id"
            class="rounded-md w-1/2"
          >
            <option
              v-for="(item, index) in level"
              :key="index"
              :value="item.id"
            >
              {{ item.description }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-col mb-3 w-1/2">
          <span>Company</span>
          <span>{{ user.profile.company || '-' }}</span>
        </div>
        <div class="flex flex-col mb-3 w-1/2">
          <span>Position</span>
          <span>{{ user.profile.position || '-' }}</span>
        </div>
        <div class="flex flex-col mb-3 w-1/2">
          <span>Company ID</span>
          <span>{{ user.profile.company_id || '-' }}</span>
        </div>
      </div>
      <div class="flex">
        <div class="flex flex-col mb-3 w-1/2">
          <span>ID Card</span>
          <div class="flex">
            <img v-if="user.verification.id_card" :src="user.verification.id_card">
            <span v-else>No Image</span>
          </div>
          <div class="flex flex-col">
            <span>Verification status </span>
            <select
              v-model="user.verification.id_card_status"
              class="rounded-md w-1/2"
            >
              <option
                v-for="(item, index) in status"
                :key="index"
                :value="item.id"
              >
                {{ item.description }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex flex-col mb-3 w-1/2">
          <span>Company Card</span>
          <div class="flex">
            <img v-if="user.verification.company_card" :src="user.verification.company_card">
            <span v-else>No Image</span>
          </div>
          <div class="flex flex-col">
            <span>Verification status </span>
            <select v-model="user.verification.company_card_status" class="rounded-md w-1/2">
              <option v-for="(item, index) in status" :key="index" :value="item.id">
                {{ item.description }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <button class="py-2 px-3 bg-main hover:text-main hover:bg-white text-white rounded-md border-main border" @click="handleButton">
          Update Data
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: null,
      status: [],
      level: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      await this.fetchUserData()
      await this.fetchStatusData()
      await this.fetchLevelData()
    },
    async fetchUserData () {
      const res = await this.$axios.get(`/profile/${this.$route.params.payload}`)
      const { data } = res
      this.user = data.data
    },
    async fetchLevelData () {
      const res = await this.$axios.post('/level', {
        jwt: this.$store.state.jwt
      })
      const { data } = res
      this.level = data.data
    },
    async  fetchStatusData () {
      const res = await this.$axios.get('/id.verification/status')
      const { data } = res
      this.status = data.data
    },
    async handleButton () {
      const payload = {
        companyCardStatus: this.user.verification.company_card_status,
        idCardStatus: this.user.verification.id_card_status,
        level: this.user.level.id,
        jwt: this.$store.state.jwt
      }
      this.$axios.setHeader('Authorization', `Bearer ${this.$store.state.token}`)
      const res = await this.$axios.post(`/id.verification/updateStatus/${this.user.verification.id}`, payload)
      const { data } = res
      if (data.data) {
        await this.init()
      } else {
        this.$toast.error('cant update status')
      }
    }
  }
}
</script>
