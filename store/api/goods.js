import { goods } from '~/lib/misc/endpoints'

export const state = () => ({
  goods: []
})

export const mutation = {
  setGoodsData (state, payload) {
    state.goods = payload
  }
}

export const action = {
  async postGoods ({ commit, dispatch }, payload) {
    dispatch('api/setHeader')
    const res = await this.$axios.post(goods(payload.id), payload)
    return res.data
  }
}
