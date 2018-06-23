<!-- Created by anyc on 2018-06-21. 日历组件 -->
<template>
  <div class="calendar" flex="dir:top box:justify cross:center">
    <router-link to="/">back</router-link>
    <div class="header">
      <el-button class="item" icon="el-icon-d-arrow-left" plain size="mini"></el-button>
      <el-button class="item" icon="el-icon-arrow-left" plain size="mini"></el-button>
      <el-date-picker class="item" v-model="month" type="month" size="mini" />
      <el-button class="item" icon="el-icon-arrow-right" plain size="mini"></el-button>
      <el-button class="item" icon="el-icon-d-arrow-right" plain size="mini"></el-button>
    </div>
    <main>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia magni dolore quisquam voluptatibus cum odio eum dolor praesentium nemo ex omnis, eos, atque rerum laborum ea aliquid ducimus quam eveniet.
    </main>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  data () {
    return {
      year: '',
      month: ''
    }
  },
  created () {
    const now = new Date()
    this.year = now.getFullYear()
    this.month = now.getMonth()
  }
}
</script>

<style lang="less" scoped>
.calendar {
  padding: 10px;
}
</style>
