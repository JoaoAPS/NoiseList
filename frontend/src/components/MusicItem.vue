<template>
  <div class="music-item">
    <div class="music-identification">
      <p class="music-title">{{ music.title }}</p>
      <p>
        <img
          v-if="language"
          :src="require(`@/assets/flags/${language.imageFileName}`)"
          :alt="`(${language})`"
          width="20"
          height="15"
        />
        <span class="music-artist">{{ music.artist }}</span>
      </p>
    </div>

    <div class="tags">
      <Tag v-for="tag in tags" :key="tag.id" :tag="tag" class="tag" />
    </div>

    <div class="instruments">
      <i
        v-for="instrument in instruments"
        :key="instrument.key"
        class="instrument fas fa-music"
        v-tooltip.top-end="instrument.name"
      ></i>
    </div>
  </div>
</template>

<script>
import Tag from "./Tag"

export default {
  name: "MusicItem",
  components: { Tag },
  props: ["music", "language", "tags", "instruments"],
}
</script>

<style lang="scss" scoped>
$instrument-symbol-width: 20px;
$item-height: 3.5rem;

.music-item {
  width: 90%;
  height: $item-height;

  margin: 1rem auto 0 auto;
  padding: 0.5rem 1rem;

  border-bottom: solid 2px black;
  border-radius: 2px 2px;
  cursor: pointer;

  display: grid;
  grid-template-columns: minmax(300px, auto) 1fr 3 * $instrument-symbol-width;
}

.music-identification {
  grid-column: 1/2;
  height: 0.9 * $item-height;
}

.music-title {
  font-size: 1.2rem;
}

.music-artist {
  font-size: 0.8rem;
  color: gray;
}

img {
  margin-right: 5px;
}

.instruments {
  grid-column: 3/4;
  height: 0.9 * $item-height;

  margin-left: 15px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.instrument {
  width: $instrument-symbol-width;
  font-size: 0.8rem;
}

.tags {
  grid-column: 2/3;
  margin-left: 20px;
}

.tag {
  margin-right: 10px;
}
</style>
