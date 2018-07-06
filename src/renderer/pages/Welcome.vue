<!-- Created by anyc on 2018-06-21. 欢迎页 -->
<template>
  <div class="wrapper" flex="cross:center main:center dir:top">
    <h2>装修记账--专享版</h2>
    <div class="wrap-link">
      <router-link class="link" to="/calendar">按日历查看</router-link>
      <router-link class="link" to="/tableList">按类别查看</router-link>
    </div>
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
}
h2 {
  font-size: 30px;
}
.wrap-link {
  margin-top: 30px;
  .link {
    margin: 0 20px;
    font-size: 16px;
    text-align: center;
    color: #303133;
    text-decoration: none;
  }
}
</style>
