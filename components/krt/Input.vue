<template>
  <div class="mb-3 mt-2 flex flex-col relative">
    <span class="select-none absolute -top-3 bg-white px-1 left-3">{{ textTitle }}</span>
    <input
      :value="value"
      :type="inputType"
      class="py-2 px-3 border w-full rounded-md"
      @input="handleInput"
    >
    <span v-if="subText" class="text-sm text-gray-600 mt-4">{{ subText }}</span>
  </div>
</template>

<script>
export default {
  name: 'KrtInput',
  props: {
    textTitle: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      required: true
    },
    subText: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
