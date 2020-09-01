import Axios from "axios"

const state = {
  artists: [],
}

const getters = {
  getArtist: state => id => state.artists.find(artist => artist.id === id),
  allArtists: state => state.artists,
  allArtistsNames: state => state.artists.map(artist => artist.name).sort(),
}

const actions = {
  async fetchArtists({ commit }) {
    try {
      const res = await Axios.get("http://localhost:7000/api/artists/")
      commit("setArtists", res.data)
    } catch (err) {
      console.log(err.response)
    }
  },

  async newArtist({ commit }, artist) {
    try {
      const res = await Axios.post("http://localhost:7000/api/artists/", artist)
      commit("newArtist", res.data)
      return res.data
    } catch (err) {
      console.log(err.response)
    }
  },
}

const mutations = {
  setArtists(state, artists) {
    state.artists = artists
  },

  newArtist(state, artist) {
    state.artists.push(artist)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
