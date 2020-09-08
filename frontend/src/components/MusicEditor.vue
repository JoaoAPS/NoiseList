<template>
  <div>
    <b-modal :id="`modal-${music.id}`" title="Edit Music" size="lg">
      <MusicForm :music="editedMusic" @newtag="$emit('newtag', $event)" />

      <template v-slot:modal-footer="{ ok, cancel }">
        <i class="fas fa-trash delete-icon" v-b-modal="`delete-modal-${music.id}`"></i>

        <b-button size="sm" variant="secondary" @click="cancel()">
          Cancel
        </b-button>
        <b-button
          size="sm"
          variant="primary"
          @click="
            if (isValid()) {
              $emit('edit', editedMusic)
              ok()
            }
          "
        >
          Confirm Edit
        </b-button>
      </template>
    </b-modal>

    <b-modal
      :id="`delete-modal-${music.id}`"
      size="sm"
      :title="`Delete ${music.title}?`"
      ok-title="Delete"
      ok-variant="danger"
      @ok="
        $emit('delete', music)
        $emit('ok')
      "
    >
    </b-modal>
  </div>
</template>

<script>
import MusicForm from "./MusicForm"

export default {
  name: "MusicEditor",
  components: { MusicForm },
  props: ["music"],

  data() {
    return {
      editedMusic: { ...this.music },
    }
  },

  methods: {
    isValid() {
      if (typeof this.editedMusic.title !== "string" || this.editedMusic.title.length < 1) {
        this.$bvModal.msgBoxOk("Song title must be set!")
        return false
      }

      if (typeof this.editedMusic.artist !== "number") {
        this.$bvModal.msgBoxOk("Artist must be set!")
        return false
      }

      return true
    },
  },
}
</script>

<style scoped>
.delete-icon {
  margin-right: auto;
  cursor: pointer;
}

.delete-icon:hover {
  color: red;
}
</style>
