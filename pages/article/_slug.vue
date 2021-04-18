<template>
  <div class="container mx-auto">
    <template v-if="article && article.show">
      <div class="max-w-[600px] mx-5 lg:mx-auto mb-3">
        <img :src="article.image ? article.image : 'https://dummyimage.com/600x400/000/fff'" alt="article image">
      </div>
      <p class="text-5xl font-semibold text-center mb-2">
        {{ article.title }}
      </p>
      <p class="text-lg text-gray-500 text-center mb-2">
        {{ article.brief }}
      </p>
      <div id="article-html" v-html="mark(article.text)" />
    </template>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()
export default {
  async asyncData ({ params, $axios }) {
    const res = await $axios.get(`/article/${params.slug}`)
    const { data } = res
    return { article: data.data }
  },
  data () {
    return {
      article: null
    }
  },
  methods: {
    mark (payload) {
      return md.render(payload)
    }
  }
}
</script>
