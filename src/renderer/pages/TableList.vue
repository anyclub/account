<!-- Created by anyc on 2018-07-06. 按表格查看 -->
<template>
  <div class="TableList">
    <CostTable :data.sync="tableData" :loading="loading"></CostTable>
  </div>
</template>

<script>
import API from '@/global/Api'
export default {
  name: 'TableList',
  data () {
    return {
      tableData: [],
      loading: false
    }
  },
  methods: {
    async getTableList () {
      let result = await API.getTotalByType()
      console.log(result)
    }
  },
  created () {
    this.getTableList()
    console.log('created')
  }
}
</script>

<style lang="less" scoped>
.TableList {
  padding: 0;
}
</style>
