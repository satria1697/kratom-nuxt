<template>
  <div class="container mx-auto w-screen">
    <div v-if="isLoading && !goods" class="mx-auto">
      <span class="animate-pulse">Loading Data</span>
    </div>
    <div v-else-if="goods" class="flex flex-col lg:flex-row">
      <div class="w-11/12 mx-auto lg:w-1/2 mb-3 lg:mb-0">
        <img
          :src="
            goods.image
              ? goods.image
              : 'https://dummyimage.com/600x400/000/fff'
          "
          :alt="goods.name"
        >
      </div>
      <div
        class="flex flex-col mx-auto lg:mx-3 w-11/12 lg:w-1/2 p-4 h-full"
      >
        <div class="flex justify-between">
          <span class="text-3xl text-main font-bold">{{ goods.name }}</span>
          <div class="text-md bg-main rounded-full px-2 flex">
            <span class="text-white my-auto items-center">{{ goods.category.name }}</span>
          </div>
        </div>

        <span class="text-2xl">USD {{ goods.price }}</span>
        <span class="font-semibold text-lg">{{ goods.brief }}</span>
        <span class="text-lg">{{ goods.description }}</span>
        <div class="border-2 rounded-md py-3 px-4">
          <span class="font-semibold text-xl">Set Amount</span>
          <div class="flex mb-3">
            <krt-button
              text="-"
              @on-click="changeTotal('minus')"
            />
            <input
              v-model="total"
              class="focus:outline-none px-2 py-1 w-[50px] h-[42px]"
              type="number"
              @change="changeTotal"
            >
            <krt-button
              text="+"
              @on-click="changeTotal('plus')"
            />
            <span class="my-auto ml-4">{{ goods.stock }} left</span>
          </div>
          <krt-button text="Add to Cart" @on-click="sendCart()">
            Add to Cart
          </krt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from '~/mixin/common'
import KrtButton from '~/components/krt/Button'

export default {
  components: { KrtButton },
  mixins: [common],
  async asyncData ({ params, store }) {
    await store.dispatch('api/goods/getGoodById', params.id)
    return { goods: store.state.api.goods.good }
  },
  data () {
    return {
      goods: null,
      total: 1
    }
  },
  methods: {
    changeTotal (payload) {
      if (payload === 'plus') {
        if (this.total >= this.goods.stock) {
          this.total = Number(this.goods.stock)
        } else {
          this.total += 1
        }
      } else if (payload === 'minus') {
        if (this.total <= 1) {
          this.total = 1
        } else {
          this.total -= 1
        }
      }
    },
    sendCart () {
      if (!this.jwt) {
        this.goTo('login')
      } else if (this.total) {
        const payload = {
          id: this.goods.id,
          buying: this.total,
          status: 2,
          jwt: this.$store.state.jwt
        }
        const res = this.$store.dispatch('api/goods/postGoodCart', payload)
        if (res.data) { this.goTo('cart') }
      } else {
        this.$toast.error('Total item cant empty')
      }
    }
  }
}
</script>
