<template>
  <krt-modal :is-loading="isLoading" modal-title="Goods Form" @close-modal="closeModal">
    <template #body>
      <div class="mb-3">
        <p>Name</p>
        <input
          v-model="goods.name"
          type="text"
          class="py-2 px-3 border w-full rounded-md"
        >
      </div>
      <div class="mb-3">
        <p>Brief Description</p>
        <input
          v-model="goods.brief"
          type="text"
          class="py-2 px-3 border w-full rounded-md"
        >
      </div>
      <div class="mb-3">
        <p>Description</p>
        <textarea
          v-model="goods.description"
          class="py-2 px-3 border w-full rounded-md"
        />
      </div>
      <div class="mb-3">
        <p>Categories</p>
        <select v-model="goods.category" class="rounded-md py-2 px-3 w-full">
          <option v-for="(item, index) in categories" :key="index" :value="item">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="flex gap-2 mb-3">
        <div class="w-1/2">
          <p>Price</p>
          <input
            v-model="goods.price"
            type="number"
            class="py-2 px-3 border w-full rounded-md"
          >
        </div>
        <div class="w-1/2">
          <p>Stock</p>
          <input
            v-model="goods.stock"
            type="number"
            class="py-2 px-3 border w-full rounded-md"
          >
        </div>
      </div>
      <div
        class="flex flex-col mb-3 border-2 border-gray-600 rounded-md py-2 px-3"
      >
        <p>Image</p>
        <input class="mb-3" type="file" @change="handleImage">
        <img
          v-if="goods.image"
          :src="
            goods.image"
          alt="goods image"
        >
      </div>
      <span
        v-if="set.show"
        class="text-white py-1 px-2 mb-2 mx-3 w-auto rounded-full"
        :class="set.success ? 'bg-green-900' : 'bg-red-900'"
      >{{ set.message }}</span>
      <div
        v-if="isLoading"
        class="w-full text-center py-2 px-3 text-main rounded-md animate-pulse"
      >
        Loading
      </div>
      <button
        v-else
        class="bg-main py-2 px-3 text-white float-right rounded-md"
        @click="submit"
      >
        Save
      </button>
    </template>
  </krt-modal>
</template>

<script>
import { imgToBase64 } from '~/lib/misc/helper'
import KrtModal from '~/components/krt/Modal'

export default {
  name: 'FormGoods',
  components: { KrtModal },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      goods: {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        image: null,
        brief: '',
        category: null
      },
      set: {
        message: '',
        success: false,
        show: false
      },
      isLoading: false,
      categories: []
    }
  },
  async created () {
    this.isLoading = true
    await this.$store.dispatch('api/category/getCategory')
    this.categories = this.$store.state.api.category.category
    this.goods.category = this.categories[0]
    if (this.id > 0) {
      await this.$store.dispatch('api/goods/getGoodById', this.id)
      this.goods = JSON.parse(JSON.stringify(this.$store.state.api.goods.good))
    }
    this.isLoading = false
  },
  methods: {
    closeModal () {
      this.$emit('close-modal')
    },
    async submit () {
      this.isLoading = true
      let payload = {
        name: this.goods.name,
        description: this.goods.description,
        price: this.goods.price.toString(),
        stock: this.goods.stock.toString(),
        image: this.goods.image,
        brief: this.goods.brief,
        categoryId: this.goods.category.id
      }

      let res
      if (this.id === 0) {
        payload = { ...payload, id: '' }
        res = await this.$store.dispatch('api/goods/postGoods', payload)
      } else if (this.id > 0) {
        payload = { ...payload, id: this.id }
        res = await this.$store.dispatch('api/goods/postGoods', payload)
      }
      this.isLoading = false
      if (res) {
        this.set.message = 'success'
        this.set.success = true
        this.set.show = true
        if (this.id === 0) {
          this.goods.description = ''
          this.goods.name = ''
          this.goods.price = 0
          this.goods.stock = 0
          this.goods.image = null
          this.goods.brief = ''
        }
        setTimeout(() => {
          this.set.show = false
        }, 3000)
      } else {
        this.set.message = 'error'
        this.set.success = false
        this.set.show = true
        setTimeout(() => {
          this.set.show = false
        }, 3000)
      }
    },
    async handleImage (e) {
      this.goods.image = await imgToBase64(e)
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
