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
      <section class="text-gray-700 body-font border-t border-gray-200">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-4xl font-light title-font mb-4 text-gray-800">
              Our Team
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
          </div>
          <div class="flex flex-wrap -m-2">
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div class="h-full items-center border-gray-200 border p-4 rounded-sm">
                <img alt="team" class="w-1/2 bg-gray-100 object-cover object-center rounded-full mx-auto" src="https://dummyimage.com/80x80/edf2f7/a5afbd">
                <div class="text-center mt-4">
                  <h2 class="text-gray-900 title-font font-medium text-xl">Holden Caulfield</h2>
                  <p class="text-gray-500">UI Designer</p>
                </div>
              </div>
            </div>
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div class="h-full items-center border-gray-200 border p-4 rounded-sm">
                <img alt="team" class="w-1/2 bg-gray-100 object-cover object-center rounded-full mx-auto" src="https://dummyimage.com/80x80/edf2f7/a5afbd">
                <div class="text-center mt-4">
                  <h2 class="text-gray-900 title-font font-medium text-xl">Holden Caulfield</h2>
                  <p class="text-gray-500">UI Designer</p>
                </div>
              </div>
            </div>
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div class="h-full items-center border-gray-200 border p-4 rounded-sm">
                <img alt="team" class="w-1/2 bg-gray-100 object-cover object-center rounded-full mx-auto" src="https://dummyimage.com/80x80/edf2f7/a5afbd">
                <div class="text-center mt-4">
                  <h2 class="text-gray-900 title-font font-medium text-xl">Holden Caulfield</h2>
                  <p class="text-gray-500">UI Designer</p>
                </div>
              </div>
            </div>
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div class="h-full items-center border-gray-200 border p-4 rounded-sm">
                <img alt="team" class="w-1/2 bg-gray-100 object-cover object-center rounded-full mx-auto" src="https://dummyimage.com/80x80/edf2f7/a5afbd">
                <div class="text-center mt-4">
                  <h2 class="text-gray-900 title-font font-medium text-xl">Holden Caulfield</h2>
                  <p class="text-gray-500">UI Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
>>>>>>> fb269eebc441864b3828b53cca4d95c726858cf4
