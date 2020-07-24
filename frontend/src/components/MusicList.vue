<template>
  <div class="music-list">
    <MusicItem
      v-for="music in musics"
      v-bind:key="music.id"
      v-bind:music="music"
      v-on:click.native="$emit('delete', music)"
    />
  </div>
</template>

<script>
import MusicItem from "./MusicItem"

export default {
  name: "MusicList",
  components: {
    MusicItem,
  },
  props: ["musics"],
}
</script>

<style scoped></style>
