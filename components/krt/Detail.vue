<template>
  <div class="flex flex-col mb-3">
    <span>{{ titleText }}</span>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'KrtDetail',
  props: {
    titleText: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
