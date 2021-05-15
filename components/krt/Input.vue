<template>
  <div class="mb-3">
    <p>{{ textTitle }}</p>
    <input
      :value="value"
      :type="inputType"
      class="py-2 px-3 border w-full rounded-md"
      @input="handleInput"
    >
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
    }
  },
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
