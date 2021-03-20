<template>
  <div>
    <navbar></navbar>
    <div class='container w-screen mx-auto'>
      <div class='mt-2 flex lg:flex-row flex-col flex-wrap gap-4'>
        <div @click='goTo(idx)' v-for='idx in 10' class='mb-4 lg:mb-0 mx-auto p-8 border-2 w-2/3 lg:w-1/4 flex flex-col'>
          <div class='cursor-pointer'>
            <img src='https://dummyimage.com/400x400/000/fff' alt='kratom image' />
          </div>
          <span class='mx-auto text-main text-2xl'>Kratom {{idx}}</span>
          <span class='mx-auto font-semibold '>USD 55</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goTo(idx) {
      this.$router.push({name: 'detail-id', params: { id: idx}})
    }
  }
}
</script>

<style>
</style>
