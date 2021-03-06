<template>
  <b-sidebar id="filters-sidebar" title="Filters" shadow>
    <div class="filter-container">
      <button type="button" class="btn btn-primary" @click="clearFilters">Clear</button>

      <label for="artist_filter">Artist</label>
      <v-select
        v-model="filters.artist"
        :options="artistFormOptions"
        :reduce="option => option.value"
        id="artist_filter"
      ></v-select>

      <label>Language</label>
      <div class="language-container">
        <div
          v-for="language in allLanguages"
          :key="language.id"
          class="language"
          :class="{ language_active: filters.languages.includes(language.id) }"
          @click="toggleLanguage(language.id)"
        >
          <img
            :src="require(`@/assets/flags/${language.imageFileName}`)"
            :alt="`(${language})`"
            width="20"
            height="15"
          />
          <span>{{ language.name }}</span>
        </div>
      </div>

      <label>Style</label>
      <div class="style-container">
        <div
          v-for="style in allStyles"
          :key="style.id"
          class="style"
          :class="{ style_active: filters.styles.includes(style.id) }"
          @click="toggleStyle(style.id)"
        >
          <span>{{ style.name }}</span>
        </div>
      </div>

      <label>Tags</label>
      <div class="tag-container">
        <Tag
          v-for="tag in allTags"
          :key="tag.id"
          :tag="tag"
          class="tag"
          :class="{ tag_active: filters.tags.includes(tag.id) }"
          @click.native="toggleTag(tag.id)"
        />
      </div>

      <label>Instruments</label>
      <div class="instrument-container">
        <div
          v-for="instrument in allInstruments"
          :key="instrument.id"
          class="instrument"
          :class="{ instrument_active: filters.instruments.includes(instrument.id) }"
          @click="toggleInstrument(instrument.id)"
        >
          <i class="fas fa-music"></i>
          <span>{{ instrument.name }}</span>
        </div>
      </div>
    </div>
  </b-sidebar>
</template>

<script>
import { mapGetters } from "vuex"
import Tag from "./Tag"

export default {
  name: "Filters",
  components: { Tag },

  props: ["filters"],

  computed: {
    ...mapGetters(["allArtists", "allLanguages", "allStyles", "allTags", "allInstruments"]),

    artistFormOptions() {
      return this.allArtists.map(artist => ({
        label: artist.name,
        value: artist.id,
      }))
    },
  },

  methods: {
    clearFilters() {
      this.filters.artist = null
      this.filters.languages = []
      this.filters.styles = []
      this.filters.tags = []
      this.filters.instruments = []
    },

    toggleLanguage(languageId) {
      if (this.filters.languages.includes(languageId)) {
        this.filters.languages = this.filters.languages.filter(id => id != languageId)
      } else {
        this.filters.languages.push(languageId)
      }
    },

    toggleStyle(styleId) {
      if (this.filters.styles.includes(styleId)) {
        this.filters.styles = this.filters.styles.filter(id => id != styleId)
      } else {
        this.filters.styles.push(styleId)
      }
    },

    toggleTag(tagId) {
      if (this.filters.tags.includes(tagId)) {
        this.filters.tags = this.filters.tags.filter(id => id != tagId)
      } else {
        this.filters.tags.push(tagId)
      }
    },

    toggleInstrument(instrumentId) {
      if (this.filters.instruments.includes(instrumentId)) {
        this.filters.instruments = this.filters.instruments.filter(id => id != instrumentId)
      } else {
        this.filters.instruments.push(instrumentId)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-container {
  position: relative;

  border-right: solid 2px black;
  box-shadow: 5px 0px 5px -5px grey;

  text-align: center;
}

label {
  display: block;
  font-size: 1.2rem;
  margin-top: 1rem;
}

#artist_filter {
  margin-left: 10px;
  margin-right: 10px;
}

.language,
.style,
.instrument {
  margin: 10px 10px;
  font-size: 0.8rem;
  text-align: left;
  cursor: pointer;

  &_active {
    color: green;
    font-weight: 600;
  }
}

.style {
  &-container {
    display: flex;
  }

  margin: 10px 15px;
}

img,
i {
  margin-right: 5px;
}

.tag {
  &-container {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  margin: 0 3px 15px 3px;
  cursor: pointer;

  &_active {
    border: solid 2px blue;
  }
}
</style>
