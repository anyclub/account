<!-- Created by anyc on 2018-06-21. 欢迎页 -->
<template>
  <div class="wrapper" flex="cross:center main:center">
    <h2>专享--装修记账</h2>
    <router-link class="link" to="/calendar">按日历查看</router-link>
    <router-link class="link" to="/calendar">按类别查看</router-link>
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
  color: #303133;
  text-decoration: none;
}
</style>
