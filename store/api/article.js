import { article } from '~/lib/misc/endpoints'

export const state = () => ({
  articles: [],
  article: null
})

export const mutations = {
  setArticlesData (state, payload) {
    state.articles = payload
  },
  setArticleData (state, payload) {
    state.article = payload
  }
}

export const actions = {
  async getArticles ({ commit }) {
    const res = await this.$axios.$get(article())
    const { data } = res
    commit('setArticlesData', data)
  },
  async getArticleById ({ commit }, id) {
    const res = await this.$axios.$get(article(id))
    const { data } = res
    commit('setArticle', data)
  },
  async postArticle ({ commit, dispatch }, payload) {
    dispatch('setHeader', null, { root: true })
    const res = await this.$axios.$post(article(payload.slug), payload)
    return res.data
  }
}
