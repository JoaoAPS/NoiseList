<template>
  <Modal v-on:background-click="$emit('cancel')">
    <h3>Delete {{ music.title }}?</h3>

    <button class="btn confirm" @click="$emit('confirm', music)">Yes</button>
    <button class="btn cancel" @click="$emit('cancel')">No</button>
  </Modal>
</template>

<script>
import Modal from "./generic/Modal"

export default {
  name: "ConfirmDelete",
  components: {
    Modal,
  },
  props: ["music"],
}
</script>

<style scoped>
.modal-container {
  text-align: center;
}

h3 {
  margin-top: 15px;
}

.modal-container >>> .modal {
  width: auto;
  height: auto;
  top: 45vh;
  transform: translate(-50%, -50%);
}

button {
  width: 150px;
  margin: 15px 15px;
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
