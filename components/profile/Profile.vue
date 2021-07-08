<template>
  <div class="flex flex-col border rounded-md p-3">
    <div v-if="!Object.entries(user)">
      <span class="animate-pulse">{{ $t('goods.loadingGoods') }}</span>
    </div>
    <template v-else>
      <span class="text-2xl font-semibold mb-3">{{ $t('profile.profileTitle') }}</span>
      <div class="flex gap-x-10 w-5/6">
        <krt-detail
          title-text="Name"
          :text="user.profile.name || '-'"
        />
        <krt-detail
          title-text="Company"
          :text="user.profile.company || '-'"
        />
      </div>
      <div class="flex gap-x-10 w-5/6">
        <krt-detail
          title-text="Email"
          :text="user.email || '-'"
        />
        <krt-detail
          title-text="Company"
          :text="user.profile.position || '-'"
        />
      </div>
      <div class="flex gap-x-10 w-5/6 flex-col">
        <span class="text-xl font-semibold mb-3">{{ $t('profile.transaction') }}</span>
        <span v-if="!cartMap">{{ $t('goods.loadingGoods') }}</span>
        <!--        <krt-datatable-->
        <!--          v-else-->
        <!--          :options="cartMap"-->
        <!--          :columns="columns"-->
        <!--          :is-action="false"-->
        <!--        />-->
      </div>
    </template>
  </div>
</template>

<script>
// import KrtDatatable from '~/components/krt/Datatable'
import common from '~/mixin/common'
export default {
  name: 'ProfileBar',
  // components: { KrtDatatable },
  mixins: [common],
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
