<template>
  <div class="container mx-auto w-screen pt-10 pb-10">
    <div v-if="isLoading && !goods" class="mx-auto">
      <span class="animate-pulse">{{ $t('goods.loadingGoods') }}</span>
    </div>
    <div v-else-if="goods" class="flex flex-col lg:flex-row">
      <div class="w-11/12 mx-auto lg:w-1/2 mb-3 lg:mb-0">
        <img
          :src="
            goods.image
              ? goods.image
              : 'https://dummyimage.com/600x400/000/fff'
          "
          :alt="langState === 'en'? goods.name: goods.name_id"
        >
      </div>
      <div
        class="flex flex-col mx-auto lg:mx-3 w-11/12 lg:w-1/2 h-full"
      >
        <div class="flex justify-between">
          <span class="text-4xl text-main font-light tracking-wider">{{ langState === "en" ? goods.name : goods.name_id }}</span>
          <div class="text-md bg-main rounded-full px-2 flex">
            <span class="text-white my-auto items-center">{{ goods.category.name }}</span>
          </div>
        </div>
        <span class="text-2xl text-gray-700 font-light tracking-wider pt-2">USD {{ goods.price }}</span>
        <div class="pt-2 border-b-2 pb-3 border-gray-300">
          <span class="font-medium text-xl text-gray-500">{{ $t('goods.setAmount') }}</span>
          <div class="grid grid-cols-3 sm:grid-cols-4 mb-3 justify-center flex">
            <div>
              <krt-button
              text="-"
              @on-click="changeTotal('minus')"
              />
              <input
                v-model="total"
                class="focus:outline-none px-2 py-1 w-[45px] sm:w-[50px] h-[42px]"
                type="number"
                @change="changeTotal"
              >
              <krt-button
                text="+"
                @on-click="changeTotal('plus')"
              />
            </div>
            <krt-button :text="$t('button.addToCart')" @on-click="sendCart()" class="col-span-2 sm:col-span-3">
            {{ $t('goods.addToCart') }}
            </krt-button>
          </div>
          <div class="my-auto mx-8 font-medium text-lg text-gray-600">{{ goods.stock }} left</div>
        </div>
        <h1 class="font-medium text-xl text-gray-600 pt-3">Description:</h1>
        <span class="font-semibold text-lg">{{ langState === "en" ? goods.brief : goods.brief_id }}</span>
        <span class="text-lg">{{ langState === "en" ? goods.description : goods.description_id }}</span>
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
  head () {
    return {
      title: ` ${this.goods.name} | GlobalIndo International`,
      meta: [
        {
          hid: 'og:description',
          name: 'og:description',
          content: `${this.goods.description}`
        }
      ]
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
