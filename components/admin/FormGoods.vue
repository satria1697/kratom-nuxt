<template>
  <transition name="fade">
    <div
      class="h-screen w-screen z-40 top-0 left-0 fixed overflow-auto"
      style="background-color: rgba(0, 0, 0, 0.2)"
    >
      <div class="z-50 flex items-center max-w-lg mx-auto h-full">
        <div v-if="isLoading" class="bg-white py-10 px-10 w-full">
          <span class="animate-pulse">Loading Data</span>
        </div>
        <div
          v-else
          class="flex flex-col my-auto shadow shadow-sm relative overflow-visible rounded bg-white py-10 px-10 w-full"
        >
          <span
            class="hover:underline cursor-pointer ml-auto"
            @click="closeModal"
          >Back</span>
          <div class="mb-3">
            <p>Name</p>
            <input
              v-model="goods.name"
              type="text"
              class="py-2 px-3 border w-full rounded-md"
            >
          </div>
          <div class="mb-3">
            <p>Brief Description</p>
            <input
              v-model="goods.brief"
              type="text"
              class="py-2 px-3 border w-full rounded-md"
            >
          </div>
          <div class="mb-3">
            <p>Description</p>
            <textarea
              v-model="goods.description"
              class="py-2 px-3 border w-full rounded-md"
            />
          </div>
          <div class="mb-3">
            <p>Categories</p>
            <select v-model="goods.category" class="rounded-md py-2 px-3 w-full">
              <option v-for="(item, index) in categories" :key="index" :value="item">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="flex gap-2 mb-3">
            <div class="w-1/2">
              <p>Price</p>
              <input
                v-model="goods.price"
                type="number"
                class="py-2 px-3 border w-full rounded-md"
              >
            </div>
            <div class="w-1/2">
              <p>Stock</p>
              <input
                v-model="goods.stock"
                type="number"
                class="py-2 px-3 border w-full rounded-md"
              >
            </div>
          </div>
          <div
            class="flex flex-col mb-3 border-2 border-gray-600 rounded-md py-2 px-3"
          >
            <p>Image</p>
            <input class="mb-3" type="file" @change="handleImage">
            <img
              v-if="goods.image"
              :src="
                goods.image"
              alt="goods image"
            >
          </div>
          <span
            v-if="set.show"
            class="text-white py-1 px-2 mb-2 mx-3 w-auto rounded-full"
            :class="set.success ? 'bg-green-900' : 'bg-red-900'"
          >{{ set.message }}</span>
          <div
            v-if="isLoading"
            class="w-full text-center py-2 px-3 text-main rounded-md animate-pulse"
          >
            Loading
          </div>
          <button
            v-else
            class="bg-main py-2 px-3 text-white float-right rounded-md"
            @click="submit"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      goods: {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        image: null,
        brief: '',
        category: null
      },
      set: {
        message: '',
        success: false,
        show: false
      },
      isLoading: false,
      categories: []
    }
  },
  created () {
    this.$axios.get('goods/category').then((res) => {
      const { data } = res
      this.categories = data.data
      this.goods.category = this.categories[0]
    })
    if (this.id > 0) {
      this.isLoading = true
      this.$axios
        .get('goods/{id}'.replace('{id}', this.id.toString()))
        .then((res) => {
          const { data } = res
          if (data.success) {
            this.goods = data.data
          }
          this.isLoading = false
        })
    }
  },
  methods: {
    closeModal () {
      this.$emit('close-modal')
    },
    async submit () {
      this.isLoading = true
      const payload = {
        id: this.id,
        name: this.goods.name,
        description: this.goods.description,
        price: this.goods.price.toString(),
        stock: this.goods.stock.toString(),
        image: this.goods.image,
        brief: this.goods.brief,
        categoryId: this.goods.category.id,
        jwt: this.$store.state.jwt
      }

      let res
      if (this.id === 0) {
        res = await this.$axios.post('/goods', payload, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.token
          }
        })
      } else if (this.id > 0) {
        res = await this.$axios.post(`/goods/${this.id}`, payload, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.token
          }
        })
      }
      this.isLoading = false
      if (res) {
        this.set.message = 'success'
        this.set.success = true
        this.set.show = true
        if (this.id === 0) {
          this.goods.description = ''
          this.goods.name = ''
          this.goods.price = 0
          this.goods.stock = 0
          this.goods.image = null
          this.goods.brief = ''
        }
        setTimeout(() => {
          this.set.show = false
        }, 3000)
      } else {
        this.set.message = 'error'
        this.set.success = false
        this.set.show = true
        setTimeout(() => {
          this.set.show = false
        }, 3000)
      }
    },
    handleImage (e) {
      const url = URL.createObjectURL(e.target.files[0])
      const img = new Image()
      img.src = url
      img.onload = () => {
        URL.revokeObjectURL(img.src)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          this.goods.image = canvas.toDataURL('image/jpg')
        }
      }
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
