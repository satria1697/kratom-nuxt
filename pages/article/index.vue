<template>
  <div class="container mx-auto pt-10 pb-10">
    <h1 class="text-gray-800 text-center text-4xl font-light ml-3 lg:ml-0 text-center pb-4">{{ $t('article.articleTitle') }}</h1>
    <div
      v-for="(item, idx) in articles"
      :key="idx"
      class="border-b border-main p-6 pb-7 mb-1.5 mx-4 lg:mx-0 cursor-pointer hover:shadow-lg transition-shadow grid grid-cols-5 lg:flex-row"
      @click="goTo('article-slug', {slug: item.slug})"
    >
      <div class="w-full mr-3 col-span-2">
        <img alt="article-image" :src="item.image ? item.image : 'https://dummyimage.com/600x400/000/fff'">
      </div>
      <div class="flex flex-col w-full col-span-3 ml-3">
        <div class="flex flex-col lg:flex-row justify-between mb-2">
          <span class="text-3xl font-light text-main tracking-wide">
            {{ langState === "en" ? item.title : item.title_id }}
          </span>
          <span class="text-gray-500 text-sm">{{ $t('article.createdAt') }} {{ convertTime(item.created_at) }}</span>
        </div>
        <span class="text-md text-gray-700">{{ langState === "en" ? item.title : item.title_id }}</span>
        <p id="detail" class="pt-3 text-gray-900 text-xl font-light">{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import common from '~/mixin/common'
export default {
  mixins: [common],
  async asyncData ({ store }) {
    await store.dispatch('api/article/getArticles')
    return { articles: store.state.api.article.articles }
  },
  head () {
    return {
      title: 'GlobalIndo International | Blog',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Blog Page of GlobalIndon International'
        }
      ]
    }
  },
  methods: {
    convertTime (payload) {
      return dayjs(payload).format('dddd, DD/MMMM/YYYY HH:mm')
    }
  }
}
</script>

<style scoped>
#detail {
  overflow: hidden;
  max-width: 25ch;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
