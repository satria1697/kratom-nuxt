<template>
  <div>
    <form-kratom
      v-if="modal.kratom"
      :id="id"
      @close-modal="handleModal(0)"
    />
    <div v-if="!kratoms.length" class="container mx-auto w-screen">
      <span class="text-lg text-center animate-pulse">Loading Data</span>
    </div>
    <div v-else class="container mx-auto w-screen">
      <div class="flex justify-end mb-3">
        <button
          class="border border-main rounded-md hover:bg-main hover:text-white py-2 px-3 text-xl"
          @click="handleModal"
        >
          Tambah Data
        </button>
      </div>
      <table class="w-full">
        <thead class="text-left">
          <tr class="border-b-2 text-lg">
            <th class="w-1/12">
              No
            </th>
            <th>Nama</th>
            <th>Price</th>
            <th>Stock</th>
            <th class="w-2/12">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in kratoms"
            :key="index"
            class="border-b hover:bg-main hover:text-white py-2"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.stock }}</td>
            <td>
              <button
                class="border rounded-md my-2 py-2 px-3 hover:bg-yellow-400 focus:outline-none"
                @click="handleModal(item.id)"
              >
                Edit
              </button>
              <button
                class="border rounded-md my-2 py-2 px-3 hover:bg-red-700 focus:outline-none"
                @click="handleDelete(item.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import FormKratom from '~/components/admin/FormKratom'
export default {
  components: {
    FormKratom
  },
  data () {
    return {
      kratoms: [],
      modal: {
        kratom: false
      },
      id: 0
    }
  },
  created () {
    this.$axios.get('/kratom').then((res) => {
      const { data } = res
      if (data.success) {
        this.kratoms = data.data
      }
    })
  },
  methods: {
    handleModal (payload) {
      if (payload >= 0 && !this.modal.kratom) {
        this.id = payload
      }
      this.modal.kratom = !this.modal.kratom
    },
    handleDelete (payload) {
      this.$axios
        .get(`/kratom/${payload}`)
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
