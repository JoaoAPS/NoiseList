<template>
  <div class="music-list">
    <MusicItem
      v-for="music in musics"
      :key="music.id"
      :music="music"
      :language="music.language ? allLanguages.find(lang => lang.id === music.language) : null"
      :tags="allTags.filter(tag => music.tags.includes(tag.id))"
      :instruments="allInstruments.filter(inst => music.instruments.includes(inst.id))"
      @click.native="$emit('edit', music)"
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

  computed: mapGetters(["allLanguages", "allTags", "allInstruments"]),
}
</script>

<style scoped>
.music-list {
  padding: 8px 1rem;
  display: flex;
  flex-direction: column;
}
</style>
