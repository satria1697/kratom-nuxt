<template>
  <div v-if="!cart" class="flex justify-center items-center w-3/4 mx-auto">
    <div v-if="!jwt" class="flex flex-col w-full">
      <span class="text-4xl font-semibold mb-3 mx-auto">{{ $t('cart.loginCart') }}</span>
      <krt-button :text="$t('button.goToLoginPage')" @on-click="goTo('login')" />
    </div>
    <span v-else class="text-4xl animate-pulse">{{ $t('cart.loadingCart') }}</span>
  </div>
  <div v-else class="pt-10">
    <div class="flex flex-col w-3/4 mx-auto">
      <h1 class="text-gray-800 text-center text-4xl font-light ml-3 lg:ml-0 text-center pb-4">{{ $t('cart.cartTitle') }}</h1>
      <div v-if="!cartLength" class="flex justify-center items-center">
        <span class="text-4xl">{{ $t('cart.noCart') }}</span>
      </div>
      <div v-else class="border-b-2 border-gray-200 grid grid-cols-5 justify-items-stretch mt-5">
        <h3 class="col-span-3 text-gray-500 text-xl font-light">Produk</h3>
        <h3 class="text-gray-500 text-xl font-light justify-self-center">Quantity</h3>
        <h3 class="text-gray-500 text-xl font-light justify-self-end">Total</h3>
      </div>
      <div v-if="cartLength" class="">
        <div
        v-for="(opt, idx) in cart.cart"
        :key="idx"
        class="group grid grid-cols-5 py-3 border-b-2 border-gray-200 items-center justify-items-center flex"
        >
          <div class="col-span-3 flex">
            <img class="w-1/3 mr-3" :src="opt.goods.image ? opt.goods.image : 'https://dummyimage.com/600x400/000/fff'" :alt="opt.goods.name">
            <div>
              <span class="text-main text-2xl mt-auto tracking-wider font-light">{{ langState === "en" ? opt.goods.name : opt.goods.name_id }}</span>
              <span class="opacity-0 group-hover:opacity-100 group-hover:bg-red-600 border group-hover:border-red-600 rounded-lg text-white group-hover:px-4 cursor-pointer" @click="handleDelete(opt)">Delete</span>
              <div class="2xl:p-8 pb-0 leading-relaxed text-base text-gray-500">{{ langState === "en" ? opt.goods.description : opt.goods.description_id }}</div>
            </div>
          </div>
          <div class="w-full lg:w-2/3 flex flex-col ml-3">
            <div class="mt-auto mb-2">
              <krt-button
                text="-"
                @on-click="changeTotal(opt, 'minus')"
              />
              <input
                v-model="opt.buying"
                class="focus:outline-none p-0.5 w-[50px] h-[42px] mx-2"
                type="number"
                @change="changeTotal"
              >
              <krt-button
                text="+"
                @on-click="changeTotal(opt, 'plus')"
              />
            </div>
            <h3 class="my-auto text-center text-gray-500 text-base">{{ opt.goods.stock }} left</h3>
          </div>
          <div class="justify-self-end">
            <h3 class="my-auto text-gray-500 text-3xl">{{opt.goods.price}}</h3>
          </div>
        </div>
      </div>
      <div class="flex justify-end pt-5">
        <krt-button v-if="cartLength" text="Checkout" @on-click="handleCheckout" class="big"/>
        <krt-button v-else :text="$t('button.seeOurProduct')" @on-click="goTo('index')" />
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
  head () {
    return {
      title: 'GlobalIndo International | Cart',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Cart Page of GlobalIndo Intl'
        }
      ]
    }
  },
  computed: {
    cart () {
      return this.$store.state.api.goods.cart
    },
    cartLength () {
      if (this.cart.cart) {
        return this.cart.cart.length
      }
      return 0
    }
  },
  created () {
    if (this.jwt) {
      this.init()
    }
  },
  methods: {
    init () {
      this.$store.dispatch('api/goods/getGoodCart')
    },
    changeTotal (data, payload) {
      if (payload === 'plus') {
        if (data.buying >= data.goods.stock) {
          data.buying = Number(data.goods.stock)
        } else {
          data.buying += 1
        }
      } else if (payload === 'minus') {
        if (data.buying <= 0) {
          data.buying = 0
        } else {
          data.buying -= 1
        }
      }
    },
    goTo (payload) {
      this.$router.push(this.localePath({ name: payload }))
    },
    async handleCheckout () {
      await this.$store.dispatch('api/goods/checkoutCart')
    },
    async handleDelete (payload) {
      const res = await this.$store.dispatch('api/goods/deleteCart', payload)
      if (res.data) {
        this.$toast.success('Cart item deleted')
        this.init()
      }
    }
  }
}
</script>
