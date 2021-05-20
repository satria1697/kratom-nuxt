<template>
  <div class="flex flex-col mb-3 w-1/2">
    <span>{{ titleText }}</span>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
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
