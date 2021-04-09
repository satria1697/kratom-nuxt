<template>
  <div class="mt-3 bg-green-800 flex justify-center min-h-[50px]">
    <span class="my-auto text-white">Copyright {{ year }}&copy;</span>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  computed: {
    year () {
      return dayjs().format('YYYY')
    }
  }
}
</script>
