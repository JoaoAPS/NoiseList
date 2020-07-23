import Axios from "axios"

const state = {
  musics: [],
}

const getters = {
  allMusics: state => state.musics,
}

const actions = {
  async fetchMusics({ commit }) {
    try {
      const res = await Axios.get("http://localhost:7000/api/musics/")
      commit("setMusics", res.data)
    } catch (err) {
      console.log(err.response)
    }
  },

  async newMusic({ commit }, music) {
    try {
      const res = await Axios.post("http://localhost:7000/api/musics/", music)
      commit("newMusic", res.data)
    } catch (err) {
      console.log(err.response)
    }
  },

  async deleteMusic({ commit }, id) {
    try {
      await Axios.delete(`http://localhost:7000/api/musics/${id}`)
      commit("deleteMusic", id)
    } catch (err) {
      console.log(err.response)
    }
  },
}

const mutations = {
  setMusics(state, musics) {
    state.musics = musics
  },

  newMusic(state, music) {
    state.musics.push(music)
  },

  deleteMusic(state, id) {
    state.musics = state.musics.filter(music => music.id !== id)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
