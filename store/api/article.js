import qs from 'qs'
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
  async getArticles ({ commit }, payload) {
    const res = await this.$axios.get(article(), {
      params: payload
    })
    const { data } = res
    commit('setArticlesData', data.data)
  },
  async getArticleById ({ commit }, id) {
    const res = await this.$axios.$get(article(id))
    const { data } = res
    commit('setArticleData', data)
  },
  async postArticle ({ commit, dispatch }, payload) {
    dispatch('setHeader', null, { root: true })
    const res = await this.$axios.$post(article(payload.slug), payload)
    return res.data
  },
  async deleteArticle ({ commit }, payload) {
    const res = await this.$axios.delete(article(payload.id), payload)
    return res.data
  }
}
