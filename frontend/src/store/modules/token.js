import Axios from "axios"

const state = {
  token: "",
}

const getters = {
  token: state => {
    if (state.token) return state.token
    const localStorageToken = localStorage.getItem("token")
    if (localStorageToken) return localStorageToken
    return null
  },
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
