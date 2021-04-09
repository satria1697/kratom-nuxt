import { kratom } from '~/lib/misc/endpoints'

export const state = () => ({
  kratoms: []
})

export const mutations = {
  setKratomsData (state, payload) {
    state.kratoms = payload
  }
}

export const actions = {
  getKratoms ({ commit }) {
    this.$axios.$get(kratom()).then((res) => {
      const { data } = res
      commit('setKratomsData', data.data)
    })
  }
}
