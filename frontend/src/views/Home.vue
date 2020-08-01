<template>
  <div class="main-container">
    <Header v-on:new-music="openNewMusic" class="header" />
    <Filters class="filters" :filters="filters" />
    <MusicList
      class="music-list"
      v-bind:musics="filteredMusics(filters)"
      v-on:edit="openEditMusic"
      :key="musicListKey"
    />

    <MusicEditor
      v-if="show_editor"
      v-bind:music="targetMusic"
      v-on:new="dispatchNewMusic"
      v-on:edit="dispatchEditMusic"
      v-on:delete="dispatchDeleteMusic"
      v-on:cancel="show_editor = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Header from "@/components/Header.vue"
import Filters from "@/components/Filters.vue"
import MusicList from "@/components/MusicList.vue"
import MusicEditor from "@/components/MusicEditor.vue"

export default {
  name: "Home",
  components: {
    Header,
    Filters,
    MusicList,
    MusicEditor,
  },

  data: () => {
    return {
      show_editor: false,
      targetMusic: undefined,
      filters: {
        languages: [],
        tags: [],
        instruments: [],
      },
    }
  },
  computed: mapGetters(["allMusics", "filteredMusics"]),

  methods: {
    ...mapActions([
      "fetchMusics",
      "newMusic",
      "editMusic",
      "deleteMusic",
      "fetchLanguages",
      "fetchTags",
      "fetchInstruments",
    ]),

    openNewMusic() {
      this.targetMusic = undefined
      this.show_editor = true
    },

    openEditMusic(music) {
      this.targetMusic = music
      this.show_editor = true
    },

    dispatchNewMusic(music) {
      this.newMusic(music)
      this.show_editor = false
    },

    dispatchEditMusic(music) {
      this.editMusic(music)
      this.show_editor = false
    },

    dispatchDeleteMusic(music) {
      this.deleteMusic(music.id)
      this.show_editor = false
    },
  },

  created() {
    this.fetchMusics()
    this.fetchLanguages()
    this.fetchTags()
    this.fetchInstruments()
  },
}
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
}

.header {
  grid-area: 1 / 1 / 2 / 3;
}

.filters {
  grid-area: 2 / 1 / 3 / 2;
}

.music-list {
  grid-area: 2 / 2 / 3 / 3;
}
</style>
