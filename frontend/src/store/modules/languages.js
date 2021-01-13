import Axios from "axios"

const state = {
  languages: [],
}

const getters = {
  allLanguages: state => state.languages,
}

const actions = {
  async fetchLanguages({ commit }) {
    try {
      const res = await Axios.get("/api/languages/")
      commit("setLanguages", res.data)
    } catch (err) {
      console.log(err.response)
    }
  },
}

const mutations = {
  setLanguages(state, languages) {
    state.languages = languages
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
