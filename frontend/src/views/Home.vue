<template>
  <b-container fluid class="main-container p-0">
    <Header class="header" />

    <transition name="slideLeft">
      <Filters
        v-if="show_filters"
        class="filters"
        :filters="filters"
        @close="show_filters = false"
      />
    </transition>
    <button
      type="button"
      v-if="!show_filters"
      class="show-filters-btn"
      @click="show_filters = true"
    >
      &gt;&gt;
    </button>

    <MusicList
      class="music-list"
      v-bind:musics="filteredMusics(filters)"
      @edit="dispatchEditMusic"
      @delete="dispatchDeleteMusic"
    />

    <NewMusic @new="dispatchNewMusic" />

    <!--
    <MusicEditor
      v-bind:music="targetMusic"
      @new="dispatchNewMusic"
      @edit="dispatchEditMusic"
      @delete="dispatchDeleteMusic"
      @newtag="newTag($event)"
      @cancel="show_editor = false"
    />
    -->
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Header from "@/components/Header.vue"
import Filters from "@/components/Filters.vue"
import MusicList from "@/components/MusicList.vue"
import NewMusic from "@/components/NewMusic.vue"

export default {
  name: "Home",
  components: {
    Header,
    Filters,
    MusicList,
    NewMusic,
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
      show_filters: false,
    }
  },
  computed: mapGetters(["allMusics", "filteredMusics", "getArtistByName"]),

  methods: {
    ...mapActions([
      "fetchMusics",
      "fetchArtists",
      "fetchLanguages",
      "fetchTags",
      "fetchInstruments",
      "newMusic",
      "newArtist",
      "newTag",
      "editMusic",
      "deleteMusic",
    ]),

    async dispatchNewMusic(music) {
      if (music.artist === -1) {
        music.artist = (
          await this.newArtist({ name: music.artist_name, defaultLanguage: music.language })
        ).id
      }

      this.newMusic(music)
    },

    async dispatchEditMusic(music) {
      if (music.artist === -1) {
        music.artist = (
          await this.newArtist({ name: music.artist_name, defaultLanguage: music.language })
        ).id
      }

      this.editMusic(music)
    },

    dispatchDeleteMusic(music) {
      this.deleteMusic(music.id)
    },
  },

  created() {
    this.fetchMusics()
    this.fetchArtists()
    this.fetchLanguages()
    this.fetchTags()
    this.fetchInstruments()
  },
}
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100vh;
  background-color: #f0f0f0;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
}

.header {
  grid-area: 1 / 1 / 2 / 3;
}

.filters {
  grid-area: 2 / 1 / 3 / 2;
  transition: all 0.5s;
}

.slideLeft-enter,
.slideLeft-leave-to {
  transform: translateX(-100%);
}

.music-list {
  grid-area: 2 / 2 / 3 / 3;
}

.show-filters-btn {
  width: 40px;
  height: 40px;

  position: relative;
  left: -50%;
  top: 5px;

  border: solid 1px black;
  border-radius: 50% 50%;
  cursor: pointer;

  &:hover {
    background-color: gray;
  }
}
</style>
