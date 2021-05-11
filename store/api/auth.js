import { login, logout, register, verification } from '~/lib/misc/endpoints'

export const actions = {
  async register ({ commit }, payload) {
    const res = await this.$axios.post(register(), payload)
    const { data } = res
    return data
  },
  async verification ({ commit }, payload) {
    const res = await this.$axios.post(verification(), payload)
    const { data } = res
    return data
  },
  async login ({ commit }, payload) {
    const res = await this.$axios.post(login(), payload)
    const { data } = res
    return data
  },
  async logout ({ dispatch }) {
    dispatch('setHeader', null, { root: true })
    const res = await this.$axios.post(logout())
    const { data } = res
    return data
  }
}
