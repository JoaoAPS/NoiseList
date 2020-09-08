<template>
  <b-modal id="new-music-modal" title="Add a Song" size="lg">
    <MusicForm :music="newMusic" @newtag="$emit('newtag', $event)" />

    <template v-slot:modal-footer="{ ok, cancel }">
      <b-button
        size="sm"
        variant="secondary"
        @click="
          clear()
          cancel()
        "
      >
        Cancel
      </b-button>
      <b-button
        size="sm"
        variant="primary"
        @click="
          if (isValid()) {
            $emit('new', newMusic)
            ok()
            clear()
          }
        "
      >
        Add Music
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import MusicForm from "./MusicForm"

export default {
  name: "NewMusic",
  components: { MusicForm },

  data() {
    return {
      newMusic: {
        title: "",
        artist: null,
        language: null,
        tags: [],
        instruments: [],
      },
    }
  },

  methods: {
    clear() {
      this.newMusic = {
        title: "",
        artist: null,
        language: null,
        tags: [],
        instruments: [],
      }
    },

    isValid() {
      if (typeof this.newMusic.title !== "string" || this.newMusic.title.length < 1) {
        this.$bvModal.msgBoxOk("Song title must be set!")
        return false
      }

      if (typeof this.newMusic.artist !== "number") {
        this.$bvModal.msgBoxOk("Artist must be set!")
        return false
      }

      return true
    },
  },
}
</script>

<style scoped></style>
