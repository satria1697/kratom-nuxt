<template>
  <div>
    <navbar></navbar>
    <div class='container w-screen mx-auto'>
      <div class='mt-2 flex flex-wrap gap-4'>
        <div v-for='idx in 10' class='mx-auto p-8 border-2 w-1/4 flex flex-col'>
          <img src='https://dummyimage.com/400x400/000/fff' alt='kratom image' />
          <span class='mx-auto text-main text-2xl'>Kratom {{idx}}</span>
          <span class='mx-auto font-semibold '>IDR 555555</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
