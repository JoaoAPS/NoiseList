<template>
  <header class="bg-dark">
    <button v-b-modal="'new-music-modal'" class="header-item mx-2 btn btn-dark btn-sm">
      New music
    </button>
    <button v-b-toggle:filters-sidebar class="header-item mx-2 btn btn-dark btn-sm">Filters</button>

    <b-form-input
      v-model="searchText"
      :placeholder="'\uf002'"
      class="search-bar text-light bg-dark"
      @update="$emit('search', searchText)"
      style="font-family: Cambria, FontAwesome"
    ></b-form-input>
  </header>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      searchText: "",
    }
  },
}
</script>

<style scoped>
header {
  width: 100vw;
  font-size: 1rem;
  padding: 10px;

  /*background-color: #2a2a33;*/

  display: flex;
  align-items: center;
}

.header-item {
  width: 150px;
}

.header-item:hover {
  text-decoration: underline;
}

.search-bar {
  border: none;
  margin: 0 20px;
}
</style>
