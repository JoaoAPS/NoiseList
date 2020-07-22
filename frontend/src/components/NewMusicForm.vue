<template>
  <form v-on:submit.prevent="$emit('submit', { title, artist })">
    <input type="text" v-model="title" placeholder="Music title" />
    <input type="text" v-model="artist" placeholder="Artist" />
    <button class="btn add" type="submit">Add</button>
    <button class="btn cancel" v-on:click="$emit('cancel')">Cancel</button>
  </form>
</template>

<script>
export default {
  name: "NewMusicForm",
  data: () => {
    return {
      title: "",
      artist: "",
    }
  },
}
</script>

<style scoped>
form {
  display: flex;
}

input[type="text"] {
  margin: 5px 5px;
  padding: 5px 5px;
  flex: 3;
}

button {
  flex: 1;
  margin: 5px 5px;
  border: none;
}

.add {
  background-color: #10f020;
}

.cancel {
  background-color: #f02010;
}
</style>
