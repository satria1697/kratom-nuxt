<template>
  <div class="w-11/12 lg:w-full mx-auto">
    <span class="text-3xl font-semibold">Add Article</span>
    <template>
      <div class="flex flex-col lg:flex-row w-full lg:w-1/2 justify-between gap-x-8">
        <div class="flex flex-col w-full">
          <span class="text-lg">
            Title
          </span>
          <input
            v-model="article.title"
            class="rounded-md w-full"
            type="text"
            placeholder="Input article Title"
          >
        </div>
        <div class="my-auto w-full lg:w-1/6">
          <input v-model="article.show" type="checkbox">
          <span>Show</span>
        </div>
      </div>
      <div class="flex flex-col w-full mb-3">
        <span class="text-lg">
          Brief
        </span>
        <input
          v-model="article.brief"
          class="rounded-md w-full"
          type="text"
          placeholder="Input article brief description"
        >
      </div>
      <div
        class="flex flex-col mb-3"
      >
        <p>Image</p>
        <input
          class="mb-3"
          type="file"
          accept="image/jpeg, image/png"
          @change="handleImage"
        >
        <img
          v-if="article.image !== ''"
          :src="article.image"
          alt="article image"
        >
      </div>
      <div class="flex justify-between w-full mt-3">
        <simple-mde v-model="article.text" />
      </div>
    </template>
    <div class="flex gap-x-8 justify-center">
      <button class="rounded-md bg-main hover:bg-white border border-main text-white hover:text-main py-2 px-3 transition-colors w-[150px]" @click="handleClear">
        Clear
      </button>
      <button
        :disabled="isLoading"
        :class="{'cursor-not-allowed': isLoading}"
        class="rounded-md bg-yellow-400 hover:bg-white border border-yellow-400 text-white hover:text-yellow-400 py-2 px-3 transition-colors w-[150px]"
        @click="onSubmit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import SimpleMde from '~/components/SimpleMde'
export default {
  components: { SimpleMde },
  middleware: 'admin',
  data () {
    return {
      article: {
        text: '',
        title: '',
        show: false,
        brief: '',
        image: ''
      },
      isLoading: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.$route.params.slug !== 'add') {
        this.isLoading = true
        this.$axios.get(`/article/${this.$route.params.slug}`).then((res) => {
          const { data } = res
          this.article = data.data
        }).finally(() => {
          this.isLoading = false
        })
      }
    },
    handleClear () {
      this.text = ''
    },
    onSubmit () {
      this.isLoading = true
      const payload = {
        title: this.article.title,
        text: this.article.text,
        show: this.article.show ? 1 : 0,
        brief: this.article.brief,
        image: this.article.image,
        jwt: this.$store.state.jwt
      }
      if (this.$route.params.slug === 'add') {
        this.$axios.post('/article', payload, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        }).finally(() => {
          this.handleClear()
          this.isLoading = false
        })
      } else {
        this.$axios.post(`/article/${this.$route.params.slug}`, payload, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        }).finally(() => {
          this.handleClear()
          this.isLoading = false
        })
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
          this.article.image = canvas.toDataURL('image/jpg')
        }
      }
    }
  }
}
</script>
