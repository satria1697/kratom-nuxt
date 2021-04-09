<template>
  <div>
    <span class="text-3xl font-semibold">Add Article</span>
    <div class="flex w-1/2 justify-between gap-x-8">
      <div class="flex flex-col w-full">
        <span class="text-lg">
          Title
        </span>
        <input v-model="title" class="rounded-md w-full" type="text" placeholder="Input article Title">
      </div>
      <div class="my-auto w-1/6">
        <input v-model="show" type="checkbox">
        <span>Show</span>
      </div>
    </div>
    <div class="flex justify-between w-full mt-3">
      <simple-mde v-model="text" />
    </div>
    <div class="flex gap-x-8 justify-center">
      <button class="rounded-md bg-main hover:bg-white border border-main text-white hover:text-main py-2 px-3 transition-colors w-[150px]" @click="handleClear">
        Clear
      </button>
      <button :disabled="isLoading" :class="{'cursor-not-allowed': isLoading}" class="rounded-md bg-yellow-400 hover:bg-white border border-yellow-400 text-white hover:text-yellow-400 py-2 px-3 transition-colors w-[150px]" @click="onSubmit">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import SimpleMde from '~/components/SimpleMde'
export default {
  components: { SimpleMde },
  data () {
    return {
      text: '',
      title: '',
      show: false,
      isLoading: false
    }
  },
  methods: {
    handleClear () {
      this.text = ''
    },
    onSubmit () {
      this.isLoading = true
      const payload = {
        title: this.title,
        text: this.text,
        show: this.show ? 1 : 0
      }
      this.$axios.post('/article', payload, {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      }).then((res) => {
        console.log(res)
      }).finally(() => {
        this.handleClear()
        this.isLoading = false
      })
    }
  }
}
</script>
