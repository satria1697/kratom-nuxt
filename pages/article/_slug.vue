<template>
  <div class="container mx-auto pt-5 sm:pt-10">
    <template v-if="article && article.show">
      <div class="max-w-[600px] mx-5 lg:mx-auto mb-3">
        <img :src="article.image ? article.image : 'https://dummyimage.com/600x400/000/fff'" alt="article image">
      </div>
      <p class="text-5xl font-semibold text-center mb-2">
        {{ langState === "en" ? article.title : article.title_id }}
      </p>
      <p class="text-lg text-gray-500 text-center mb-2">
        {{ langState === "en" ? article.brief : article.brief_id }}
      </p>
      <div id="article-html" v-html="mark(langState === 'en' ? article.text : article.text_id)" />
    </template>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import common from '~/mixin/common'
const md = new MarkdownIt()
export default {
  name: 'ArticleSlug',
  mixins: [common],
  async asyncData ({ params, store }) {
    await store.dispatch('api/article/getArticleById', params.slug)
    return { article: store.state.api.article.article }
  },
  data () {
    return {
      article: null
    }
  },
  head () {
    return {
      title: `${this.article.title} | GlobalIndo International`,
      meta: [
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.article.text
        }
      ]
    }
  },
  methods: {
    mark (payload) {
      return md.render(payload)
    }
  }
}
</script>
