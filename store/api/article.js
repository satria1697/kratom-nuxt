import { article } from '~/lib/misc/endpoints'

export const state = () => ({
  articles: []
})

export const mutations = {
  setArticlesData (state, payload) {
    state.articles = payload
  }
}

export const actions = {
  async getArticles ({ commit }) {
    const res = await this.$axios.$get(article())
    const { data } = res
    console.log(data)
    commit('setArticlesData', data)
  }
}
