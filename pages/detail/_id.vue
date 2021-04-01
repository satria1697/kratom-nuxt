<template>
  <div>
    <div class="container mx-auto">
      <div v-if="isLoading && !kratom" class="mx-auto">
        <span class="animate-pulse">Loading Data</span>
      </div>
      <div v-else class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/2 mb-3 lg:mb-0">
          <img
            :src="
              kratom.image
                ? kratom.image
                : 'https://dummyimage.com/400x400/000/fff'
            "
            :alt="kratom.name"
          >
        </div>
        <div
          class="flex flex-col border-2 rounded-md w-full mx-5 lg:w-1/2 p-4 h-full"
        >
          <span class="text-3xl text-main font-bold">{{ kratom.name }}</span>
          <span class="text-2xl">USD {{ kratom.price }}</span>
          <span class="font-semibold text-lg">{{ kratom.brief }}</span>
          <span class="text-lg">{{ kratom.description }}</span>
          <div>
            <div class="flex mb-3">
              <button
                class="px-2 bg-main text-white hover:opacity-80"
                @click="changeTotal('minus')"
              >
                -
              </button>
              <input
                v-model="total"
                class="focus:outline-none p-0.5"
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
              <span class="my-auto ml-4">{{ kratom.stock }} left</span>
            </div>
            <button class="py-2 px-3 bg-main text-white rounded-md" @click="sendCart()">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $axios }) {
    const res = await $axios.$get(`/kratom/${params.id}`)
    const { data } = res
    return { kratom: data }
  },
  data () {
    return {
      isLoading: false,
      kratom: null,
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
        if (this.total >= this.kratom.stock) {
          this.total = Number(this.kratom.stock)
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
          id: this.kratom.id,
          buying: this.total,
          status: 2,
          jwt: this.$store.state.jwt
        }
        this.$axios.post('/kratom/cart', payload, {
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
