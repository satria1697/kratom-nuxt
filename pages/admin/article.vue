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
      <krt-datatable
        :options="articleMap"
        :columns="columns"
        @on-edit="handleEdit"
        @on-delete="handleDelete"
      />
    </template>
  </div>
</template>

<script>
import KrtDatatable from '~/components/krt/Datatable'
export default {
  components: { KrtDatatable },
  middleware: 'admin',
  data () {
    return {
      columns: [
        {
          key: 'id',
          name: 'ID'
        },
        {
          key: 'title',
          name: 'Title'
        },
        {
          key: 'brief',
          name: 'Brief Description'
        },
        {
          key: 'show',
          name: 'Article Show?'
        }
      ],
      isLoading: false
    }
  },
  computed: {
    articles () {
      return this.$store.state.api.article.articles
    },
    articleMap () {
      return this.articles.map((article) => {
        return {
          id: article.id,
          title: article.title,
          brief: article.brief,
          show: article.show ? 'Show' : 'None',
          slug: article.slug
        }
      })
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.isLoading = true
      await this.$store.dispatch('api/article/getArticles')
      this.isLoading = false
    },
    async handleDelete (payload) {
      const data = { jwt: this.$store.state.jwt, id: payload.id }
      const res = await this.$store.dispatch('api/article/deleteArticle', data)
      if (res.data.success) {
        this.$toast.success('Article Deleted')
        await this.init()
      }
    },
    goTo (payload, params) {
      this.$router.push({ name: payload, params })
    },
    handleEdit (payload) {
      this.goTo('admin-add-article-slug', { slug: payload.slug })
    }
  }
}
</script>
