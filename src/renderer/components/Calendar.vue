<!-- Created by anyc on 2018-06-21. 日历组件 -->
<template>
  <div class="calendar" flex="dir:top box:justify cross:center">
    <router-link to="/">back</router-link>
    <div class="header">
      <el-button icon="el-icon-d-arrow-left" plain size="mini"></el-button>
      <el-button icon="el-icon-arrow-left" plain size="mini"></el-button>
      <el-date-picker v-model="week"  type="week" format="yyyy 第 WW 周" size="mini" />
      <el-button icon="el-icon-arrow-right" plain size="mini"></el-button>
      <el-button icon="el-icon-d-arrow-right" plain size="mini"></el-button>
    </div>
    <main>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia magni dolore quisquam voluptatibus cum odio eum dolor praesentium nemo ex omnis, eos, atque rerum laborum ea aliquid ducimus quam eveniet.
    </main>
  </div>
</template>

<script>
export default {
  name: "calendar",
  data(){
    return {
      week:""
    }
  },
  created(){
    const now  = new Date()

  }
};
</script>

<style lang="less" scoped>
.calendar {
  padding: 10px;
}
</style>
