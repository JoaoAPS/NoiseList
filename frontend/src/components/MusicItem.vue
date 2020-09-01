<template>
  <b-card :title="music.title" class="music-card mb-3">
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
  cursor: pointer;
  border: none;
}

.music-card:hover {
  box-shadow: 0px 1px 2px gray;
}

.card-title {
  font-size: 1.3rem;
}

.card-subtitle {
  font-size: 0.9rem;
}
</style>
