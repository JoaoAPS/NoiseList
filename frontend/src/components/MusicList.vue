<template>
  <div>
    <b-container>
      <b-card-group deck class="p-md-3">
        <MusicItem
          v-for="music in musics"
          :key="music.id"
          :music="music"
          :language="music.language ? allLanguages.find(lang => lang.id === music.language) : null"
          :tags="allTags.filter(tag => music.tags.includes(tag.id))"
          :instruments="allInstruments.filter(inst => music.instruments.includes(inst.id))"
          v-b-modal="`modal-${music.id}`"
        />
      </b-card-group>
    </b-container>

    <MusicEditor
      v-for="music in musics"
      :key="music.id"
      :music="music"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
      @newtag="$emit('newtag', $event)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import MusicItem from "./MusicItem"
import MusicEditor from "./MusicEditor"

export default {
  name: "MusicList",
  components: {
    MusicItem,
    MusicEditor,
  },
  props: ["musics"],

  computed: mapGetters(["allLanguages", "allTags", "allInstruments"]),
}
</script>

<style scoped>
@media (max-width: 400px) {
  .card-deck {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
