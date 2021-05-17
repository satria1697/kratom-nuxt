<template>
  <div class="h-auto lg:h-screen flex lg:items-center justify-center w-full">
    <div
      class="flex flex-col border-2 max-w-sm rounded-md p-6 mx-10 lg:mx-0 w-full"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'KrtBox'
}
</script>
