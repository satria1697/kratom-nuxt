<template>
  <krt-box>
    <div class="flex flex-col justify-between mt-8">
      <div><span class="text-lg">{{ $t('register.doneRegister') }}</span></div>
      <div class="py-2 ml-auto">
        <span
          class="underline cursor-pointer bg-main text-white py-2 px-3 rounded-md hover:bg-white hover:text-main transition-colors border border-main"
          @click="goTo('login')"
        >Back to login</span>
      </div>
    </div>
  </krt-box>
</template>

<script>
import common from '~/mixin/common'
import KrtBox from '~/components/krt/Box'

export default {
  components: { KrtBox },
  mixins: [common]
}
</script>
