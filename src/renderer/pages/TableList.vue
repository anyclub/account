<!-- Created by anyc on 2018-07-06. 按表格查看 -->
<template>
  <div class="TableList"
    flex="dir:top box:first">
    <div class="table-controls">
      <el-button size="mini"
        @click="$codingMsg">添加</el-button>
      <el-button size="mini"
        @click="$codingMsg">删除</el-button>
    </div>
    <el-table fit
      show-summary
      :summary-method="getSummaries"
      v-loading="loading"
      width="100%"
      height="100%"
      :data="tableData"
      @selection-change="tableSelect">

      <el-table-column type="selection"
        width="40"
        fixed="left" />
      <el-table-column type="index"
        :index="1"
        width="40" />
      <el-table-column prop="date"
        label="日期"
        min-width="120"
        align="center"></el-table-column>
      <el-table-column prop="category"
        label="类别"
        min-width="120">
        <template slot-scope="scope">
          <el-select size="mini"
            v-model="scope.row.category">
            <el-option v-for="item in selectOptions.category"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="name"
        label="名称"
        min-width="200">
        <template slot-scope="scope">
          <el-input size="small"
            placeholder="名称"
            v-model="scope.row.name">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="pay"
        label="已支付"
        min-width="120"
        align="center">
        <template slot-scope="scope">
          ￥:
          <el-input size="small"
            class="input-cost"
            type="number"
            placeholder="费用"
            v-model="scope.row.pay">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="cost"
        label="总费用"
        min-width="120"
        align="center">
        <template slot-scope="scope">
          ￥:
          <el-input size="small"
            class="input-cost"
            type="number"
            placeholder="费用"
            v-model="scope.row.cost">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="remark"
        label="备注"
        min-width="180">
        <template slot-scope="scope">
          <el-input type="textarea" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import API from '@/global/Api'
import { selectOptions } from '@/global/selectOptions'

export default {
  name: 'TableList',
  data () {
    return {
      selectOptions,
      tableData: [],
      loading: false
    }
  },
  methods: {
    async getTableList () {
      let result = await API.getTotalByType()
      this.tableData = result
      console.log(result)
    },
    tableSelect (list) {
      let result = []
      list.forEach(element => {
        for (let index = 0; index < this.data.length; index++) {
          const item = this.data[index]
          if (item === element) {
            result.push(index)
            return
          }
        }
      })
      this.selectList = result
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 2) {
          sums[index] = '小计'
        } else if (column.property === 'cost' || column.property === 'pay') {
          const values = data.map(item => Number(item[column.property]))
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = ''
        }
      })
      return sums
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
  .input-cost {
    display: inline;
    /deep/ input {
      border: 0;
      border-bottom: 1px solid #ccc;
      border-radius: 0;
      width: 60px;
      height: 20px;
      padding: 0;
      background: transparent;
      color: #f56c6c;
      text-align: center;
    }
  }
}
</style>
