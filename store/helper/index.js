import jwtDecode from 'jwt-decode'

export const actions = {
  async setAuthState ({ commit }, payload) {
    const decode = jwtDecode(payload.jwt)
    await commit('setJwt', payload.jwt, { root: true })
    await commit('setUserInfo', decode, { root: true })
  }
}
