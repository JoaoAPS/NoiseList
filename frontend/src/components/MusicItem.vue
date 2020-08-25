<template>
  <b-card :title="music.title" class="music-card">
    <div class="card-subtitle text-muted">
      {{ music.artist_name }}

      <img
        v-if="language"
        :src="require(`@/assets/flags/${language.imageFileName}`)"
        :alt="`(${language})`"
        width="20"
        height="15"
        class="float-right"
      />
    </div>

    <b-card-text v-if="tags.length != 0" class="border-top pt-1">
      <Tag v-for="tag in tags" :key="tag.id" :tag="tag" class="tag" />
    </b-card-text>
  </b-card>
  <!--
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
        <span class="music-artist">{{ music.artist_name }}</span>
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
  -->
</template>

<script>
import Tag from "./Tag"

export default {
  name: "MusicItem",
  components: { Tag },
  props: ["music", "language", "tags", "instruments"],
}
</script>

<style scoped>
.music-card {
  min-width: 400px;
  margin-bottom: 15px;
  cursor: pointer;
}

.card-title {
  font-size: 1.3rem;
}

.card-subtitle {
  font-size: 0.9rem;
}
</style>
