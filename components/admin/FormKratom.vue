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
            >Back</span
          >
          <div class="mb-3">
            <p>Name</p>
            <input
              v-model="kratom.name"
              type="text"
              class="py-2 px-3 border w-full rounded-md"
            />
          </div>
          <div class="mb-3">
            <p>Brief Description</p>
            <input
              v-model="kratom.brief"
              type="text"
              class="py-2 px-3 border w-full rounded-md"
            />
          </div>
          <div class="mb-3">
            <p>Description</p>
            <textarea
              v-model="kratom.description"
              class="py-2 px-3 border w-full rounded-md"
            ></textarea>
          </div>
          <div class="flex gap-2 mb-3">
            <div class="w-1/2">
              <p>Price</p>
              <input
                v-model="kratom.price"
                type="number"
                class="py-2 px-3 border w-full rounded-md"
              />
            </div>
            <div class="w-1/2">
              <p>Stock</p>
              <input
                v-model="kratom.stock"
                type="number"
                class="py-2 px-3 border w-full rounded-md"
              />
            </div>
          </div>
          <div
            class="flex flex-col mb-3 border-2 border-gray-600 rounded-md py-2 px-3"
          >
            <p>Image</p>
            <input class="mb-3" type="file" @change="handleImage" />
            <img
              v-if="kratom.image !== ''"
              :src="kratom.image"
              alt="kratom image"
            />
          </div>
          <span
            v-if="set.show"
            class="text-white py-1 px-2 mb-2 mx-3 w-auto rounded-full"
            :class="set.success ? 'bg-green-900' : 'bg-red-900'"
            >{{ set.message }}</span
          >
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
      required: true,
    },
  },
  data() {
    return {
      kratom: {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        image: '',
        brief: '',
      },
      set: {
        message: '',
        success: false,
        show: false,
      },
      isLoading: false,
    }
  },
  async created() {
    if (this.id > 0) {
      this.isLoading = true
      this.$axios
        .get('api/kratom/{id}'.replace('{id}', this.id.toString()))
        .then((res) => {
          const { data } = res
          if (data.success) {
            this.kratom = data.data
          }
          this.isLoading = false
        })
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    async submit() {
      this.isLoading = true
      const payload = {
        id: this.id,
        name: this.kratom.name,
        description: this.kratom.description,
        price: this.kratom.price.toString(),
        stock: this.kratom.stock.toString(),
        image: this.kratom.image,
        brief: this.kratom.brief,
      }
      console.log(payload)
      console.log(this.id)
      let res
      if (this.id === 0) {
        res = await this.$axios.post('api/kratom', payload)
      } else if (this.id > 0) {
        res = await this.$axios.post(`api/kratom/${this.id}`, payload, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('token'),
          },
        })
      }
      this.isLoading = false
      if (res) {
        this.set.message = 'success'
        this.set.success = true
        this.set.show = true
        if (this.id === 0) {
          this.kratom.description = ''
          this.kratom.name = ''
          this.kratom.price = 0
          this.kratom.stock = 0
          this.kratom.image = ''
          this.kratom.brief = ''
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
    handleImage(e) {
      const url = URL.createObjectURL(e.target.files[0])
      const img = new Image()
      img.src = url
      img.onload = () => {
        URL.revokeObjectURL(img.src)
        console.log(img)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          this.kratom.image = canvas.toDataURL('image/png')
        }
      }
    },
  },
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
