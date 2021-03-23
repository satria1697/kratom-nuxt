<template>
  <div>
    <navbar></navbar>
    <div class="container w-screen mx-auto">
      <div v-if="isLoading" class=""></div>
      <div v-else class="mt-2 flex lg:flex-row flex-col flex-wrap gap-4">
        <div
          v-for="(item, idx) in kratoms"
          :key="idx"
          class="mb-4 lg:mb-0 mx-auto p-8 border-2 w-2/3 lg:w-1/4 flex flex-col"
        >
          <div class="cursor-pointer" @click="goTo(item.id)">
            <img
              :src="
                item.image
                  ? item.image
                  : 'https://dummyimage.com/400x400/000/fff'
              "
              alt="kratom image"
            />
          </div>
          <span class="mx-auto text-main text-2xl">{{ item.name }}</span>
          <span class="mx-auto font-semibold">USD {{ item.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const res = await $axios.$get('api/kratom')
      const { data } = res
      return { kratoms: data }
    } catch (e) {
      console.log(e)
    }
  },
  data() {
    return {
      kratoms: [],
      isLoading: false,
    }
  },
  methods: {
    goTo(idx) {
      this.$router.push({ name: 'detail-id', params: { id: idx } })
    },
  },
}
</script>

<style></style>
