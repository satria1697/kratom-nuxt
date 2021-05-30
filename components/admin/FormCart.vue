<template>
  <krt-modal modal-title="Cart Modal" @close-modal="handleClose">
    <template #body>
      <div>
        <template v-if="cart.user && cart.goods">
          <krt-detail title-text="Buyer" :text="cart.user.name" />
          <div class="flex gap-x-8">
            <krt-detail title-text="Goods Name" :text="cart.goods.name" />
            <krt-detail title-text="Goods Buy" :text="cart.buying" />
          </div>
        </template>
        <div class="mb-3 flex flex-col">
          <span>Cart Status</span>
          <select v-model="cart.status">
            <option v-for="(opt, index) in status" :key="index" :value="opt">
              {{ opt.description }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <krt-button text="Update" @on-click="handleUpdate" />
      </div>
    </template>
  </krt-modal>
</template>

<script>
import KrtModal from '~/components/krt/Modal'
import KrtDetail from '~/components/krt/Detail'
import KrtButton from '~/components/krt/Button'
export default {
  name: 'FormCartModal',
  components: { KrtButton, KrtDetail, KrtModal },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      cart: {
        status: null
      }
    }
  },
  computed: {
    status () {
      return this.$store.state.api.cart.status
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      await this.$store.dispatch('api/cart/getStatus')
      const res = await this.$store.dispatch('api/cart/getCartById', { id: this.id })
      this.cart = res
    },
    handleClose () {
      this.$emit('close-modal')
    },
    async handleUpdate () {
      const payload = {
        id: this.cart.id,
        status: this.cart.status.id
      }
      const res = await this.$store.dispatch('api/cart/updateCartStatus', payload)
      console.log(res)
    }
  }
}
</script>
