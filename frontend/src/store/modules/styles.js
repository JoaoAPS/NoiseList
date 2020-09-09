import Axios from "axios"

const state = {
  styles: [],
}

const getters = {
  allStyles: state => state.styles,
}

const actions = {
  async fetchStyles({ commit }) {
    try {
      const res = await Axios.get("http://localhost:7000/api/styles/")
      commit("setStyles", res.data)
    } catch (err) {
      console.log(err.response)
    }
  },
}

const mutations = {
  setStyles(state, styles) {
    state.styles = styles
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
