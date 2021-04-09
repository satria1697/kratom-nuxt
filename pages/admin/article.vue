<template>
  <div class="container mx-auto">
    <p class="text-center text-5xl font-semibold">
      Article Page
    </p>
    <div class="flex justify-end">
      <button class="border border-main rounded-md py-2 px-3 hover:bg-main hover:text-white transition-colors" @click="goTo('admin-add-article')">
        Tambah Data
      </button>
    </div>
    <table class="w-11/12 mx-auto lg:w-full">
      <thead class="text-left">
        <tr class="border-b-2 text-lg">
          <th class="w-1/12">
            No
          </th>
          <th>Name</th>
          <th>Hide/Show</th>
          <th class="w-2/12">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in articles"
          :key="index"
          class="border-b hover:bg-main hover:text-white py-2"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.show ? "Show" : "Hide" }}</td>
          <td>
            <button
              class="border border-yellow-400 rounded-md my-2 py-2 px-3 bg-yellow-400 hover:bg-white focus:outline-none hover:text-yellow-400"
              @click="handleModal(item.id)"
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
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const res = await $axios.$get('/article')
    const { data } = res
    return { articles: data }
  },
  data () {
    return {
    }
  },
  methods: {
    handleModal (payload) {
      console.log(payload)
    },
    handleDelete (payload) {
      console.log(payload)
    },
    goTo (payload) {
      this.$router.push({ name: payload })
    }
  }
}
</script>
