<template>
  <div class="container mx-auto w-screen">
    <form-goods
      v-if="modal.goods"
      :id="id"
      @close-modal="handleModal({id: 0})"
    />
    <p class="text-center text-5xl font-semibold">
      Goods Page
    </p>
    <p v-if="isLoading" class="text-lg animate-pulse">
      Loading Data
    </p>
    <template v-else>
      <krt-datatable
        :query="query"
        :options="goodsMap"
        :columns="columns"
        @on-edit="handleModal"
        @on-delete="handleDelete"
        @on-add-data="handleModal({id: 0})"
        @data-changed="handleDataChange"
      />
    </template>
  </div>
</template>

<script>
import FormGoods from '~/components/admin/FormGoods'
import KrtDatatable from '~/components/krt/Datatable'
import common from '~/mixin/common'
export default {
  components: {
    KrtDatatable,
    FormGoods
  },
  mixins: [common],
  middleware: 'admin',
  data () {
    return {
      modal: {
        goods: false
      },
      id: 0,
      columns: [
        {
          key: 'id',
          name: 'ID'
        },
        {
          key: 'name',
          name: 'Name'
        },
        {
          key: 'category',
          name: 'Category'
        },
        {
          key: 'price',
          name: 'Price',
          tdClass: 'text-center'
        },
        {
          key: 'stock',
          name: 'Stock',
          tdClass: 'text-center'
        }
      ],
      query: {
        category: '',
        filter: 0,
        search: ''
      }
    }
  },
  head () {
    return {
      title: 'Admin | Goods'
    }
  },
  computed: {
    goods () {
      return this.$store.state.api.goods.goods
    },
    goodsMap () {
      if (this.goods) {
        return this.goods.map((good) => {
          return {
            id: good.id,
            name: good.name,
            category: good.category.name,
            price: `$ ${good.price}`,
            stock: good.stock
          }
        })
      }
      return []
    }
  },
  created () {
    this.isLoading = true
    this.init()
  },
  methods: {
    async init () {
      await this.$store.dispatch('api/goods/getGoodsData', this.query)
      this.isLoading = false
    },
    handleModal (payload) {
      if (payload.id >= 0 && !this.modal.goods) {
        this.id = payload.id
      }
      if (this.modal.goods) {
        this.isLoading = true
        this.init()
      }
      this.modal.goods = !this.modal.goods
    },
    handleDelete (payload) {
      const res = this.$store.dispatch('api/goods/deleteGoodById', payload.id)
      if (res.data) {
        this.$toast('Data Deleted')
      } else {
        this.$toast.error('Something went wrong')
      }
    },
    handleDataChange (payload) {
      this.query = payload
      this.init()
    }
  }
}
</script>
