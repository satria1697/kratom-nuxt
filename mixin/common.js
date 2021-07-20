export default {
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    jwt () {
      return this.$store.state.jwt
    },
    langState () {
      return this.$i18n.locale
    },
    isMobile () {
      return this.$device.isMobile
    }
  },
  methods: {
    goTo (payload, params) {
      this.$router.push(this.localePath({ name: payload, params }))
    }
  }
}
