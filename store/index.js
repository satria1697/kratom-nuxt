export const state = () => ({
  userInfo: null,
  jwt: null
})

export const mutations = {
  setUserInfo (state, payload) {
    state.userInfo = payload
  },
  setJwt (state, payload) {
    state.jwt = payload
  }
}

export const actions = {
  setHeader ({ state }) {
    this.$axios.setHeader('Authorization', `Bearer ${state.jwt}`)
  }
}
