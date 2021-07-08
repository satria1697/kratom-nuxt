<template>
  <div v-if="!cart" class="flex justify-center items-center w-3/4 mx-auto">
    <div v-if="!jwt" class="flex flex-col w-full">
      <span class="text-4xl font-semibold mb-3 mx-auto">{{ $t('cart.loginCart') }}</span>
      <krt-button :text="$t('button.goToLoginPage')" @on-click="goTo('login')" />
    </div>
    <span v-else class="text-4xl animate-pulse">{{ $t('cart.loadingCart') }}</span>
  </div>
  <div v-else class="container mx-auto w-screen">
    <div class="flex flex-col w-3/4 mx-auto">
      <span class="text-4xl font-semibold mb-3">{{ $t('cart.cartTitle') }}</span>
      <div v-if="!cartLength" class="flex justify-center items-center">
        <span class="text-4xl">{{ $t('cart.noCart') }}</span>
      </div>
      <div
        v-for="(opt, idx) in cart.cart"
        v-else
        :key="idx"
        class="group mb-3 flex lg:flex-row flex-col border-2 border-main rounded-lg p-14"
      >
        <img class="w-full lg:w-1/6" :src="opt.goods.image ? opt.goods.image : 'https://dummyimage.com/600x400/000/fff'" :alt="opt.goods.name">
        <div class="w-full lg:w-2/3 flex flex-col ml-3">
          <div>
            <span class="text-2xl font-semibold">{{ opt.goods.name }}</span>
            <span class="opacity-0 group-hover:opacity-100 group-hover:bg-red-600 border group-hover:border-red-600 rounded-lg text-white group-hover:px-4 cursor-pointer" @click="handleDelete(opt)">Delete</span>
          </div>
          <span>{{ opt.goods.description }}</span>
          <div class="flex mt-auto">
            <krt-button
              text="-"
              @on-click="changeTotal(opt, 'minus')"
            />
            <input
              v-model="opt.buying"
              class="focus:outline-none p-0.5 w-[50px] h-[42px]"
              type="number"
              @change="changeTotal"
            >
            <krt-button
              text="+"
              @on-click="changeTotal(opt, 'plus')"
            />
            <span class="my-auto ml-4">{{ opt.goods.stock }} left</span>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <krt-button v-if="cartLength" text="Checkout" @on-click="handleCheckout" />
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
      this.$router.push({ name: payload })
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
