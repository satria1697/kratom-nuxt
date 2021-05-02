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
        <input v-model="profile.email" class="rounded-md" type="text">
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
  </div>
</template>

<script>
export default {
  name: 'SettingBar',
  data () {
    return {
      profile: {
        name: '',
        company: '',
        email: '',
        position: '',
        password: ''
      }
    }
  }
}
</script>
