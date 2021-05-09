import { goods } from '~/lib/misc/endpoints'

export const state = () => ({
  goods: [],
  good: null
})

export const mutations = {
  setGoodsData (state, payload) {
    state.goods = payload
  },
  setGoodData (state, payload) {
    state.good = payload
  }
}

export const actions = {
  async postGoods ({ commit, dispatch }, payload) {
    dispatch('setHeader', null, { root: true })
    const res = await this.$axios.post(goods(payload.id), payload)
    return res.data
  },
  async getGoodsData ({ commit }) {
    const res = await this.$axios.$get(goods())
    const { data } = res
    commit('setGoodsData', data)
  },
  async getGoodById ({ commit }, id) {
    const res = await this.$axios.$get(goods(id))
    const { data } = res
    commit('setGoodData', data)
  }
}
