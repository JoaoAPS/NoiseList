<template>
  <div class="music-list">
    <MusicItem
      v-for="music in musics"
      :key="music.id"
      :music="music"
      :language="music.language ? allLanguages.find(lang => lang.id === music.language) : null"
      v-on:click.native="$emit('edit', music)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import MusicItem from "./MusicItem"

export default {
  name: "MusicList",
  components: {
    MusicItem,
  },
  props: ["musics"],

  computed: mapGetters(["allLanguages"]),
}
</script>

<style scoped></style>
