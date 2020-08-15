import Vue from "vue"
import Vuex from "vuex"

import musics from "./modules/musics"
import artists from "./modules/artists"
import languages from "./modules/languages"
import tags from "./modules/tags"
import instruments from "./modules/instruments"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    musics,
    artists,
    languages,
    tags,
    instruments,
  },
})
