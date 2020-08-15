<template>
  <div>
    <Modal v-show="!askingDelete" v-on:background-click="$emit('cancel')" class="music-editor">
      <h3>{{ headerText }}</h3>

      <form id="edit-form" @submit.prevent="$emit(music ? 'edit' : 'new', tmpMusic, newArtist)">
        <label class="title-label" for="title">Song title</label>
        <input type="text" class="input-field" required id="title" v-model="tmpMusic.title" />

        <label class="title-label" for="artist">Artist</label>
        <v-select :options="allArtistsNames" id="artist" v-model="tmpMusic.artist_name" taggable>
          <template #search="{attributes, events}">
            <input
              class="vs__search"
              :required="!tmpMusic.artist_name"
              v-bind="attributes"
              v-on="events"
            />
          </template>
        </v-select>
        <p v-if="isNewArtist" class="info">New artist will be added</p>

        <label class="title-label" for="language">Language</label>
        <select id="language" class="input-field" v-model="tmpMusic.language">
          <option value="null">-----</option>
          <option v-for="language in allLanguages" :key="language.id" :value="language.id">
            {{ language.name }}
          </option>
        </select>
        <div>
          <input type="checkbox" v-if="isNewArtist" id="defLangCheckbox" value="setDeafultLang" />
          <label v-if="isNewArtist" for="defLangCheckbox" class="info"
            >Use language as the default for new artist</label
          >
        </div>

        <label class="title-label">Tags</label>
        <div class="tag-container">
          <Tag
            v-for="tag in allTags"
            :key="tag.id"
            :tag="tag"
            class="tag"
            :class="{ tag_active: tmpMusic.tags.includes(tag.id) }"
            @click.native="toggleTag(tag.id)"
          />
        </div>
        <div class="newtag-container">
          <input type="text" placeholder="New tag" class="newtag-input" v-model="newtag" />
          <input type="text" placeholder="Color" class="newtag-color" v-model="newtagcolor" />
          <button type="button" class="newtag-btn" @click="addtag">Add tag</button>
        </div>

        <label class="title-label">Instruments</label>
        <div class="instrument-container">
          <span
            v-for="instrument in allInstruments"
            :key="instrument.key"
            class="instrument"
            :class="{ instrument_active: tmpMusic.instruments.includes(instrument.id) }"
            @click="toggleInstrument(instrument.id)"
          >
            {{ instrument.name }}
          </span>
        </div>

        <i v-if="this.music" class="fas fa-trash delete-icon" @click="askingDelete = true"></i>
      </form>

      <div class="btn-container">
        <button type="button" class="btn cancel" @click="$emit('cancel')">Cancel</button>
        <button type="submit" class="btn confirm" form="edit-form">
          {{ confirmBtnText }}
        </button>
      </div>
    </Modal>

    <ConfirmDelete
      v-if="askingDelete"
      v-bind:music="music"
      v-on:cancel="askingDelete = false"
      v-on:confirm="$emit('delete', music)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Modal from "./generic/Modal"
import Tag from "./Tag"
import ConfirmDelete from "./ConfirmDelete"

export default {
  name: "MusicEditor",
  components: { Modal, Tag, ConfirmDelete },
  props: ["music"],

  data() {
    return {
      tmpMusic: this.music
        ? { ...this.music }
        : { title: "", artist: null, artist_name: "", language: null, tags: [], instruments: [] },
      languageId: this.music ? this.music.language : -1,
      askingDelete: false,
      newtag: "",
      newtagcolor: "",
    }
  },

  computed: {
    ...mapGetters(["allLanguages", "allTags", "allInstruments", "allArtistsNames"]),

    headerText() {
      return this.music ? "Edit Music" : "Add a new music"
    },

    confirmBtnText() {
      return this.music ? "Confirm edit" : "Add Music"
    },

    isNewArtist() {
      if (this.tmpMusic.artist_name == "") return false
      if (this.allArtistsNames.includes(this.tmpMusic.artist_name)) return false
      return true
    },

    newArtist() {
      if (!this.isNewArtist) return null

      if (document.getElementById("defLangCheckbox").checked && this.tmpMusic.language) {
        return {
          name: this.tmpMusic.artist_name,
          defaultLanguage: this.tmpMusic.language,
        }
      } else {
        return { name: this.tmpMusic.artist_name }
      }
    },
  },

  methods: {
    toggleTag(tagId) {
      if (this.tmpMusic.tags.includes(tagId)) {
        this.tmpMusic.tags = this.tmpMusic.tags.filter(id => id != tagId)
      } else {
        this.tmpMusic.tags.push(tagId)
      }
    },

    toggleInstrument(instrumentId) {
      if (this.tmpMusic.instruments.includes(instrumentId)) {
        this.tmpMusic.instruments = this.tmpMusic.instruments.filter(id => id != instrumentId)
      } else {
        this.tmpMusic.instruments.push(instrumentId)
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
}
</script>

<style lang="scss" scoped>
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
</style>
