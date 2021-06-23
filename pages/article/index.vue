<template>
  <div class="container mx-auto">
    <span class="text-4xl ml-3 lg:ml-0">Article List</span>
    <div
      v-for="(item, idx) in articles"
      :key="idx"
      class="border-b border-main p-6 pb-7 mb-1.5 mx-4 lg:mx-0 cursor-pointer hover:shadow-lg transition-shadow flex flex-col lg:flex-row"
      @click="goTo('article-slug', {slug: item.slug})"
    >
      <div class="w-full lg:w-[200px] mr-3">
        <img alt="article-image" :src="item.image ? item.image : 'https://dummyimage.com/600x400/000/fff'">
      </div>
      <div class="flex flex-col w-full">
        <div class="flex flex-col lg:flex-row justify-between mb-2">
          <span class="text-3xl font-semibold">
            {{ item.title }}
          </span>
          <span class="text-gray-500 text-sm">Created at {{ convertTime(item.created_at) }}</span>
        </div>
        <span class="mx-10 text-xl font-helvetica">{{ item.brief }}</span>
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
