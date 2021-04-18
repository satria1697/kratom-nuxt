<template>
  <div class="container mx-auto">
    <div class="flex justify-center w-full">
      <nuxt-link class="mr-3 hover:bg-main rounded-lg border-transparent py-2 px-3 transition-all hover:text-white" :class="/(goods)/.test($route.name) ? 'border-main border-b-4 pb-1': ''" :to="{name: 'admin-goods'}">
        Goods
      </nuxt-link>
      <nuxt-link class="mr-3 hover:bg-main rounded-lg border-transparent py-2 px-3 transition-all hover:text-white" :class="/(article)/.test($route.name) ? 'border-main border-b-4 pb-1': ''" :to="{name: 'admin-article'}">
        Article
      </nuxt-link>
    </div>
    <NuxtChild />
  </div>
</template>

<script>
export default {
  middleware: 'admin'
}
</script>
