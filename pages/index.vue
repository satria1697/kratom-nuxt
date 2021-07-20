<template>
  <div class="container px-8 2xl:mx-auto w-screen">
    <div class="text-center">
      <img class="mx-auto mb-2 lg:w-1/4 w-2/3" alt="Logo-image" :src="require('~/assets/jpg/logo.jpg')">
    </div>
    <div class="mb-5">
      <span class="text-2xl 2xl:text-4xl font-semibold text-main">Welcome to globalindo, what do you need? we can provide it.</span>
    </div>
    <div class="flex flex-col 2xl:flex-row mb-6">
      <div class="2xl:w-2/3 flex flex-col">
        <div :class="{ 'border-2 border-main p-2 rounded-md' : isMobile}" @click="handleShow('who')">
          <span class="text-3xl font-semibold">Who are we?</span>
        </div>
        <transition name="fade">
          <span v-if="isShow.who" class="2xl:p-8 pb-0 text-xl">Etiam nec nisi blandit, pulvinar mauris finibus, pulvinar felis. Nulla euismod quam sit amet lectus varius finibus. Vestibulum tincidunt enim in libero pretium, sit amet tincidunt erat volutpat. Nullam blandit molestie arcu, ut eleifend orci. Sed euismod laoreet rhoncus. Nunc laoreet pharetra sem, sed vulputate mi maximus eget. Aenean id metus sit amet metus elementum varius. Nam at felis id nibh imperdiet porta quis ut justo. Sed scelerisque consequat magna ut ultrices. Suspendisse sit amet nunc diam. Sed accumsan nibh a porta ornare. Suspendisse quis lorem sed lectus feugiat feugiat. Aenean accumsan scelerisque bibendum.</span>
        </transition>
      </div>
      <div v-if="isShow.who" class="2xl:w-1/3 mt-auto">
        <krt-box class="bg-main-light mx-0">
          <span class="text-white">Want to know more about us? <krt-click-here @on-click="handleClickHere('about-us')" /></span>
        </krt-box>
      </div>
    </div>
    <div class="flex flex-col 2xl:flex-row 2xl:mb-6">
      <div class="2xl:w-2/3 flex flex-col">
        <div :class="{ 'border-2 border-main p-2 rounded-md' : isMobile}" @click="handleShow('sell')">
          <span class="text-3xl font-semibold">What we sell?</span>
        </div>
        <transition name="fade">
          <span v-if="isShow.sell" class="2xl:p-8 pb-0 text-xl">Etiam nec nisi blandit, pulvinar mauris finibus, pulvinar felis. Nulla euismod quam sit amet lectus varius finibus. Vestibulum tincidunt enim in libero pretium, sit amet tincidunt erat volutpat. Nullam blandit molestie arcu, ut eleifend orci. Sed euismod laoreet rhoncus. Nunc laoreet pharetra sem, sed vulputate mi maximus eget. Aenean id metus sit amet metus elementum varius. Nam at felis id nibh imperdiet porta quis ut justo. Sed scelerisque consequat magna ut ultrices. Suspendisse sit amet nunc diam. Sed accumsan nibh a porta ornare. Suspendisse quis lorem sed lectus feugiat feugiat. Aenean accumsan scelerisque bibendum.</span>
        </transition>
      </div>
      <div v-if="isShow.sell" class="2xl:w-1/3 mt-auto">
        <krt-box class=" bg-main-light mx-0">
          <span class="text-white">Check our store <krt-click-here word="here" @on-click="handleClickHere('store')" /></span>
        </krt-box>
      </div>
    </div>
  </div>
</template>

<script>
import KrtClickHere from '~/components/krt/simple/ClickHere'
import KrtBox from '~/components/krt/simple/Box'
import common from '~/mixin/common'

export default {
  name: 'Home',
  components: { KrtBox, KrtClickHere },
  mixins: [common],
  data () {
    return {
      isShow: {
        who: false,
        sell: false
      }
    }
  },
  head () {
    return {
      title: 'GlobalIndo International',
      meta: [
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'Homepage of CV Indo Global International - Exporter from Indonesia'
        }
      ]
    }
  },
  mounted () {
    if (!this.isMobile) {
      this.isShow.who = true
      this.isShow.sell = true
    }
  },
  methods: {
    handleClickHere (where) {
      this.goTo(where)
    },
    handleShow (where) {
      this.isShow[where] = !this.isShow[where]
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
