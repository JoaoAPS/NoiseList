import Axios from "axios"

const state = {
  instruments: [],
}

const getters = {
  allInstruments: state => state.instruments,
}

const actions = {
  async fetchInstruments({ commit }) {
    try {
      const res = await Axios.get("http://localhost:7000/api/instruments/")
      commit("setInstruments", res.data)
    } catch (err) {
      console.log(err.response)
    }
  },
}

const mutations = {
  setInstruments(state, instruments) {
    state.instruments = instruments
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
