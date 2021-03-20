<template>
  <div class='flex border-b-2 mb-3' style='height: 50px'>
    <div class='my-auto'>
      <span @click='goTo("index")' class='ml-2'>Ini Logo</span>
    </div>
    <div class='ml-auto my-auto'>
      <span class='mr-2 cursor-pointer'>Cart</span>
      <span class='mr-2 cursor-pointer'>User</span>
      <span @click='goTo("login")' class='mr-2 cursor-pointer'>Login</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdown: {
        user: false
      }
    }
  },
  methods: {
    goTo(payload) {
      this.$router.push({name: payload})
    },
    openDropdown(payload) {
      if (payload === "user") {
        this.dropdown.user = !this.dropdown.user
      }
    }
  }
}
</script>
