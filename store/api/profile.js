import { profile } from '~/lib/misc/endpoints'

export const state = () => ({
  profiles: [],
  profile: []
})

export const mutations = {
  setProfilesData (state, payload) {
    state.profiles = payload
  },
  setProfile (state, payload) {
    state.profile = payload
  }
}

export const actions = {
  async getProfiles ({ commit }) {
    const res = await this.$axios.$get(profile())
    const { data } = res
    commit('setProfilesData', data)
  },
  async getProfileById ({ commit }, id) {
    const res = await this.$axios.$get(profile(id))
    const { data } = res
    commit('setProfile', data)
  }
}
