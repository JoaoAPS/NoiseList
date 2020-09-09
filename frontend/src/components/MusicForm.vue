<template>
  <b-form>
    <b-form-group
      label="Song title"
      label-for="song-title-field"
      label-cols-lg="2"
      label-align-lg="right"
    >
      <b-form-input
        id="song-title-field"
        v-model="music.title"
        type="text"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Artist" label-for="artist-field" label-cols-lg="2" label-align-lg="right">
      <v-select
        id="artist-field"
        v-model="artist"
        :options="artistFormOptions"
        taggable
        :clearSearchOnBlur="() => {}"
      >
      </v-select>
      <p v-if="isNewArtist" class="text-info m-0">
        <small><em>New artist will be added</em></small>
      </p>
    </b-form-group>

    <b-form-group
      label="Language"
      label-for="language-field"
      label-cols-lg="2"
      label-align-lg="right"
    >
      <v-select
        id="language-field"
        v-model="music.language"
        :options="languageFormOptions"
        :reduce="option => option.value"
      >
      </v-select>
    </b-form-group>

    <b-form-group label="Style" label-for="style-field" label-cols-lg="2" label-align-lg="right">
      <v-select
        id="style-field"
        v-model="music.style"
        :options="styleFormOptions"
        :reduce="option => option.value"
      >
      </v-select>
    </b-form-group>

    <hr />
    <b-form-group label="Tags">
      <div class="tag-container container">
        <Tag
          v-for="tag in allTags"
          :key="tag.id"
          :tag="tag"
          class="tag"
          :class="{ tag_active: music.tags.includes(tag.id) }"
          @click.native="toggleTag(tag.id)"
        />
      </div>
      <div class="newtag-container">
        <input type="text" placeholder="New tag" class="newtag-input" v-model="newtag" />
        <input type="text" placeholder="Color" class="newtag-color" v-model="newtagcolor" />
        <b-button variant="light" class="btn-sm" @click="addtag">Add tag</b-button>
      </div>
    </b-form-group>

    <b-form-group label="Instruments">
      <div class="instrument-container container">
        <span
          v-for="instrument in allInstruments"
          :key="instrument.key"
          class="instrument"
          :class="{ instrument_active: music.instruments.includes(instrument.id) }"
          @click="toggleInstrument(instrument.id)"
        >
          {{ instrument.name }}
        </span>
      </div>
    </b-form-group>
  </b-form>
</template>

<script>
import Tag from "./Tag"
import { mapGetters } from "vuex"

export default {
  name: "MusicForm",
  props: ["music"],
  components: { Tag },
  data() {
    return {
      languageId: this.music ? this.music.language : -1,
      newtag: "",
      newtagcolor: "",
      artist: { label: this.music.artist_name, value: this.music.artist },
    }
  },

  computed: {
    ...mapGetters([
      "allLanguages",
      "allStyles",
      "allTags",
      "allInstruments",
      "allArtists",
      "getArtist",
    ]),

    artistFormOptions() {
      return this.allArtists.map(artist => ({
        label: artist.name,
        value: artist.id,
      }))
    },

    languageFormOptions() {
      return this.allLanguages.map(language => ({
        label: language.name,
        value: language.id,
      }))
    },

    styleFormOptions() {
      return this.allStyles.map(style => ({
        label: style.name,
        value: style.id,
      }))
    },

    isNewArtist() {
      if (!this.music.artist) return false
      return this.music.artist === -1 ? true : false
    },
  },

  methods: {
    toggleTag(tagId) {
      if (this.music.tags.includes(tagId)) {
        this.music.tags = this.music.tags.filter(id => id != tagId)
      } else {
        this.music.tags.push(tagId)
      }
    },

    toggleInstrument(instrumentId) {
      if (this.music.instruments.includes(instrumentId)) {
        this.music.instruments = this.music.instruments.filter(id => id != instrumentId)
      } else {
        this.music.instruments.push(instrumentId)
      }
    },

    addtag() {
      if (!this.newtag) return

      this.$emit(
        "newtag",
        this.newtagcolor ? { name: this.newtag, color: this.newtagcolor } : { name: this.newtag }
      )

      this.newtag = ""
      this.newtagcolor = ""
    },
  },

  watch: {
    artist() {
      if (this.artist) {
        this.music.artist_name = this.artist.label
        this.music.artist = this.artist.value ? this.artist.value : -1

        if (!this.music.language && this.artist.value > -1) {
          this.music.language = this.getArtist(this.artist.value).defaultLanguage
        }
      } else {
        this.music.artist_name = ""
        this.music.artist = null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tag {
  margin-right: 10px;
  cursor: pointer;
  font-size: 0.7rem;

  text-decoration: none;
  font-weight: 500;

  &_active {
    text-decoration: underline;
    font-weight: 700;
    transform: scale(1.1);
    border: solid 1px #c5c5c5;
  }
}

.newtag {
  &-input,
  &-color {
    border: none;
    padding: 5px;
    background: none;
    font-size: 0.8rem;
  }

  &-color {
    width: 80px;
  }

  &-container {
    margin-top: 15px;
  }
}

.instrument {
  margin-right: 10px;
  font-size: 0.8rem;
  cursor: pointer;

  &_active {
    color: green;
    font-weight: 600;
  }
}
</style>
