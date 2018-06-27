<!-- Created by anyc on 2018-06-21. 欢迎页 -->
<template>
  <div class="wrapper" flex="cross:center main:center">
    <router-link class="link" to="/calendar">专享--装修记账</router-link>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  created () {
    this.$store.commit('getDate')
  }
}
</script>


<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
.link {
  font-size: 24px;
  text-align: center;
  color: #333;
  text-decoration: none;
}
</style>
