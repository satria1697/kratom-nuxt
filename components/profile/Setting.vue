<template>
  <div class="flex flex-col border rounded-md p-3">
    <span class="text-2xl font-semibold mb-3">Setting</span>
    <div class="flex gap-x-10 w-3/4">
      <div class="flex flex-col mb-3 w-1/2">
        <span>Name</span>
        <input v-model="profile.name" class="rounded-md" type="text">
      </div>
      <div class="flex flex-col mb-3 w-1/2">
        <span>Company</span>
        <input v-model="profile.company" class="rounded-md" type="text">
      </div>
    </div>
    <div class="flex gap-x-10 w-3/4">
      <div class="flex flex-col mb-3 w-1/2">
        <span>Email</span>
        <input
          v-model="profile.email"
          disabled
          class="rounded-md bg-gray-300"
          type="text"
        >
      </div>
      <div class="flex flex-col mb-3 w-1/2">
        <span>Position</span>
        <input v-model="profile.position" class="rounded-md" type="text">
      </div>
    </div>
    <div class="flex gap-x-10 w-3/4">
      <div class="flex flex-col mb-3 w-1/2">
        <span>Password</span>
        <input v-model="profile.password" class="rounded-md" type="text">
      </div>
      <div class="w-1/2" />
    </div>
    <div class="flex w-full">
      <div class="flex mb-3">
        <krt-button :text="isLoading ? 'Updating' : 'Update'" :is-loading="isLoading" @on-click="handleUpdate">
          Update
        </krt-button>
      </div>
    </div>
  </div>
</template>

<script>
import KrtButton from '~/components/krt/Button'
import common from '~/mixin/common'
export default {
  name: 'SettingBar',
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
      profile: {
        name: this.user.profile.name || '',
        company: this.user.profile.company || '',
        email: this.user.email || '',
        position: this.user.profile.position || '',
        password: ''
      }
    }
  },
  methods: {
    async handleUpdate () {
      this.isLoading = true
      const payload = {
        name: this.profile.name,
        email: this.profile.email,
        position: this.profile.position,
        company: this.profile.company,
        jwt: this.$store.state.jwt
      }
      const res = await this.$axios.post(`/profile/${this.user.id}`, payload, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      })
      const { data } = res
      if (data.success) {
        this.$emit('get-data')
        this.isLoading = false
      }
    }
  }
}
</script>
