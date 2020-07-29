<template>
  <div>
    <Modal v-show="!askingDelete" v-on:background-click="$emit('cancel')" class="music-editor">
      <h3>{{ headerText }}</h3>

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

        <i class="fas fa-trash delete-icon" @click="askingDelete = true"></i>

        <div class="btn-container">
          <button type="submit" class="btn confirm" form="edit-form">
            {{ confirmBtnText }}
          </button>
          <button type="button" class="btn cancel" @click="$emit('cancel')">Cancel</button>
        </div>
      </form>
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
import ConfirmDelete from "./ConfirmDelete"

export default {
  name: "MusicEditor",
  components: { Modal, ConfirmDelete },
  props: ["music"],

  data() {
    return {
      tmpMusic: this.music ? { ...this.music } : { title: "", artist: "", language: null },
      languageId: this.music ? this.music.language : -1,
      askingDelete: false,
    }
  },
  computed: {
    ...mapGetters(["allLanguages"]),

    headerText() {
      return this.music ? "Edit Music" : "Add a new music"
    },

    confirmBtnText() {
      return this.music ? "Confirm edit" : "Add Music"
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

  height: 500px;
  width: 800px;
  padding: 15px 120px;

  background-color: var(--main-bg-color);
  border: solid 1px gray;
  border-radius: 15px 15px;

  display: grid;
  grid-template-rows: auto 1fr;
}

h3 {
  grid-row: 1/2;
}

form {
  grid-row: 2/3;

  display: flex;
  flex-direction: column;
}

label {
  margin: 30px 0px 5px 10px;
  font-size: 0.9rem;
}

input[type="text"] {
  padding: 5px 5px;
  font-size: 1rem;

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

.delete-icon {
  margin: auto 0 0 auto;
  cursor: pointer;
}

.delete-icon:hover {
  color: red;
}

.btn-container {
  margin: 10px 0 50px 0;
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
