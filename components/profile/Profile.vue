<template>
  <div class="flex flex-col border rounded-md p-3">
    <div v-if="!Object.entries(user)">
      <span class="animate-pulse">Loading Data</span>
    </div>
    <template v-else>
      <span class="text-2xl font-semibold mb-3">Profile</span>
      <div class="flex gap-x-10 w-5/6">
        <div class="flex flex-col mb-3 w-1/2">
          <span>Name</span>
          <span>{{ user.profile.name || '-' }}</span>
        </div>
        <div class="flex flex-col mb-3 w-1/2">
          <span>Company</span>
          <span>{{ user.profile.company || '-' }}</span>
        </div>
      </div>
      <div class="flex gap-x-10 w-5/6">
        <div class="flex flex-col mb-3 w-1/2">
          <span>Email</span>
          <span>{{ user.email || '-' }}</span>
        </div>
        <div class="flex flex-col mb-3 w-1/2">
          <span>Position</span>
          <span>{{ user.profile.position || '-' }}</span>
        </div>
      </div>
      <div class="flex gap-x-10 w-5/6">
        <span class="text-xl font-semibold mb-3">Riwayat Transaksi</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ProfileBar',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
