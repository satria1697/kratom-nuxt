<template>
  <div class="container mx-auto">
    <form-category v-if="modal.category" :id="id" @close-modal="handleModal({id:0})" />
    <p class="text-center text-5xl font-semibold">
      Category Page
    </p>
    <div v-if="isLoading">
      <p class="animate-pulse text-lg">
        Loading data
      </p>
    </div>
    <template v-else>
      <krt-datatable
        :options="categoryMap"
        :columns="columns"
        :query="query"
        delete-text="show / unshow"
        @on-edit="handleModal"
        @on-delete="handleDelete"
        @data-changed="handleDataChanged"
      />
    </template>
  </div>
</template>

<script>
import KrtDatatable from '~/components/krt/Datatable'
import FormCategory from '~/components/admin/FormCategory'
import common from '~/mixin/common'
export default {
  components: { KrtDatatable, FormCategory },
  mixins: [common],
  middleware: 'admin',
  data () {
    return {
      modal: {
        category: false
      },
      id: 0,
      columns: [
        {
          key: 'id',
          name: 'ID'
        },
        {
          key: 'name',
          name: 'Category Name'
        },
        {
          key: 'show',
          name: 'Is Category Show?'
        }
      ],
      query: {
        filter: 0,
        search: ''
      }
    }
  },
  head () {
    return {
      title: 'Admin | Category'
    }
  },
  computed: {
    category () {
      return this.$store.state.api.category.category
    },
    categoryMap () {
      if (this.category) {
        return this.category.map((cate) => {
          return {
            id: cate.id,
            name: cate.name,
            show: cate.show === 1 ? 'Show' : 'Not Show'
          }
        })
      }
      return []
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      await this.$store.dispatch('api/category/getCategory', this.query)
      this.isLoading = false
    },
    async handleDelete (payload) {
      this.isLoading = true
      await this.$store.dispatch('api/category/deleteCategoryById', payload.id)
      await this.init()
    },
    handleModal (payload) {
      if (payload.id >= 0 && !this.modal.category) {
        this.id = payload.id
      }
      if (this.modal.category) {
        this.isLoading = true
        this.init()
      }
      this.modal.category = !this.modal.category
    },
    handleDataChanged (payload) {
      this.query = payload
      this.init()
    }
  }
}
</script>
