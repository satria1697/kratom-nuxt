<template>
  <div class="container mx-auto">
    <p class="text-center text-5xl font-semibold">
      Article Page
    </p>
    <div class="flex justify-end">
      <button class="mt-3 lg:mt-0 mr-3 lg:mr-0 border border-main rounded-md py-2 px-3 hover:bg-main hover:text-white transition-colors" @click="goTo('admin-add-article-slug', {slug: 'add'})">
        Tambah Data
      </button>
    </div>
    <div v-if="isLoading">
      <p class="animate-pulse text-lg">
        Loading data
      </p>
    </div>
    <template v-else>
      <table class="w-11/12 mx-auto lg:w-full">
        <thead class="text-left">
          <tr class="border-b-2 text-lg">
            <th class="w-1/12">
              No
            </th>
            <th>Name</th>
            <th>Brief</th>
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
            class="border-b hover:bg-main hover:text-white py-2 cursor-pointer"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.brief }}</td>
            <td>{{ item.show ? "Show" : "Hide" }}</td>
            <td>
              <button
                class="border border-yellow-400 rounded-md my-2 py-2 px-3 bg-yellow-400 hover:bg-white focus:outline-none hover:text-yellow-400"
                @click="goTo('admin-add-article-slug', {slug: item.slug})"
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
  middleware: 'admin',
  data () {
    return {
      articles: null,
      isLoading: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.isLoading = true
      this.$axios.get('/article').then((res) => {
        const { data } = res
        this.articles = data.data
      }).finally(() => {
        this.isLoading = false
      })
    },
    handleDelete (payload) {
      this.$axios.delete(`/article/${payload}`, { jwt: this.$store.state.jwt }, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then((res) => {
        if (res.data.success) {
          this.$toast.success('Article Deleted')
          this.init()
        }
      }).catch(() => {
        this.$toast.error('Article Not Deleted, something is wrong with server')
      })
    },
    goTo (payload, params) {
      this.$router.push({ name: payload, params })
    }
  }
}
</script>
