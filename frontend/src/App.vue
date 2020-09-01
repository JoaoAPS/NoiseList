<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --main-bg-color: whitesmoke;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--main-bg-color);
  font-family: Cambria, Georgia, Helvetica, sans-serif;
}

html {
  font-size: 16pt;
}
</style>
