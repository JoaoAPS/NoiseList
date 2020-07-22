<template>
  <div class="music-item">
    <p class="music-title">{{ music.title }}</p>
    <p class="music-artist">{{ music.artist }}</p>
  </div>
</template>

<script>
export default {
  name: "MusicItem",
  props: ["music"],
}
</script>

<style scoped>
.music-item {
  width: 90%;

  margin: 1rem auto 0 auto;
  padding: 0.5rem 1rem;

  border-bottom: solid 2px black;
  border-radius: 2px 2px;

  cursor: pointer;
}

.music-title {
  font-size: 1.2rem;
}

.music-artist {
  font-size: 0.8rem;
  color: gray;
}
</style>
