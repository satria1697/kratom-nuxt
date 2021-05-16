<template>
  <div class="flex flex-col border rounded-md p-3">
    <div v-if="!Object.entries(user)">
      <span class="animate-pulse">Loading Data</span>
    </div>
    <template v-else>
      <span class="text-2xl font-semibold mb-3">Profile</span>
      <div class="flex gap-x-10 w-5/6">
        <div class="flex flex-col mb-3 w-1/2">
          <span>Name</span>
          <span>{{ user.profile.name || '-' }}</span>
        </div>
        <div class="flex flex-col mb-3 w-1/2">
          <span>Company</span>
          <span>{{ user.profile.company || '-' }}</span>
        </div>
      </div>
      <div class="flex gap-x-10 w-5/6">
        <div class="flex flex-col mb-3 w-1/2">
          <span>Email</span>
          <span>{{ user.email || '-' }}</span>
        </div>
        <div class="flex flex-col mb-3 w-1/2">
          <span>Position</span>
          <span>{{ user.profile.position || '-' }}</span>
        </div>
      </div>
      <div class="flex gap-x-10 w-5/6 flex-col">
        <span class="text-xl font-semibold mb-3">Transaction History</span>
        <span v-if="!cartMap">Data is Loading</span>
        <krt-datatable
          v-else
          :options="cartMap"
          :columns="columns"
          :is-action="false"
        />
      </div>
    </template>
  </div>
</template>

<script>
import KrtDatatable from '~/components/krt/Datatable'
export default {
  name: 'ProfileBar',
  components: { KrtDatatable },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      columns: [
        {
          key: 'name',
          name: 'Goods Name'
        },
        {
          key: 'buying',
          name: 'Buying Amount'
        },
        {
          key: 'status',
          name: 'Goods Status'
        }
      ]
    }
  },
  computed: {
    cart () {
      return this.$store.state.api.goods.cart
    },
    cartMap () {
      if (this.cart.cart) {
        return this.cart.cart.map((ca) => {
          return {
            name: ca.goods.name,
            buying: ca.buying,
            status: ca.status.description
          }
        })
      } else {
        return null
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$store.dispatch('api/goods/getGoodCart')
    }
  }
}
</script>
