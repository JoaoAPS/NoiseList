<template>
  <div>
    <Modal v-show="!askingDelete" v-on:background-click="$emit('cancel')" class="music-editor">
      <form id="edit-form" @submit.prevent="$emit(music ? 'edit' : 'new', tmpMusic)">
        <label for="title">Song title</label>
        <input type="text" required id="title" v-model="tmpMusic.title" />

        <label for="artist">Artist</label>
        <input type="text" required id="artist" v-model="tmpMusic.artist" />

        <label for="language">Language</label>
        <select id="language" v-model="tmpMusic.language">
          <option value="null">-----</option>
          <option v-for="language in allLanguages" :key="language.id" :value="language.id">
            {{ language.name }}
          </option>
        </select>

        <label>Tags</label>
        <div class="tag-container">
          <Tag
            v-for="tag in allTags"
            :key="tag.id"
            :tag="tag"
            class="tag"
            :class="{ tag_active: tmpMusic.tags.includes(tag.id) }"
            @click.native="toggleTag(tag.id)"
          />
        </div>

        <label>Instruments</label>
        <div class="instrument-container">
          <span
            v-for="instrument in allInstruments"
            :key="instrument.key"
            class="instrument"
            :class="{ instrument_active: tmpMusic.instruments.includes(instrument.id) }"
            @click="toggleInstrument(instrument.id)"
          >
            {{ instrument.name }}
          </span>
        </div>

        <i class="fas fa-trash delete-icon" @click="askingDelete = true"></i>
      </form>

      <div class="btn-container">
        <button type="submit" class="btn confirm" form="edit-form">
          {{ confirmBtnText }}
        </button>
        <button type="button" class="btn cancel" @click="$emit('cancel')">Cancel</button>
      </div>
    </Modal>

    <ConfirmDelete
      v-if="askingDelete"
      v-bind:music="music"
      v-on:cancel="askingDelete = false"
      v-on:confirm="$emit('delete', music)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Modal from "./generic/Modal"
import Tag from "./Tag"
import ConfirmDelete from "./ConfirmDelete"

export default {
  name: "MusicEditor",
  components: { Modal, Tag, ConfirmDelete },
  props: ["music"],

  data() {
    return {
      tmpMusic: this.music
        ? { ...this.music }
        : { title: "", artist: "", language: null, tags: [], instruments: [] },
      languageId: this.music ? this.music.language : -1,
      askingDelete: false,
    }
  },

  computed: {
    ...mapGetters(["allLanguages", "allTags", "allInstruments"]),

    headerText() {
      return this.music ? "Edit Music" : "Add a new music"
    },

    confirmBtnText() {
      return this.music ? "Confirm edit" : "Add Music"
    },
  },

  methods: {
    toggleTag(tagId) {
      if (this.tmpMusic.tags.includes(tagId)) {
        this.tmpMusic.tags = this.tmpMusic.tags.filter(id => id != tagId)
      } else {
        this.tmpMusic.tags.push(tagId)
      }
    },

    toggleInstrument(instrumentId) {
      if (this.tmpMusic.instruments.includes(instrumentId)) {
        this.tmpMusic.instruments = this.tmpMusic.instruments.filter(id => id != instrumentId)
      } else {
        this.tmpMusic.instruments.push(instrumentId)
      }
    },
  },
}
</script>

<style scoped>
.music-editor >>> .modal {
  position: fixed;
  top: 10vh;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 100;

  height: 80vh;
  width: 800px;
  padding: 15px 120px;

  background-color: var(--main-bg-color);
  border: solid 1px gray;
  border-radius: 15px 15px;

  display: grid;
  grid-template-rows: auto 1fr auto;
}

h3 {
  grid-row: 1/2;
}

#edit-form {
  grid-row: 2/3;
  padding-right: 15px;

  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

label {
  margin: 30px 0px 5px 10px;
  font-size: 0.9rem;
}

input[type="text"] {
  padding: 5px 5px;
  font-size: 0.8rem;

  border: 1px solid gray;
  border-radius: 4px 4px;

  transition: all 0.2s;
}

input[type="text"]:focus {
  outline: none;
  border: solid 1px black;
  box-shadow: 1px 1px gray;
}

option {
  text-transform: capitalize;
}

.blank-option {
  color: gray;
  text-emphasis: italic;
}

.tag {
  margin-right: 10px;
  cursor: pointer;
}

.tag_active {
  border: solid 2px green;
  box-shadow: 0 0 5px green;
}

.instrument {
  margin-right: 10px;
  font-size: 0.8rem;
  cursor: pointer;
}

.instrument_active {
  color: green;
  font-weight: 600;
}

.delete-icon {
  margin: auto 0 0 auto;
  cursor: pointer;
}

.delete-icon:hover {
  color: red;
}

.btn-container {
  grid-row: 3/4;
  margin: 10px 0 20px 0;
  text-align: center;
}

button {
  width: 150px;
  margin: 0 15px;
  padding: 10px 10px;

  border: none;

  text-transform: uppercase;
  font-weight: bold;
}

.confirm:hover {
  background-color: #10f020;
}

.cancel:hover {
  background-color: #f02010;
}
</style>
