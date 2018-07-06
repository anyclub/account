<!-- Created by anyc on 2018-07-06. 头部 -->
<template>
  <div class="myHeader">
    <el-button size="mini" @click="$codingMsg">导出数据</el-button>
    <el-button size="mini" @click="$codingMsg">导入数据</el-button>
    <el-button size="mini" @click="$codingMsg">查看报表</el-button>
    <el-button size="mini" @click="$codingMsg">查看花费</el-button>
  </div>
</template>

<script>
export default {
  name: 'myHeader',
  data () {
    return {
      // data
    }
  }
}
</script>

<style lang="less" scoped>
.myHeader {
  padding: 10px;
}
</style>
