<!-- Created by anyc on 2018-06-25. 详情弹出框 -->
<template>
  <el-dialog class="dialog" :title="activeDate" :visible.sync="dialogVisible" width="80%">
    <el-table fit v-loading="loading">
      <el-table-column prop="date" label="日期" min-width="180" />
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'dialog',
  data () {
    return {
      test: ''
    }
  }
}
</script>

<style lang="less" scoped>
.dialog {
  /deep/ .el-dialog__header {
    background: #409eff;
    .el-dialog__title,
    .el-dialog__close {
      color: #fff;
    }
  }
}
</style>
