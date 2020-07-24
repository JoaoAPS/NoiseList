<template>
  <div>
    <Header v-on:new-music="show_editor = true" />
    <MusicList v-bind:musics="allMusics" v-on:delete="askDelete" />

    <MusicEditor
      v-if="show_editor"
      v-on:confirm="newMusic_local"
      v-on:cancel="show_editor = false"
    />
    <ConfirmDelete
      v-if="show_confirmDelete"
      v-bind:music="deleteTarget"
      v-on:confirm="deleteMusic_local"
      v-on:cancel="show_confirmDelete = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import MusicList from "@/components/MusicList.vue"
import Header from "@/components/Header.vue"
import MusicEditor from "@/components/MusicEditor.vue"
import ConfirmDelete from "@/components/ConfirmDelete.vue"

export default {
  name: "Home",
  components: {
    MusicList,
    Header,
    MusicEditor,
    ConfirmDelete,
  },

  data: () => {
    return {
      show_editor: false,
      show_confirmDelete: false,
      deleteTarget: {},
    }
  },
  computed: mapGetters(["allMusics"]),

  methods: {
    ...mapActions(["fetchMusics", "newMusic", "deleteMusic"]),

    newMusic_local(newMusicData) {
      this.newMusic(newMusicData)
      this.show_editor = false
    },

    askDelete(music) {
      this.deleteTarget = music
      this.show_confirmDelete = true
    },

    deleteMusic_local(music) {
      this.deleteMusic(music.id)
      this.show_confirmDelete = false
    },
  },

  created() {
    this.fetchMusics()
  },
}
</script>
