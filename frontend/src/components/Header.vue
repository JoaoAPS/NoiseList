<template>
  <header class="bg-dark">
    <button v-b-modal="'new-music-modal'" class="btn btn-dark btn-sm">New music</button>
    <button v-b-toggle:filters-sidebar class="btn btn-dark btn-sm">Filters</button>
  </header>
</template>

<script>
export default {
  name: "Header",
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

header p {
  display: inline-block;
  margin: 0 15px;
}

.header-item {
  font-size: 0.8rem;
  color: white;
  border: none;
  cursor: pointer;
}

.header-item:hover {
  text-decoration: underline;
}
</style>
