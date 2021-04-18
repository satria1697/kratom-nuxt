<template>
  <div class="">
    <div class="flex flex-col lg:flex-row mt-8 mb-3 mx-3">
      <div class="w-full lg:w-3/4 bg-green-800 flex flex-col justify-center p-8 text-white rounded-lg shadow-lg">
        <p class="mb-3 text-xl">
          Disclaimer
        </p>
        <p class="mb-6 text-sm ">
          This product is not for use by or sale to persons under the age of 18. It should not be used if you are pregnant or nursing. Consult with a physician before use if you have a serious medical condition or use prescription medications. A Doctor's advice should be sought before using this and any supplemental dietary product. All trademarks and copyrights are property of their respective owners and are not affiliated with nor do they endorse this product. These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure or prevent any disease. By using this site, you agree to follow the Privacy Policy and all Terms & Conditions printed on this site. Void Where Prohibited by Law.
        </p>
        <p class="mt-auto">
          &copy; {{ year }}-present - Kratomedical.
        </p>
      </div>
      <div class="w-full lg:w-1/4 bg-white p-8 flex flex-col">
        <span>Contact Info</span>
        <div>
          <img :src="require('../assets/png/logo.png')" alt="kratom-logo">
        </div>
        <span>Phone: +62 812-1000-785</span>
        <span>Email: support@kratomedical.com</span>
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
