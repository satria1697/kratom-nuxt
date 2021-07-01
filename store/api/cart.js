import { cart, cartV } from '~/lib/misc/endpoints'

export const state = () => ({
  carts: [],
  status: []
})

export const mutations = {
  setCartsData (state, payload) {
    state.carts = payload
  },
  setStatusData (state, payload) {
    state.status = payload
  }
}

export const actions = {
  async getCarts ({ commit, dispatch }, payload) {
    const res = await this.$axios.get(cart(), {
      params: payload
    })
    const { data } = res
    commit('setCartsData', data.data)
  },
  async getStatus ({ commit }) {
    const res = await this.$axios.get(cartV('status'))
    const { data } = res
    commit('setStatusData', data.data)
  },
  async getCartById ({ commit, dispatch }, payload) {
    const res = await this.$axios.post(cartV(), {
      id: payload
    })
    const { data } = res
    return data.data
  },
  async updateCartStatus ({ commit, dispatch }, payload) {
    const res = await this.$axios.post(cartV('update'), payload)
    const { data } = res
    return data
  }
}
