<template>
  <div class="container mx-auto w-screen">
    <form-goods
      v-if="modal.goods"
      :id="id"
      @close-modal="handleModal(0)"
    />
    <p class="text-center text-5xl font-semibold">
      Goods Page
    </p>
    <div class="flex justify-end mb-3">
      <button
        class="mr-3 lg:mr-0 mt-3 lg:mt-0 border border-main rounded-md py-2 px-3 hover:bg-main hover:text-white transition-colors"
        @click="handleModal"
      >
        Tambah Data
      </button>
    </div>
    <p v-if="isLoading" class="text-lg animate-pulse">
      Loading Data
    </p>
    <template v-else>
      <table class="w-11/12 mx-auto lg:w-full">
        <thead class="text-left">
          <tr class="border-b-2 text-lg">
            <th class="w-1/12">
              No
            </th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th class="w-2/12">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in goods"
            :key="index"
            class="border-b hover:bg-main hover:text-white py-2"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.category.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.stock }}</td>
            <td>
              <button
                class="border border-yellow-400 rounded-md my-2 py-2 px-3 bg-yellow-400 hover:bg-white focus:outline-none hover:text-yellow-400"
                @click="handleModal(item.id)"
              >
                Edit
              </button>
              <button
                class="border border-red-700 rounded-md my-2 py-2 px-3 bg-red-700 hover:bg-white focus:outline-none hover:text-red-700"
                @click="handleDelete(item.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
import FormGoods from '~/components/admin/FormGoods'
export default {
  components: {
    FormGoods
  },
  middleware: 'admin',
  data () {
    return {
      goods: [],
      modal: {
        goods: false
      },
      id: 0,
      isLoading: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.isLoading = true
      await this.$store.dispatch('api/good/getGoods')
      this.goods = this.$store.state.api.good.goods
      this.isLoading = false
    },
    handleModal (payload) {
      if (payload >= 0 && !this.modal.goods) {
        this.id = payload
      }
      if (this.modal.goods) {
        this.init()
      }
      this.modal.goods = !this.modal.goods
    },
    handleDelete (payload) {
      this.$axios
        .delete(`/goods/${payload}`, { jwt: this.$store.state.jwt }, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        })
        .then((res) => {
          const { data } = res
          if (data.success) {
            console.log('ok')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
