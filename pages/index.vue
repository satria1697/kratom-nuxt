<template>
  <div class="container w-screen mx-auto">
    <img class="mx-auto mb-2 lg:w-1/4 w-2/3" :src="require('../assets/png/logo.png')">
    <div class="grid lg:grid-cols-4 lg:gap-10 lg:flex-row mx-auto w-full">
      <div
        v-for="(item, idx) in kratoms"
        :key="idx"
        class="shadow-2xl mb-4 lg:mb-0 p-8 mx-auto w-3/4 lg:w-full flex flex-col rounded-lg bg-main hover:bg-main-light transition-colors"
      >
        <div class="cursor-pointer" @click="goTo(item.id)">
          <img
            :src="
              item.image ? item.image : 'https://dummyimage.com/400x400/000/fff'
            "
            alt="kratom image"
          >
        </div>
        <span class="mx-auto text-white text-2xl mt-auto">{{ item.name }}</span>
        <span class="mx-auto font-semibold">USD {{ item.price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    try {
      const res = await $axios.$get('/kratom')
      const { data } = res
      return { kratoms: data }
    } catch (e) {
      console.log(e)
    }
  },
  data () {
    return {
      kratoms: [],
      isLoading: false
    }
  },
  methods: {
    goTo (idx) {
      this.$router.push({ name: 'detail-id', params: { id: idx } })
    }
  }
}
</script>

<style></style>
