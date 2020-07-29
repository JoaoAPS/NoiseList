<template>
  <div>
    <Header v-on:new-music="openNewMusic" />
    <MusicList v-bind:musics="allMusics" v-on:edit="openEditMusic" />

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
import MusicList from "@/components/MusicList.vue"
import Header from "@/components/Header.vue"
import MusicEditor from "@/components/MusicEditor.vue"

export default {
  name: "Home",
  components: {
    MusicList,
    Header,
    MusicEditor,
  },

  data: () => {
    return {
      show_editor: false,
      targetMusic: undefined,
    }
  },
  computed: mapGetters(["allMusics"]),

  methods: {
    ...mapActions(["fetchMusics", "newMusic", "editMusic", "deleteMusic", "fetchLanguages"]),

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
  },
}
</script>
