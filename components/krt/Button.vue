<template>
  <button
    class="border rounded-md transition-colors"
    :disabled="isLoading"
    :class="btnClass"
    @click="handleClick"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'KrtButton',
  props: {
    text: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'medium'
    },
    clasProps: {
      type: String,
      default: ''
    }
  },
  computed: {
    btnClass () {
      let btnClass = ''
      if (this.size === 'medium') {
        btnClass += 'py-2 px-3 '
      }
      if (this.size === 'small') {
        btnClass += 'py-1 px-2 '
      }
      if (this.size === 'big') {
        btnClass += 'py-3 px-4 '
      }
      if (this.isLoading) {
        btnClass += 'disabled:bg-gray-200 disabled:opacity-50 disabled:text-main cursor-default '
      } else {
        if (this.variant === 'primary') {
          btnClass += 'hover:bg-white hover:text-main text-white bg-main border-main '
        }
        if (this.variant === 'danger') {
          btnClass += 'hover:bg-white hover:text-red-700 text-white bg-red-700 border-red-700 '
        }
        if (this.variant === 'warning') {
          btnClass += 'hover:bg-white hover:text-yellow-400 text-white bg-yellow-400 border-yellow-400 '
        }
      }
      btnClass += this.clasProps
      return btnClass
    }
  },
  methods: {
    handleClick () {
      this.$emit('on-click')
    }
  }
}
</script>
