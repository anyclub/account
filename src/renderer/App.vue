<template>
  <div id="app" flex>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
</style>
