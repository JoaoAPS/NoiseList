<template>
  <div class="modal-container">
    <div class="modal-background" @click="$emit('background-click')"></div>
    <div class="modal" v-bind:class="externalModalClass">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["modalClass"],

  computed: {
    externalModalClass() {
      if (this.modalClass) {
        return { [this.modalClass]: true }
      }
      return {}
    },
  },
}
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 90;

  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  position: fixed;
  top: 10vh;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 100;

  height: 500px;
  width: 800px;

  background-color: var(--main-bg-color);
  border: solid 1px gray;
  border-radius: 15px 15px;
}
</style>
