import Vue from "vue"
import Vuex from "vuex"

import music from "./modules/music"
import languages from "./modules/languages"
import tags from "./modules/tags"
import instruments from "./modules/instruments"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    music,
    languages,
    tags,
    instruments,
  },
})
