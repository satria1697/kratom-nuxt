import { category } from '~/lib/misc/endpoints'

export const state = () => ({
  category: [],
  catego: null
})

export const mutations = {
  setCategoriesData (state, payload) {
    state.category = payload
  },
  setCategoryData (state, payload) {
    state.catego = payload
  }
}

export const actions = {
  async getCategory ({ commit }, payload) {
    const res = await this.$axios.get(category(), {
      params: payload
    })
    const { data } = res
    commit('setCategoriesData', data.data)
  },
  async getCategoryById ({ commit, dispatch }, id) {
    const res = await this.$axios.$get(category(id))
    const { data } = res
    commit('setCategoryData', data)
  },
  async postCategory ({ commit, dispatch }, payload) {
    const res = await this.$axios.post(category(payload.id), payload)
    return res.data
  },
  async deleteCategoryById ({ commit, dispatch }, id) {
    const res = await this.$axios.delete(category(id))
    const { data } = res
    return data
  }
}
