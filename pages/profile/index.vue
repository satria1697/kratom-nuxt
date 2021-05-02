<template>
  <div class="container mx-auto">
    <div class="flex gap-4">
      <div class="w-1/4 border rounded-md p-3 flex gap-4 flex-col h-full">
        <div v-for="(item, index) in dataSidebar" :key="index" @click="openSidebar(item.key)">
          <span class="cursor-pointer hover:underline normal-case">{{ item.desc }}</span>
        </div>
      </div>
      <div class="w-3/4">
        <profile-bar v-if="sidebar.profile" />
        <setting-bar v-if="sidebar.setting" />
        <verification-bar v-if="sidebar.verification" />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileBar from '~/components/profile/Profile'
import SettingBar from '~/components/profile/Setting'
import VerificationBar from '~/components/profile/Verification'
export default {
  name: 'ProfilePage',
  components: { VerificationBar, SettingBar, ProfileBar },
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
      }
    }
  },
  mounted () {
    this.sidebar.profile = true
  },
  methods: {
    openSidebar (payload) {
      for (const sb in this.sidebar) {
        this.sidebar[sb] = false
      }
      this.sidebar[payload] = !this.sidebar[payload]
    }
  }
}
</script>
