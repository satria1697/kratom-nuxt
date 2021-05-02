<template>
  <div class="flex flex-col border rounded-md p-3">
    <span class="text-2xl font-semibold mb-3">Profile</span>
    <div class="flex gap-x-10 w-5/6">
      <div class="flex flex-col mb-3 w-1/2">
        <span>Name</span>
        <span>HC Andhika Satria</span>
      </div>
      <div class="flex flex-col mb-3 w-1/2">
        <span>Company</span>
        <span>HC Indonesia Logistik</span>
      </div>
    </div>
    <div class="flex gap-x-10 w-5/6">
      <div class="flex flex-col mb-3 w-1/2">
        <span>Email</span>
        <span>HC andhikasatriab@gmail.com</span>
      </div>
      <div class="flex flex-col mb-3 w-1/2">
        <span>Position</span>
        <span>HC Tech Lead</span>
      </div>
    </div>
    <div class="flex gap-x-10 w-5/6">
      <span class="text-xl font-semibold mb-3">Riwayat Transaksi</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileBar'
}
</script>
