import { goods } from '~/lib/misc/endpoints'

export const state = () => ({
  goods: [],
  good: []
})

export const mutations = {
  setGoodsData (state, payload) {
    state.goods = payload
  },
  setGood (state, payload) {
    state.good = payload
  }
}

export const actions = {
  async getGoods ({ commit }) {
    const res = await this.$axios.$get(goods())
    const { data } = res
    commit('setGoodsData', data)
  },
  async getGoodById ({ commit }, id) {
    const res = await this.$axios.$get(goods(id))
    const { data } = res
    commit('setGood', data)
  }
}
