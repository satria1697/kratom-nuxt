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
    <div class="flex justify-end mb-3">
      <button
        class="mr-3 lg:mr-0 mt-3 lg:mt-0 border border-main rounded-md py-2 px-3 hover:bg-main hover:text-white transition-colors"
        @click="handleModal({id: 0})"
      >
        Tambah Data
      </button>
    </div>
    <p v-if="isLoading" class="text-lg animate-pulse">
      Loading Data
    </p>
    <template v-else>
      <krt-datatable
        :options="goodsMap"
        :columns="columns"
        @on-edit="handleModal"
        @on-delete="handleDelete"
      />
    </template>
  </div>
</template>

<script>
import FormGoods from '~/components/admin/FormGoods'
import KrtDatatable from '~/components/krt/Datatable'
export default {
  components: {
    KrtDatatable,
    FormGoods
  },
  middleware: 'admin',
  data () {
    return {
      modal: {
        goods: false
      },
      id: 0,
      isLoading: false,
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
      ]
    }
  },
  computed: {
    goods () {
      return this.$store.state.api.goods.goods
    },
    goodsMap () {
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
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.isLoading = true
      const payload = {
        category: '',
        filter: 0
      }
      await this.$store.dispatch('api/goods/getGoodsData', payload)
      this.isLoading = false
    },
    handleModal (payload) {
      if (payload.id >= 0 && !this.modal.goods) {
        this.id = payload.id
      }
      if (this.modal.goods) {
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
    }
  }
}
</script>
