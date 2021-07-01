import { cart, goods } from '~/lib/misc/endpoints'

export const state = () => ({
  goods: [],
  good: null,
  cart: []
})

export const mutations = {
  setGoodsData (state, payload) {
    state.goods = payload
  },
  setGoodData (state, payload) {
    state.good = payload
  },
  setCartData (state, payload) {
    state.cart = payload
  }
}

export const actions = {
  async postGoods ({ commit, dispatch }, payload) {
    const res = await this.$axios.post(goods(payload.id), payload)
    return res.data
  },
  async getGoodsData ({ commit }, payload) {
    const res = await this.$axios.$get(goods(), {
      params: payload
    })
    const { data } = res
    commit('setGoodsData', data)
  },
  async getGoodById ({ commit }, id) {
    const res = await this.$axios.$get(goods(id))
    const { data } = res
    commit('setGoodData', data)
  },
  async deleteGoodById ({ commit, dispatch }, id) {
    const res = await this.$axios.delete(goods(id))
    const { data } = res
    return data
  },
  async postGoodCart ({ dispatch }, payload) {
    const res = await this.$axios.post(cart(), payload)
    const { data } = res
    return data
  },
  async getGoodCart ({ dispatch, commit }) {
    const res = await this.$axios.post(cart('find'))
    const { data } = res
    commit('setCartData', data.data)
  },
  async checkoutCart ({ dispatch }) {
    const res = await this.$axios.post(cart('checkout'))
    const { data } = res
    return data
  },
  async deleteCart ({ dispatch }, payload) {
    const res = await this.$axios.post(cart(payload))
    const { data } = res
    return data
  }
}
