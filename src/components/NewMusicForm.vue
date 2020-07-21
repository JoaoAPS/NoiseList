<template>
  <form v-on:submit.prevent="$emit('submit', { title, artist })">
    <input type="text" v-model="title" placeholder="Music title" />
    <input type="text" v-model="artist" placeholder="Artist" />
    <button type="submit">Add</button>
    <button v-on:click="$emit('cancel')">Cancel</button>
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

<style scoped></style>
