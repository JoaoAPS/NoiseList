<template>
  <div>
    <Modal v-show="!askingDelete" v-on:background-click="$emit('cancel')" modalClass="music-editor">
      <h3>{{ headerText }}</h3>

      <form id="edit-form">
        <input type="text" v-model="tmpMusic.title" placeholder="Music title" />
        <input type="text" v-model="tmpMusic.artist" placeholder="Artist" />

        <span class="fas fa-trash delete-icon" @click="askingDelete = true"></span>

        <div class="btn-container">
          <button class="btn confirm" @click="$emit(music ? 'edit' : 'new', tmpMusic)">
            {{ confirmBtnText }}
          </button>
          <button class="btn cancel" @click="$emit('cancel')">Cancel</button>
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
import Modal from "./generic/Modal"
import ConfirmDelete from "./ConfirmDelete"

export default {
  name: "MusicEditor",
  components: { Modal, ConfirmDelete },
  props: ["music"],

  data() {
    return {
      tmpMusic: this.music ? { ...this.music } : { title: "", artist: "" },
      askingDelete: false,
    }
  },
  computed: {
    headerText() {
      return this.music ? "Edit Music" : "Add a new music"
    },

    confirmBtnText() {
      return this.music ? "Confirm" : "Add Music"
    },
  },
}
</script>

<style scoped>
.modal-container >>> .music-editor {
  position: fixed;
  top: 10vh;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 100;

  height: 500px;
  width: 800px;

  background-color: var(--main-bg-color);
  border: solid 1px gray;
  border-radius: 15px 15px;

  display: grid;
  grid-template-rows: auto 1fr;

  padding: 15px 0;
}

h3 {
  grid-row: 1/2;
  margin: 0 10%;
}

form {
  grid-row: 2/3;

  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

input[type="text"] {
  margin: 15px 10%;
  padding: 5px 5px;

  border: none;
  border-radius: 4px 4px;

  font-size: 1em;
}

.delete-icon {
  margin: auto 10% 0 auto;
  cursor: pointer;
}

.delete-icon:hover {
  color: red;
}

.btn-container {
  margin: 10px 10% 50px 10%;
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
