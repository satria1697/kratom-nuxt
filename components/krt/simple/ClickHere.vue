<template>
  <span class="cursor-pointer hover:underline hover:text-main font-semibold" @click="handleClick">{{ word }}</span>
</template>

<script>
export default {
  name: 'KrtClickHere',
  props: {
    word: {
      type: String,
      default: 'click here'
    }
  },
  methods: {
    handleClick () {
      this.$emit('on-click')
    }
  }
}
</script>
