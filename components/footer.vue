<template>
  <div class="">
    <div class="flex flex-col lg:flex-row mt-8 mb-3 mx-3">
      <div class="w-full lg:w-3/4 bg-green-800 flex flex-col justify-center p-8 text-white rounded-lg shadow-lg">
        <p class="mb-6 text-sm ">
          {{ $t('footer.footerTitle') }}
        </p>
        <p class="mt-auto">
          &copy; {{ year }} - globalindo-int.com
        </p>
      </div>
      <div class="w-full lg:w-1/4 bg-white p-8 flex flex-col">
        <span>Contact Info</span>
        <div class="text-center">
          <img :src="require('../assets/jpg/logo.jpg')" alt="kratom-logo">
        </div>
        <span>{{ $t('footer.phone') }}: +62 812-1000-785</span>
        <span>Email: aaron@globalindo-intl.com</span>
      </div>
    </div>
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
