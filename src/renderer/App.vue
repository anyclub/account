<template>
  <div id="app" flex="dir:top box:first">
    <myHeader></myHeader>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  padding: 10px;
}
.el-dialog__wrapper {
  overflow: hidden;
}
</style>
