<template>
  <div class="container">
    <div class="w-screen">
      <div class="carousel relative shadow-xl bg-white">
        <div class="carousel-inner relative overflow-hidden">
          <!--Slide 1-->
          <input
            id="carousel-1"
            class="carousel-open hidden"
            type="radio"
            name="carousel"
            aria-hidden="true"
            hidden=""
            checked="checked"
          >
          <div class="carousel-item absolute opacity-0" style="height:70vh;">
            <div class="block h-full w-full text-center">
              <img src="../assets/jpg/image.jpeg" class="sm:object-contain object-cover" alt="Image">
            </div>
          </div>
          <label for="carousel-3" class="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
          <label for="carousel-2" class="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
          <!--Slide 2-->
          <input
            id="carousel-2"
            class="carousel-open hidden"
            type="radio"
            name="carousel"
            aria-hidden="true"
            hidden=""
          >
          <div class="carousel-item absolute opacity-0" style="height:70vh;">
            <div class="block h-full w-full bg-orange-500 text-white text-5xl text-center">
              Slide 2
            </div>
          </div>
          <label for="carousel-1" class="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
          <label for="carousel-3" class="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
          <!--Slide 3-->
          <input
            id="carousel-3"
            class="carousel-open hidden"
            type="radio"
            name="carousel"
            aria-hidden="true"
            hidden=""
          >
          <div class="carousel-item absolute opacity-0" style="height:70vh;">
            <div class="block h-full w-full bg-green-500 text-white text-5xl text-center">
              Slide 3
            </div>
          </div>
          <label for="carousel-2" class="prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
          <label for="carousel-1" class="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
          <!-- Add additional indicators for each slide-->
          <ol class="carousel-indicators">
            <li class="inline-block mr-3">
              <label for="carousel-1" class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700">•</label>
            </li>
            <li class="inline-block mr-3">
              <label for="carousel-2" class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700">•</label>
            </li>
            <li class="inline-block mr-3">
              <label for="carousel-3" class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700">•</label>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div class="w-screen 2xl:mx-auto">
      <div class="container mx-auto pt-20 pb-20">
        <h1 class="text-gray-800 text-center text-4xl font-light mb-5">
          Produk
        </h1>
        <div class="grid lg:grid-cols-4 lg:gap-10 lg:flex-row mx-auto w-full">
          <div
            v-for="(item, idx) in goods"
            :key="idx"
            class="mb-4 lg:mb-0 p-8 mx-auto w-3/4 lg:w-full flex flex-col bg-white hover:bg-main transition-colors group"
          >
            <div class="cursor-pointer" @click="goTo('detail-id', {id: item.id})">
              <img
                :src="
                  item.image ? item.image : 'https://dummyimage.com/600x400/000/fff'
                "
                :alt="item.name"
              >
            </div>
            <span class="mx-auto text-main text-2xl mt-auto tracking-wider font-light group-hover:text-white mt-3">{{ langState === "en" ? item.name : item.name_id }}</span>
            <span class="mx-auto text-gray-400 font-thin tracking-widest group-hover:text-white">USD {{ item.price }}</span>
          </div>
        </div>
        <div class="flex justify-center pt-10">
          <krt-button class="big" text="See All Products" />
        </div>
      </div>
      <div class="container px-2 lg:mx-auto py-20 border-t">
        <div class="mb-5">
          <span class="text-2xl 2xl:text-4xl font-semibold text-main">Welcome to globalindo, what do you need? we can provide it.</span>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 mb-6">
          <div>
            <div class="flex flex-col">
              <div :class="{ 'border-2 border-main p-2 rounded-md' : isMobile}" @click="handleShow('who')">
                <span class="text-3xl font-semibold">Who are we?</span>
              </div>
              <transition name="fade">
                <span v-if="isShow.who" class="2xl:p-8 pb-0 text-xl">Etiam nec nisi blandit, pulvinar mauris finibus, pulvinar felis. Nulla euismod quam sit amet lectus varius finibus. Vestibulum tincidunt enim in libero pretium, sit amet tincidunt erat volutpat. Nullam blandit molestie arcu, ut eleifend orci. Sed euismod laoreet rhoncus. Nunc laoreet pharetra sem, sed vulputate mi maximus eget. Aenean id metus sit amet metus elementum varius. Nam at felis id nibh imperdiet porta quis ut justo. Sed scelerisque consequat magna ut ultrices. Suspendisse sit amet nunc diam. Sed accumsan nibh a porta ornare. Suspendisse quis lorem sed lectus feugiat feugiat. Aenean accumsan scelerisque bibendum.</span>
              </transition>
            </div>
            <div v-if="isShow.who" class="mt-auto">
              <krt-box class="bg-main-light mx-0">
                <span class="text-white">Want to know more about us? <krt-click-here-button @on-click="handleClickHere('about-us')" /></span>
              </krt-box>
            </div>
          </div>
          <div v-if="!isMobile" class="p-3 flex justify-center box relative">
            <img src="@/assets/jpg/team.jpeg" alt="" class="absolute object-cover w-3/4 -bottom-2 md:bottom-4 right-2">
          </div>
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 xl:mb-6 pt-20">
          <div v-if="!isMobile" class="p-3 flex justify-center box relative">
            <img src="@/assets/jpg/team.jpeg" alt="" class="absolute object-cover w-3/4 -bottom-2 md:bottom-4 left-2">
          </div>
          <div>
            <div class="flex flex-col">
              <div :class="{ 'border-2 border-main p-2 rounded-md' : isMobile}" @click="handleShow('sell')">
                <span class="text-3xl font-semibold">What we sell?</span>
              </div>
              <transition name="fade">
                <span v-if="isShow.sell" class="2xl:p-8 pb-0 text-xl">Etiam nec nisi blandit, pulvinar mauris finibus, pulvinar felis. Nulla euismod quam sit amet lectus varius finibus. Vestibulum tincidunt enim in libero pretium, sit amet tincidunt erat volutpat. Nullam blandit molestie arcu, ut eleifend orci. Sed euismod laoreet rhoncus. Nunc laoreet pharetra sem, sed vulputate mi maximus eget. Aenean id metus sit amet metus elementum varius. Nam at felis id nibh imperdiet porta quis ut justo. Sed scelerisque consequat magna ut ultrices. Suspendisse sit amet nunc diam. Sed accumsan nibh a porta ornare. Suspendisse quis lorem sed lectus feugiat feugiat. Aenean accumsan scelerisque bibendum.</span>
              </transition>
            </div>
            <div v-if="isShow.sell" class="mt-auto">
              <krt-box class=" bg-main-light mx-0">
                <span class="text-white">Check our store <krt-click-here-button word="here" @on-click="handleClickHere('store')" /></span>
              </krt-box>
            </div>
          </div>
        </div>
      </div>
      <div class="text-gray-700 body-font border-t pt-20 container mx-auto border-gray-200 pb-20">
        <div class="px-5 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-4xl font-light title-font mb-4 text-gray-800">
              Our Team
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.
            </p>
          </div>
          <div class="flex flex-wrap -m-2">
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full gap-x-4">
              <div class="h-full items-center border-gray-200 border p-4 rounded-sm">
                <img alt="team" class="w-1/2 bg-gray-100 object-cover object-center rounded-full mx-auto" src="https://dummyimage.com/80x80/edf2f7/a5afbd">
                <div class="text-center mt-4">
                  <h2 class="text-gray-900 title-font font-medium text-xl">
                    Holden Caulfield
                  </h2>
                  <p class="text-gray-500">
                    UI Designer
                  </p>
                </div>
              </div>
            </div>
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full gap-x-4">
              <div class="h-full items-center border-gray-200 border p-4 rounded-sm">
                <img alt="team" class="w-1/2 bg-gray-100 object-cover object-center rounded-full mx-auto" src="https://dummyimage.com/80x80/edf2f7/a5afbd">
                <div class="text-center mt-4">
                  <h2 class="text-gray-900 title-font font-medium text-xl">
                    Holden Caulfield
                  </h2>
                  <p class="text-gray-500">
                    UI Designer
                  </p>
                </div>
              </div>
            </div>
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full gap-x-4">
              <div class="h-full items-center border-gray-200 border p-4 rounded-sm">
                <img alt="team" class="w-1/2 bg-gray-100 object-cover object-center rounded-full mx-auto" src="https://dummyimage.com/80x80/edf2f7/a5afbd">
                <div class="text-center mt-4">
                  <h2 class="text-gray-900 title-font font-medium text-xl">
                    Holden Caulfield
                  </h2>
                  <p class="text-gray-500">
                    UI Designer
                  </p>
                </div>
              </div>
            </div>
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full gap-x-4">
              <div class="h-full items-center border-gray-200 border p-4 rounded-sm">
                <img alt="team" class="w-1/2 bg-gray-100 object-cover object-center rounded-full mx-auto" src="https://dummyimage.com/80x80/edf2f7/a5afbd">
                <div class="text-center mt-4">
                  <h2 class="text-gray-900 title-font font-medium text-xl">
                    Holden Caulfield
                  </h2>
                  <p class="text-gray-500">
                    UI Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import VueSlickCarousel from 'vue-slick-carousel'
import KrtClickHereButton from '~/components/krt/simple/ClickHere'
import KrtBox from '~/components/krt/simple/Box'
import common from '~/mixin/common'
import KrtButton from '~/components/krt/Button.vue'
// import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css' // optional style for arrow and dots

export default {
  name: 'Home',
  components: { KrtBox, KrtClickHereButton, KrtButton },
  mixins: [common],
  async asyncData ({ store }) {
    const payload = {
      filter: 1,
      category: ''
    }
    await store.dispatch('api/goods/getGoodsData', payload)
  },
  data () {
    return {
      isShow: {
        who: false,
        sell: false
      },
      category: [{
        id: 0,
        name: 'All',
        name_id: 'Semua'
      }],
      selectedCategory: null
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
  computed: {
    goods () {
      return !this.isMobile ? this.$store.state.api.goods.goods.slice(0, 8) : this.$store.state.api.goods.goods.slice(0, 4)
    }
  },
  created () {
    this.init()
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
      if (this.isMobile) { this.isShow[where] = !this.isShow[where] }
    },
    async init () {
      const payload = {
        filter: 1
      }
      await this.$store.dispatch('api/category/getCategory', payload)
      const res = this.$store.state.api.category.category
      res.forEach((data) => {
        this.category.push(data)
      })
      this.selectedCategory = this.category[0]
    },
    async getGoods () {
      let payload = {
        filter: 1
      }
      if (this.selectedCategory.id) {
        payload = {
          ...payload,
          category: this.selectedCategory.id
        }
      }
      await this.$store.dispatch('api/goods/getGoodsData', payload)
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
.carousel-open:checked + .carousel-item {
  position: static;
  opacity: 100;
  }
.carousel-item {
  -webkit-transition: opacity 0.6s ease-out;
  transition: opacity 0.6s ease-out;
  }
#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
  display: block;
  }
.carousel-indicators {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 2%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
  }
#carousel-1:checked ~ .control-1 ~ .carousel-indicators li:nth-child(1) .carousel-bullet,
#carousel-2:checked ~ .control-2 ~ .carousel-indicators li:nth-child(2) .carousel-bullet,
#carousel-3:checked ~ .control-3 ~ .carousel-indicators li:nth-child(3) .carousel-bullet {
  color: #2b6cb0;
  }
.box::before {
  content: "";
  height: 250px;
  width: 440px;
  background-color: blue;
  opacity: 10%;
  }
@media only screen and (max-width: 768px) {
  .box::before {
    content: "";
    height: 100px;
    width: 160px;
    background-color: blue;
    opacity: 10%;
    }
}
</style>
