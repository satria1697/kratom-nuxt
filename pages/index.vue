<template>
  <div class="container w-screen mx-auto">
    <img class="mx-auto mb-2 lg:w-1/4 w-2/3" alt="Logo-image" :src="require('../assets/png/logo.png')">
    <select v-model="selectedCategory" class="rounded-md mb-3" @change="getGoods">
      <option v-for="(item, index) in category" :key="index" :value="item">
        {{ item.name }}
      </option>
    </select>
    <div class="grid lg:grid-cols-4 lg:gap-10 lg:flex-row mx-auto w-full">
      <div
        v-for="(item, idx) in goods"
        :key="idx"
        class="shadow-2xl mb-4 lg:mb-0 p-8 mx-auto w-3/4 lg:w-full flex flex-col rounded-lg bg-main hover:bg-main-light transition-colors"
      >
        <div class="cursor-pointer" @click="goTo('detail-id', {id: item.id})">
          <img
            :src="
              item.image ? item.image : 'https://dummyimage.com/600x400/000/fff'
            "
            :alt="item.name"
          >
        </div>
        <span class="mx-auto text-white text-2xl mt-auto">{{ item.name }}</span>
        <span class="mx-auto font-semibold">USD {{ item.price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import common from '~/mixin/common'

export default {
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
        name: 'All'
      }],
      selectedCategory: null
    }
  },
  head () {
    return {
      title: 'Kratomedical',
      meta: [
        {
          hid: 'All you can get',
          name: 'All you can get',
          content: 'Hompage of kratomedical'
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
