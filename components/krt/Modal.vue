<template>
  <transition name="fade">
    <div
      class="h-screen w-screen z-40 top-0 left-0 fixed overflow-auto"
      style="background-color: rgba(0, 0, 0, 0.2)"
    >
      <div class="z-50 flex items-center max-w-lg mx-auto h-full">
        <div v-if="isLoading" class="bg-white py-10 px-10 w-full">
          <span class="animate-pulse">Loading Data</span>
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
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'KrtModal',
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
  updated () {
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
