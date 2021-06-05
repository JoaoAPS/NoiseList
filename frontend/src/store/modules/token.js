import Axios from "axios"

const state = {
  token: "",
}

const getters = {
  token: state => state.token,
}

const actions = {
  async getToken({ commit }, credentials) {
    try {
      const res = await Axios.post("/api/get-token/", {
        username: credentials.username,
        password: credentials.password,
      })
      commit("setToken", res.data.token)
      return res.data.token
    } catch (err) {
      console.log(err)
    }
  },
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
