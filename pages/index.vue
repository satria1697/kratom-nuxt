<template>
  <div class="w-screen">
    <!-- <div class="relative w-100">
        <img class="block object-cover" src="../assets/jpg/image.jpeg" alt="Image" style="width:100%; height: 800px;">
        <div class="absolute top-1/2 left-2/3 text-white">
            <h1><span class="bg-black opacitiy-50 p-10"><b>BR</b></span> <span>Architects</span></h1>
        </div>
    </div> -->
    <div class="carousel relative shadow-xl bg-white">
      <div class="carousel-inner relative overflow-hidden">
        <!--Slide 1-->
        <input class="carousel-open hidden" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden="" checked="checked">
        <div class="carousel-item absolute opacity-0" style="height:70vh;">
          <div class="block h-full w-full text-center">
            <img src="../assets/jpg/image.jpeg" class="object-contain" alt="Image">
          </div>
        </div>
        <label for="carousel-3" class="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
        <label for="carousel-2" class="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
        
        <!--Slide 2-->
        <input class="carousel-open hidden" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden="">
        <div class="carousel-item absolute opacity-0" style="height:70vh;">
          <div class="block h-full w-full bg-orange-500 text-white text-5xl text-center">Slide 2</div>
        </div>
        <label for="carousel-1" class="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
        <label for="carousel-3" class="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label> 
        
        <!--Slide 3-->
        <input class="carousel-open hidden" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden="">
        <div class="carousel-item absolute opacity-0" style="height:70vh;">
          <div class="block h-full w-full bg-green-500 text-white text-5xl text-center">Slide 3</div>
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
    <div class="container mx-auto w-full mt-20">
      <h1 class="text-gray-800 text-center text-4xl font-light mb-5">Produk</h1>
      <select v-model="selectedCategory" class="rounded-md mb-3" @change="getGoods">
        <option v-for="(item, index) in category" :key="index" :value="item">
          {{ langState === "en" ? item.name : item.name_id }}
        </option>
      </select>
      <div class="grid lg:grid-cols-4 lg:gap-10 lg:flex-row mx-auto w-full">
        <div
          v-for="(item, idx) in goods"
          :key="idx"
          class="mb-4 lg:mb-0 p-8 mx-auto w-3/4 lg:w-full flex flex-col bg-white hover:bg-main-light transition-colors group"
        >
          <div class="cursor-pointer" @click="goTo('detail-id', {id: item.id})">
            <img
              :src="
                item.image ? item.image : 'https://dummyimage.com/600x400/000/fff'
              "
              :alt="item.name"
            >
          </div>
          <span class="mx-auto text-main-dark text-2xl mt-auto tracking-wider font-light group-hover:text-white mt-3">{{ langState === "en" ? item.name : item.name_id }}</span>
          <span class="mx-auto text-gray-400 font-thin tracking-widest group-hover:text-white">USD {{ item.price }}</span>
        </div>
      </div>
      <section class="text-gray-700 body-font border-t border-gray-200">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-4xl font-light title-font mb-4 text-gray-800">Our Team</h1>
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
import common from '~/mixin/common'

export default {
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
      return this.$store.state.api.goods.goods
    }
  },
  created () {
    this.init()
  },
  methods: {
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

<style>
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
				color: #2b6cb0;  /*Set to match the Tailwind colour you want the active one to be */
			}
		</style>