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
    ...mapGetters(["allLanguages", "allTags", "allInstruments", "allArtists", "getArtist"]),

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

/*
/deep/ .modal {
  position: fixed;
  top: 5vh;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 100;

  height: 85vh;
  width: 1000px;
  padding: 15px 120px;

  background-color: var(--main-bg-color);
  border: solid 1px gray;
  border-radius: 15px 15px;

  display: grid;
  grid-template-rows: auto 1fr auto;
}

.info {
  font-style: italic;
  font-size: 0.7rem;
  color: green;
  margin-top: 5px;
}

h3 {
  grid-row: 1/2;
}

#edit-form {
  grid-row: 2/3;
  padding-right: 15px;

  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
}

#edit-form::-webkit-scrollbar {
  display: none;
}

.title-label {
  margin: 30px 0px 5px 10px;
  font-size: 0.9rem;
}

.input-field {
  padding: 5px 5px;
  font-size: 0.8rem;

  background: white;
  color: black;

  border: 1px solid gray;
  border-radius: 4px 4px;

  transition: all 0.2s;
}

.input-field:focus {
  outline: none;
  border: solid 1px black;
  box-shadow: 1px 1px gray;
}

/deep/ .v-select {
  & .vs__dropdown-toggle {
    padding: 0;
    background: white;

    border: 1px solid gray;
    border-radius: 4px 4px;

    font-size: 0.8rem;
  }

  & .vs__selected-options {
    padding: 5px;
    border: none;
  }

  & .vs__selected,
  & .vs__search {
    padding: 0px;
    margin: 0px;
    line-height: 1;
    color: black;
  }

  & .vs__clear {
    display: none;
  }

  & .vs__open-indicator {
    fill: black;
  }
}

option {
  text-transform: capitalize;
}

#defLangCheckbox {
  margin-right: 5px;
  margin-left: 5px;
}

.blank-option {
  color: gray;
  text-emphasis: italic;
}

.tag {
  margin-right: 10px;
  cursor: pointer;
}

.newtag {
  &-input,
  &-color {
    border: none;
    padding: 5px;
    background: none;
  }

  &-color {
    width: 80px;
  }

  &-btn {
    width: 3rem;
    padding: 3px;
    margin: 10px;
    background: none;
    border-radius: 5px;

    cursor: pointer;
    text-transform: capitalize;

    &:hover {
      color: green;
    }
  }
}

.tag_active {
  border: solid 2px green;
  box-shadow: 0 0 5px green;
}

.instrument {
  margin-right: 10px;
  font-size: 0.8rem;
  cursor: pointer;
}

.instrument_active {
  color: green;
  font-weight: 600;
}

.delete-icon {
  margin: auto 0 0 auto;
  cursor: pointer;
}

.delete-icon:hover {
  color: red;
}

.btn-container {
  grid-row: 3/4;
  margin: 10px 0 10px 0;
  text-align: center;
}

button {
  width: 150px;
  margin: 0 15px;
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
*/
</style>
