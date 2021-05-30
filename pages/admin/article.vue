<template>
  <div class="container mx-auto">
    <p class="text-center text-5xl font-semibold">
      Article Page
    </p>
    <div v-if="isLoading">
      <p class="animate-pulse text-lg">
        Loading data
      </p>
    </div>
    <template v-else>
      <krt-datatable
        :options="articleMap"
        :columns="columns"
        :query="query"
        @on-edit="handleEdit"
        @on-delete="handleDelete"
        @data-changed="handleDataChanged"
      />
    </template>
  </div>
</template>

<script>
import KrtDatatable from '~/components/krt/Datatable'
import common from '~/mixin/common'
export default {
  components: { KrtDatatable },
  mixins: [common],
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
      query: {
        search: ''
      }
    }
  },
  head () {
    return {
      title: 'Admin | Article'
    }
  },
  computed: {
    articles () {
      return this.$store.state.api.article.articles
    },
    articleMap () {
      if (this.articles) {
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
      return []
    }
  },
  created () {
    this.isLoading = true
    this.init()
  },
  methods: {
    async init () {
      await this.$store.dispatch('api/article/getArticles', this.query)
      this.isLoading = false
    },
    async handleDelete (payload) {
      const data = { jwt: this.$store.state.jwt, id: payload.id }
      const res = await this.$store.dispatch('api/article/deleteArticle', data)
      if (res.data.success) {
        this.$toast.success('Article Deleted')

        this.isLoading = true
        await this.init()
      }
    },
    handleEdit (payload) {
      this.goTo('admin-add-article-slug', { slug: payload.slug })
    },
    async handleDataChanged (payload) {
      this.query = payload
      await this.init()
    }
  }
}
</script>
