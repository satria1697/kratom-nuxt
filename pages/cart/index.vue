<template>
  <div v-if="!cart" class="flex justify-center items-center w-3/4 mx-auto">
    <div v-if="!token" class="flex flex-col w-full">
      <span class="text-4xl font-semibold mb-3 mx-auto">Login to add cart</span>
      <button class="w-2/3 lg:w-1/3 mx-auto bg-main py-2 px-3 text-white border border-main hover:bg-white hover:text-main rounded-md " @click="goTo('login')">
        Go To Login Page
      </button>
    </div>
    <span v-else class="text-4xl animate-pulse">Loading your cart</span>
  </div>
  <div v-else class="container mx-auto w-screen">
    <div class="flex flex-col w-3/4 mx-auto">
      <span class="text-4xl font-semibold mb-3">Cart list</span>
      <div v-if="!cart.cart.length" class="flex justify-center items-center">
        <span class="text-4xl">No Cart</span>
      </div>
      <div v-for="(opt, idx) in cart.cart" v-else :key="idx" class="mb-3 flex lg:flex-row flex-col border-2 border-main rounded-lg p-14">
        <img class="w-full lg:w-1/6" :src="opt.kratom.image ? opt.kratom.image : 'https://dummyimage.com/400x400/000/fff'" :alt="opt.kratom.name">
        <div class="w-full lg:w-2/3 flex flex-col ml-3">
          <span class="text-2xl font-semibold">{{ opt.kratom.name }}</span>
          <span>{{ opt.kratom.description }}</span>
          <div class="flex mt-auto">
            <button
              class="px-2 bg-main text-white hover:opacity-80"
              @click="changeTotal(opt, 'minus')"
            >
              -
            </button>
            <input
              v-model="opt.buying"
              class="focus:outline-none p-0.5"
              style="width: 50px"
              type="number"
              @change="changeTotal"
            >
            <button
              class="px-2 bg-main text-white hover:opacity-80"
              @click="changeTotal(opt, 'plus')"
            >
              +
            </button>
            <span class="my-auto ml-4">{{ opt.kratom.stock }} left</span>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <button class="py-2 px-3 bg-main rounded-md text-white" @click="handleCheckout">
          Checkout
        </button>
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
      const payload = {
        jwt: this.$store.state.jwt
      }
      this.$axios.post('/kratom/cart/find', payload, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then((res) => {
        const { data } = res
        this.cart = data.data
      })
    }
  },
  methods: {
    changeTotal (data, payload) {
      if (payload === 'plus') {
        if (data.buying >= data.kratom.stock) {
          data.buying = Number(data.kratom.stock)
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
      this.$axios.post('/kratom/cart/checkout', payload, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
