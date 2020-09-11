import Vue from "vue"
import Axios from "axios"

const state = {
  musics: [],
}

const getters = {
  allMusics: state => state.musics,

  filteredMusics: state => filters => {
    let filteredMusics = [...state.musics]

    if (filters.artist) {
      filteredMusics = filteredMusics.filter(music => music.artist === filters.artist)
    }

    if (Array.isArray(filters.languages) && filters.languages.length > 0) {
      filteredMusics = filteredMusics.filter(music => filters.languages.includes(music.language))
    }

    if (Array.isArray(filters.styles) && filters.styles.length > 0) {
      filteredMusics = filteredMusics.filter(music => filters.styles.includes(music.style))
    }

    if (Array.isArray(filters.tags) && filters.tags.length > 0) {
      filteredMusics = filteredMusics.filter(music =>
        music.tags.some(tag => filters.tags.includes(tag))
      )
    }

    if (Array.isArray(filters.instruments) && filters.instruments.length > 0) {
      filteredMusics = filteredMusics.filter(music =>
        music.instruments.some(instrument => filters.instruments.includes(instrument))
      )
    }

    if (filters.search) {
      const searchText = filters.search.toLowerCase()
      filteredMusics = filteredMusics.filter(
        music =>
          music.title.toLowerCase().includes(searchText) ||
          music.artist_name.toLowerCase().includes(searchText)
      )
    }

    return filteredMusics.sort((music1, music2) =>
      music1.artist_name < music2.artist_name ? -1 : 1
    )
  },
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

  async editMusic({ commit }, music) {
    try {
      const res = await Axios.put(`http://localhost:7000/api/musics/${music.id}/`, music)
      commit("editMusic", res.data)
    } catch (err) {
      console.log(err.response)
    }
  },

  async deleteMusic({ commit }, id) {
    try {
      await Axios.delete(`http://localhost:7000/api/musics/${id}/`)
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

  editMusic(state, music) {
    const idx = state.musics.findIndex(x => x.id === music.id)
    Vue.set(state.musics, idx, music)
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
