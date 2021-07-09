export default {
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    jwt () {
      return this.$store.state.jwt
    }
  },
  methods: {
    goTo (payload, params) {
      this.$router.push(this.localePath({ name: payload, params }))
    }
  }
}
