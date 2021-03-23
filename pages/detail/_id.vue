<template>
  <div>
    <navbar></navbar>
    <div class="container mx-auto">
      <div v-if="isLoading" class="mx-auto">
        <span class="animate-pulse">Loading Data</span>
      </div>
      <div v-else class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/2 mb-3 lg:mb-0">
          <img
            :src="
              kratom.image
                ? kratom.image
                : 'https://dummyimage.com/400x400/000/fff'
            "
            :alt="kratom.name"
          />
        </div>
        <div
          class="flex flex-col border-2 rounded-md w-full lg:w-1/2 p-4 h-full"
        >
          <span class="text-3xl text-main font-bold">{{ kratom.name }}</span>
          <span class="text-2xl">USD {{ kratom.price }}</span>
          <span class="font-semibold text-lg">{{ kratom.brief }}</span>
          <span class="text-lg">{{ kratom.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const res = await $axios.$get(`/api/kratom/${params.id}`)
    const { data } = res
    return { kratom: data }
  },
  data() {
    return {
      isLoading: false,
      kratom: null,
    }
  },
  // created() {
  // this.isLoading = true
  // this.$axios
  //   .get(`/api/kratom/${this.$route.params.id}`)
  //   .then((res) => {
  //     const { data } = res
  //     if (data.success) {
  //       this.kratom = data.data
  //     }
  //     this.isLoading = false
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     this.isLoading = false
  //   })
  // },
}
</script>
