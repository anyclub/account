<!-- Created by anyc on 2018-06-27. 花费的表格 -->
<template>
  <div class="CostTable" flex="dir:top box:first">
    <el-table fit show-summary :summary-method="getSummaries" v-loading="loading" width="100%" :data="data">
      <el-table-column type="selection" width="80" fixed="left" />
      <el-table-column type="index" :index="1" width="40" />
      <el-table-column prop="category" label="类别" min-width="120" align="center">
        <template slot-scope="scope">
          <el-select size="mini" v-model="scope.row.category">
            <el-option v-for="item in selectOptions.category" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" min-width="200">
        <template slot-scope="scope">
          <el-input size="small" placeholder="费用" v-model="scope.row.name">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="pay" label="已支付" min-width="120" align="center">
        <template slot-scope="scope">
          ￥:
          <el-input size="small" class="input-cost" type="number" placeholder="费用" v-model="scope.row.pay">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="cost" label="总费用" min-width="120" align="center">
        <template slot-scope="scope">
          ￥:
          <el-input size="small" class="input-cost" type="number" placeholder="费用" v-model="scope.row.cost">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="180">
        <template slot-scope="scope">
          <el-input type="textarea" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { selectOptions } from '@/global/selectOptions'

export default {
  name: 'CostTable',
  props: {
    data: Array,
    loading: Boolean
  },
  data () {
    return {
      selectOptions
    }
  },
  methods: {
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
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
  }
}
</script>

<style lang="less" scoped>
.CostTable {
  height: 100%;
  .input-cost {
    // display: inline-block;
    display: inline;
    /deep/ input {
      border: 0;
      border-bottom: 1px solid #ccc;
      border-radius: 0;
      width: 60px;
      height: 20px;
      padding: 0;
      background: transparent;
      color: #c00;
      text-align: center;
    }
  }
}
</style>
