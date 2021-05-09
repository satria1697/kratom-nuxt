import { article } from '~/lib/misc/endpoints'

export const state = () => ({
  articles: [],
  article: []
})

export const mutations = {
  setArticlesData (state, payload) {
    state.articles = payload
  },
  setArticle (state, payload) {
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
  }
}
