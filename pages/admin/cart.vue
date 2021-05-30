<template>
  <div class="container mx-auto">
    <form-cart-modal v-if="modal.cart" :id="modal.id" @close-modal="handleModal" />
    <p class="text-center text-5xl font-semibold">
      Cart Page
    </p>
    <div v-if="isLoading">
      <p class="animate-pulse text-lg">
        Loading data
      </p>
    </div>
    <template v-else>
      <krt-datatable
        :query="query"
        :options="cartsMap"
        :columns="columns"
        :is-delete="false"
        @on-edit="handleModal"
      />
    </template>
  </div>
</template>

<script>
import KrtDatatable from '~/components/krt/Datatable'
import common from '~/mixin/common'
import FormCartModal from '~/components/admin/FormCart'
export default {
  components: { FormCartModal, KrtDatatable },
  mixins: [common],
  middleware: 'admin',
  data () {
    return {
      columns: [
        {
          key: 'id',
          name: 'ID'
        },
        {
          key: 'name',
          name: 'Goods Name'
        },
        {
          key: 'user',
          name: 'User Name'
        },
        {
          key: 'email',
          name: 'User Email'
        },
        {
          key: 'status',
          name: 'Goods Status'
        },
        {
          key: 'buying',
          name: 'Goods buy'
        }
      ],
      query: {
        search: ''
      },
      modal: {
        cart: false,
        id: -1
      }
    }
  },
  head () {
    return {
      title: 'Admin | Cart'
    }
  },
  computed: {
    carts () {
      return this.$store.state.api.cart.carts
    },
    cartsMap () {
      return this.carts.map((cart) => {
        return {
          id: cart.id,
          name: cart.goods.name,
          user: cart.user.name,
          email: cart.user.email,
          status: cart.status.description,
          buying: cart.buying
        }
      })
    }
  },
  created () {
    this.isLoading = true
    this.init()
  },
  methods: {
    async init () {
      await this.$store.dispatch('api/cart/getCarts', this.query)
      this.isLoading = false
    },
    async handleModal (payload) {
      if (this.modal.cart === false) {
        this.modal.id = payload.id
        this.modal.cart = true
      } else {
        this.modal.id = -1
        this.modal.cart = false
        this.isLoading = true
        await this.init()
      }
    }
  }
}
</script>
