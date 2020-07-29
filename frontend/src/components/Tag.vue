<template>
  <div class="tag" :style="'background-color: ' + tag.color">
    {{ tag.name }}
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: ["tag"],
}
</script>

<style scoped lang="scss">
.tag {
  display: inline-block;
  padding: 4px 6px;
  border-radius: 10px 10px;

  color: black;
  font-size: 0.5rem;
  font-weight: 600;
}
</style>
