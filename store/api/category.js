import { category } from '~/lib/misc/endpoints'

export const state = () => ({
  category: []
})

export const mutations = {
  setCategoriesData (state, payload) {
    state.category = payload
  }
}

export const actions = {
  async getCategory ({ commit }) {
    const res = await this.$axios.$get(category())
    const { data } = res
    commit('setCategoriesData', data)
  }
}
