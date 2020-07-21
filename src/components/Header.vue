<template>
  <header>
    <p class="btn new-music" v-on:click="$emit('new-music')">New music</p>
  </header>
</template>

<script>
export default {
  name: "Header",
}
</script>

<style scoped>
header {
  width: 100%;
  height: 1.5rem;
  font-size: 1rem;

  background-color: #2a2a33;

  display: flex;
  align-items: center;
}

header p {
  display: inline-block;
  margin: 0 15px;
}

.new-music {
  font-size: 0.8rem;
  color: white;
  background-color: #2a2a33;
  border: none;
}

.new-music:hover {
  color: #45ba27;
  font-weight: bold;
}
</style>
