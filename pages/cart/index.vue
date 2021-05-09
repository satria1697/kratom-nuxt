<template>
  <div v-if="!cart" class="flex justify-center items-center w-3/4 mx-auto">
    <div v-if="!token" class="flex flex-col w-full">
      <span class="text-4xl font-semibold mb-3 mx-auto">Login to add cart</span>
      <krt-button text="Go To Login Page" @onClick="goTo('login')" />
    </div>
    <span v-else class="text-4xl animate-pulse">Loading your cart</span>
  </div>
  <div v-else class="container mx-auto w-screen">
    <div class="flex flex-col w-3/4 mx-auto">
      <span class="text-4xl font-semibold mb-3">Cart list</span>
      <div v-if="!cart.cart.length" class="flex justify-center items-center">
        <span class="text-4xl">No Cart</span>
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
              @onClick="changeTotal(opt, 'minus')"
            />
            <input
              v-model="opt.buying"
              class="focus:outline-none p-0.5 w-[50px] h-[42px]"
              type="number"
              @change="changeTotal"
            >
            <krt-button
              text="+"
              @onClick="changeTotal(opt, 'plus')"
            />
            <span class="my-auto ml-4">{{ opt.goods.stock }} left</span>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <krt-button v-if="cart.cart.length" text="Checkout" @onClick="handleCheckout" />
        <krt-button v-else text="See Our Product" @onClick="goTo('index')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cart: null
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  mounted () {
    if (this.token) {
      this.init()
    }
  },
  methods: {
    init () {
      const payload = {
        jwt: this.$store.state.jwt
      }
      this.$axios.post('/goods/cart/find', payload, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then((res) => {
        const { data } = res
        this.cart = data.data
      })
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
    handleCheckout () {
      const payload = {
        jwt: this.$store.state.jwt
      }
      this.$axios.post('/goods/cart/checkout', payload, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then((res) => {
        console.log(res)
      })
    },
    handleDelete (payload) {
      this.$axios.delete(`/goods/cart/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then(() => {
        this.$toast.success('Cart item deleted')
        this.init()
      })
    }
  }
}
</script>
