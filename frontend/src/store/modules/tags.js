import Axios from "axios"

const state = {
  tags: [],
}

const getters = {
  allTags: state => state.tags,
}

const actions = {
  async fetchTags({ commit }) {
    try {
      const res = await Axios.get("http://localhost:7000/api/tags/")
      commit("setTags", res.data)
    } catch (err) {
      console.log(err.response)
    }
  },

  async newTag({ commit }, tag) {
    try {
      const res = await Axios.post("http://localhost:7000/api/tags/", tag)
      commit("newTag", res.data)
    } catch (err) {
      console.log(err.response)
    }
  },
}

const mutations = {
  setTags(state, tags) {
    state.tags = tags
  },

  newTag(state, tag) {
    state.tags.push(tag)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
