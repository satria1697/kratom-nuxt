<template>
  <div class="container mx-auto w-screen">
    <div v-if="isLoading && !goods" class="mx-auto">
      <span class="animate-pulse">Loading Data</span>
    </div>
    <div v-else class="flex flex-col lg:flex-row">
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
            <button
              class="px-2 bg-main text-white hover:opacity-80"
              @click="changeTotal('minus')"
            >
              -
            </button>
            <input
              v-model="total"
              class="focus:outline-none px-2 py-1"
              style="width: 50px"
              type="number"
              @change="changeTotal"
            >
            <button
              class="px-2 bg-main text-white hover:opacity-80"
              @click="changeTotal('plus')"
            >
              +
            </button>
            <span class="my-auto ml-4">{{ goods.stock }} left</span>
          </div>
          <button class="py-2 px-3 bg-main text-white rounded-md" @click="sendCart()">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $axios }) {
    const res = await $axios.$get(`/goods/${params.id}`)
    const { data } = res
    return { goods: data }
  },
  data () {
    return {
      isLoading: false,
      goods: null,
      total: 0
    }
  },
  computed: {
    jwtToken () {
      return this.$store.state.jwt
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
        if (this.total <= 0) {
          this.total = 0
        } else {
          this.total -= 1
        }
      }
    },
    sendCart () {
      if (!this.jwtToken) {
        this.goTo('login')
      } else if (this.total) {
        const payload = {
          id: this.goods.id,
          buying: this.total,
          status: 2,
          jwt: this.$store.state.jwt
        }
        this.$axios.post('/goods/cart', payload, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        }).then((res) => {
          if (res.status === 200) {
            this.goTo('cart')
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        this.$toast.error('Total item cant empty')
      }
    },
    goTo (payload) {
      this.$router.push({ name: payload })
    }
  }
}
</script>
