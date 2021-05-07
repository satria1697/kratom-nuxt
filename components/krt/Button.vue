<template>
  <button class="mb-3 bg-main border border-main text-white py-2 px-3 rounded-md hover:bg-white hover:text-main transition-colors" :disabled="isLoading" :class="isLoading ? 'disabled:bg-gray-200 disabled:opacity-50 disabled:text-main cursor-default' : ''" @click="$emit('onClick')">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    isLoading: Boolean
  }
}
</script>
