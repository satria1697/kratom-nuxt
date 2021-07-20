<template>
  <div class="h-auto lg:h-screen flex lg:items-center justify-center w-full">
    <krt-box>
      <slot />
    </krt-box>
  </div>
</template>

<script>
import KrtBox from '~/components/krt/simple/Box'
export default {
  name: 'KrtBoxMiddle',
  components: { KrtBox }
}
</script>
