<template>
  <div>
    <Header v-on:new-music="show_form = true" />
    <NewMusicForm v-if="show_form" v-on:submit="newMusic" v-on:cancel="show_form = false" />
    <MusicList v-bind:musics="musics" v-on:delete="deleteMusic" />
  </div>
</template>

<script>
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
      musics: [
        { id: 0, title: "Dois Barcos", artist: "Los Hermanos" },
        { id: 1, title: "Where I End and You Begin", artist: "Radiohead" },
      ],
      show_form: false,
    }
  },
  methods: {
    newMusic(newMusicData) {
      this.musics.push({
        id: this.musics.length + 1, //Isso vai dar ruim
        title: newMusicData.title,
        artist: newMusicData.artist,
      })
      this.show_form = false
    },
    deleteMusic(id) {
      this.musics = this.musics.filter(music => music.id !== id)
    },
  },
}
</script>
