const state = {
  musics: [
    { id: 0, title: "Dois Barcos", artist: "Los Hermanos" },
    { id: 1, title: "Where I End and You Begin", artist: "Radiohead" },
  ],
}

const getters = {
  allMusics: state => state.musics,
}

const actions = {
  newMusic({ commit }, music) {
    commit("newMusic", music)
  },

  deleteMusic({ commit }, id) {
    commit("deleteMusic", id)
  },
}

const mutations = {
  newMusic(state, music) {
    state.musics.push({
      id: state.musics.length + 1, //Isso vai dar ruim
      title: music.title,
      artist: music.artist,
    })
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
