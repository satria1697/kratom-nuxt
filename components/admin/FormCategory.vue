<template>
  <krt-modal :is-loading="isLoading" modal-title="Form Category" @close-modal="closeModal">
    <template #body>
      <krt-input v-model="category.name" text-title="Description" />
      <div
        v-if="isLoading"
        class="w-full text-center py-2 px-3 text-main rounded-md animate-pulse"
      >
        Loading
      </div>
      <button
        v-else
        class="bg-main py-2 px-3 text-white float-right rounded-md"
        @click="submit"
      >
        Save
      </button>
    </template>
  </krt-modal>
</template>

<script>
import KrtModal from '~/components/krt/Modal'
import KrtInput from '~/components/krt/Input'
export default {
  name: 'FormCategory',
  components: { KrtInput, KrtModal },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      category: {
        name: ''
      },
      isLoading: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.isLoading = true
      if (this.id > 0) {
        await this.$store.dispatch('api/category/getCategoryById', this.id)
        this.category = JSON.parse(JSON.stringify(this.$store.state.api.category.catego))
      }
      this.isLoading = false
    },
    closeModal () {
      this.$emit('close-modal')
    },
    async submit () {
      this.isLoading = true
      let payload = {
        name: this.category.name
      }

      let res
      if (this.id === 0) {
        payload = { ...payload, id: '' }
        res = await this.$store.dispatch('api/category/postCategory', payload)
      } else if (this.id > 0) {
        payload = { ...payload, id: this.id }
        res = await this.$store.dispatch('api/category/postCategory', payload)
      }
      if (res.data) {
        if (this.id) {
          this.closeModal()
        }
        this.category.name = ''
      }
      this.isLoading = false
    }
  }
}
</script>
