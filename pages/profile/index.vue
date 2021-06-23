<template>
  <div class="container mx-auto">
    <div class="flex gap-4">
      <div class="w-1/4 border rounded-md p-3 flex gap-4 flex-col h-full">
        <div v-for="(item, index) in dataSidebar" :key="index" @click="openSidebar(item.key)">
          <span class="cursor-pointer hover:underline normal-case">{{ item.desc }}</span>
        </div>
      </div>
      <div class="w-3/4">
        <profile-bar v-if="sidebar.profile" :user="user" />
        <setting-bar v-if="sidebar.setting" :user="user" @get-data="init" />
        <verification-bar v-if="sidebar.verification" :user="user" @get-data="init" />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileBar from '~/components/profile/Profile'
import SettingBar from '~/components/profile/Setting'
import VerificationBar from '~/components/profile/Verification'
import common from '~/mixin/common'
export default {
  name: 'ProfilePage',
  components: { VerificationBar, SettingBar, ProfileBar },
  mixins: [common],
  data () {
    return {
      dataSidebar: [
        {
          key: 'profile',
          desc: 'Profile'
        }, {
          key: 'verification',
          desc: 'Verification'
        }, {
          key: 'setting',
          desc: 'Setting'
        }],
      sidebar: {
        profile: false,
        verification: false,
        setting: false
      },
      user: {}
    }
  },
  head () {
    return {
      title: `GlobalIndo International | ${this.user.profile ? this.user.profile.name : ''}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `GlobalIndo International | ${this.user.profile ? this.user.profile.name : ''}`
        }
      ]
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    userId () {
      if (this.userInfo) {
        return this.userInfo.id
      }
      return 0
    }
  },
  async mounted () {
    await this.init()
    this.sidebar.profile = true
  },
  methods: {
    async init () {
      await this.$store.dispatch('api/profile/getProfileById', this.userId)
      this.user = this.$store.state.api.profile.profile
    },
    openSidebar (payload) {
      for (const sb in this.sidebar) {
        this.sidebar[sb] = false
      }
      this.sidebar[payload] = !this.sidebar[payload]
    }
  }
}
</script>
