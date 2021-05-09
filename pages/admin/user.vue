<template>
  <div class="container mx-auto">
    <p class="text-center text-5xl font-semibold">
      User Page
    </p>
    <p v-if="isLoading" class="text-lg animate-pulse">
      Loading Data
    </p>
    <template v-else>
      <table class="w-11/12 mx-auto lg:w-full">
        <thead class="text-left">
          <tr class="border-b-2 text-lg">
            <th class="w-1/12">
              No
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th class="w-2/12">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in users"
            :key="index"
            class="border-b hover:bg-main hover:text-white py-2"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.profile.company || '-' }}</td>
            <td>
              <button
                class="border border-yellow-400 rounded-md my-2 py-2 px-3 bg-yellow-400 hover:bg-white focus:outline-none hover:text-yellow-400"
                @click="handleButton(item.id)"
              >
                Edit
              </button>
              <button
                class="border border-red-700 rounded-md my-2 py-2 px-3 bg-red-700 hover:bg-white focus:outline-none hover:text-red-700"
                @click="handleDelete(item.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      users: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      await this.$store.dispatch('api/profile/getProfiles')
      this.users = this.$store.state.api.profile.profiles
    },
    handleButton (payload) {
      this.$router.push({ name: 'admin-add-user-detail', params: { payload } })
    },
    handleDelete (payload) {
      console.log(payload)
    }
  }
}
</script>
