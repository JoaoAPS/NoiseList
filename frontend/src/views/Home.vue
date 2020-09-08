<template>
  <b-container fluid class="main-container p-0">
    <div
      v-if="isLoading"
      class="d-flex align-items-center justify-content-center"
      style="width: 100vw; height:100vh;"
    >
      <b-spinner label="Loading" class="m-auto"></b-spinner>
    </div>

    <template v-else>
      <Header class="header" @togglefilter="show_filters = !show_filters" />

      <Filters :filters="filters" />

      <MusicList
        class="music-list"
        v-bind:musics="filteredMusics(filters)"
        @edit="dispatchEditMusic"
        @delete="dispatchDeleteMusic"
        @newtag="newTag"
      />

      <NewMusic @new="dispatchNewMusic" @newtag="newTag" />
    </template>
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
      isLoading: true,
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
      this.showAlert("Music created!")
    },

    async dispatchEditMusic(music) {
      if (music.artist === -1) {
        music.artist = (
          await this.newArtist({ name: music.artist_name, defaultLanguage: music.language })
        ).id
      }

      this.editMusic(music)
      this.showAlert("Music edited!")
    },

    dispatchDeleteMusic(music) {
      this.deleteMusic(music.id)
      this.showAlert("Music deleted!")
    },

    showAlert(msg) {
      this.$bvToast.toast(msg, {
        noCloseButton: true,
        autoHideDelay: 2000,
        variant: "success",
      })
    },
  },

  mounted() {
    this.isLoading = true

    this.fetchMusics()
    this.fetchArtists()
    this.fetchLanguages()
    this.fetchTags()
    this.fetchInstruments()

    this.isLoading = false
  },
}
</script>

<style lang="scss" scoped>
.tmp {
  width: 100%;
}

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

  /deep/ .popout-alert {
    position: fixed;
    top: 15px;
    left: 50vw;
    transform: translateX(-50%);
  }
}
</style>
