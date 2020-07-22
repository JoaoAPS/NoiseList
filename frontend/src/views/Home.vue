<template>
  <div>
    <Header v-on:new-music="show_form = true" />
    <NewMusicForm v-if="show_form" v-on:submit="newMusic_local" v-on:cancel="show_form = false" />
    <MusicList v-bind:musics="allMusics" v-on:delete="deleteMusic" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import MusicList from "@/components/MusicList.vue"
import Header from "@/components/Header.vue"
import NewMusicForm from "@/components/NewMusicForm.vue"

export default {
  name: "Home",
  components: {
    MusicList,
    Header,
    NewMusicForm,
  },

  data: () => {
    return {
      show_form: false,
    }
  },
  computed: mapGetters(["allMusics"]),

  methods: {
    ...mapActions(["newMusic", "deleteMusic"]),

    newMusic_local(newMusicData) {
      this.newMusic(newMusicData)
      this.show_form = false
    },
  },
}
</script>
