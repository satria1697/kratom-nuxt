<template>
  <div class="container mx-auto">
    <template v-if="article && article.show">
      <p class="text-6xl font-semibold text-center">
        {{ article.title }}
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
    const res = await $axios.get(`/article/${params.id}`)
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
