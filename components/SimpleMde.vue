<template>
  <div class="w-full">
    <textarea ref="area" />
  </div>
</template>

<script>
import Simplemde from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    value (newVal) { if (newVal !== this.mde.value()) { this.mde.value(newVal) } }
  },
  mounted () {
    this.mde = new Simplemde({
      element: this.$refs.area
      // Put your extra SimpleMDE settings here.
    })
    this.mde.value(this.value)
    this.mde.codemirror.on('change', () => {
      this.$emit('input', this.mde.value())
    })
  },
  beforeDestroy () {
    this.mde.toTextArea() // clean up when component gets destroyed.
  }
}
</script>
