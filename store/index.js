export const state = () => ({
  userInfo: null,
  token: null,
  jwt: null
})

export const mutations = {
  setUserInfo (state, payload) {
    state.userInfo = payload
  },
  setToken (state, payload) {
    state.token = payload
  },
  setJwt (state, payload) {
    state.jwt = payload
  }
}
