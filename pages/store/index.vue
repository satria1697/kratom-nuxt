<template>
  <div class="container w-screen mx-auto pt-5 sm:pt-10 pb-10">
    <div class="ml-6 sm:ml-0">
      <select v-model="selectedCategory" class="rounded-md mb-3" @change="getGoods">
        <option v-for="(item, index) in category" :key="index" :value="item">
          {{ langState === "en" ? item.name : item.name_id }}
        </option>
      </select>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:flex-row mx-auto w-full">
      <div
        v-for="(item, idx) in goods"
        :key="idx"
        class="mb-2 md:mb-4 lg:mb-0 p-2 md:p-8 mx-auto w-3/4 lg:w-full flex flex-col bg-white hover:bg-main transition-colors group"
      >
        <div class="cursor-pointer" @click="goTo('detail-id', {id: item.id})">
          <img
            :src="
              item.image ? item.image : 'https://dummyimage.com/600x400/000/fff'
            "
            :alt="item.name"
          >
        </div>
        <span class="mx-auto text-main text-2xl mt-auto tracking-wider font-light group-hover:text-white mt-3">{{ langState === "en" ? item.name : item.name_id }}</span>
        <span class="mx-auto text-gray-400 font-thin tracking-widest group-hover:text-white">USD {{ item.price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import common from '~/mixin/common'

export default {
  name: 'StorePage',
  mixins: [common],
  async asyncData ({ store }) {
    const payload = {
      filter: 1,
      category: ''
    }
    await store.dispatch('api/goods/getGoodsData', payload)
  },
  data () {
    return {
      category: [{
        id: 0,
        name: 'All',
        name_id: 'Semua'
      }],
      selectedCategory: null
    }
  },
  head () {
    return {
      title: 'GlobalIndo International',
      meta: [
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'Store'
        }
      ]
    }
  },
  computed: {
    goods () {
      return this.$store.state.api.goods.goods
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      const payload = {
        filter: 1
      }
      await this.$store.dispatch('api/category/getCategory', payload)
      const res = this.$store.state.api.category.category
      res.forEach((data) => {
        this.category.push(data)
      })
      this.selectedCategory = this.category[0]
    },
    async getGoods () {
      let payload = {
        filter: 1
      }
      if (this.selectedCategory.id) {
        payload = {
          ...payload,
          category: this.selectedCategory.id
        }
      }
      await this.$store.dispatch('api/goods/getGoodsData', payload)
    }
  }
}
</script>
