import { updateVerification, verificationStatus } from '~/lib/misc/endpoints'

export const state = () => ({
  status: []
})

export const mutations = {
  setStatus (state, payload) {
    state.status = payload
  }
}

export const actions = {
  async getVerificationStatus ({ commit }) {
    const res = await this.$axios.get(verificationStatus())
    const { data } = res
    commit('setStatus', data.data)
  },
  async updateVerification (payload) {
    const res = await this.$axios.post(updateVerification(), payload)
    const { data } = res
    return data
  }
}
