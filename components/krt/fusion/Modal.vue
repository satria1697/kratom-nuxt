<template>
  <krt-blur>
    <div v-if="isLoading" class="bg-white py-10 px-10 w-full">
      <span class="animate-pulse">{{ $t('goods.loadingGoods') }}</span>
    </div>
    <div
      v-else
      class="flex flex-col my-auto shadow shadow-sm relative overflow-visible rounded bg-white w-full"
    >
      <div class="border-b border-main-light rounded-b-md flex justify-between bg-main-light text-white">
        <span class="p-2">{{ modalTitle }}</span>
        <span
          class="cursor-pointer text-3xl my-auto mr-2 hover:text-black"
          @click="closeModal"
        >&times;</span>
      </div>
      <div class="py-3 px-10">
        <slot name="body" />
      </div>
    </div>
  </krt-blur>
</template>

<script>
import KrtBlur from '~/components/krt/simple/Blur'
export default {
  name: 'KrtModal',
  components: { KrtBlur },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    modalTitle: {
      type: String,
      default: ''
    }
  },
  created () {
    document.body.classList.add('modal-open')
  },
  methods: {
    closeModal () {
      document.body.classList.remove('modal-open')
      this.$emit('close-modal')
    }
  }
}
</script>
