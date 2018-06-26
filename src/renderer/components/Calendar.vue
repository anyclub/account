<!-- Created by anyc on 2018-06-21. 日历组件 -->
<template>
  <div class="calendar-wrap">
    <div class="calendar" flex="dir:top box:first cross:stretch">
      <header flex="main:justify cross:top">
        <el-button flex-box="1" class="item" icon="el-icon-d-arrow-left" plain @click="changeDate('year','sub')"></el-button>
        <el-button flex-box="1" class="item" icon="el-icon-arrow-left" plain @click="changeDate('month','sub')"></el-button>
        <el-date-picker flex-box="3" class="item" v-model="now" type="month" format="yyyy年MM月" />
        <el-button flex-box="1" class="item" icon="el-icon-arrow-right" plain @click="changeDate('month','plus')"></el-button>
        <el-button flex-box="1" class="item" icon="el-icon-d-arrow-right" plain @click="changeDate('year','plus')"></el-button>
      </header>
      <main class="main" flex="dir:top box:first">
        <div class="table-header" flex="box:mean">
          <span class="table-item" v-for="(day,index) in week" :key="index">{{day}}</span>
        </div>
        <div class="body" flex="box:mean" v-for="(week,index) in dateList" :key="index">
          <el-button class="table-item" v-for="(day,index) in week" v-if="day.num" :key="index" @click="getDetail(day.num)">
            <div class="day">{{day.num}}</div>
            <div class="cost">￥{{day.cost}}</div>
          </el-button>
          <span v-else class="table-item empty"></span>
        </div>
      </main>
    </div>
    <el-dialog center class="dialog" :title="activeDate" :visible.sync="dialogVisible" width="90%" fullscreen>
      <el-table fit show-summary :summary-method="getSummaries" v-loading="loading" width="100%" :data="dialogData">
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
      <div class="footer" slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import API from '@/global/Api'
import { selectOptions } from '@/global/selectOptions'

export default {
  name: 'calendar',
  data () {
    return {
      year: null,
      month: null,
      day: null,
      now: new Date(),
      days: null,
      firstDay: null,
      week: ['日', '一', '二', '三', '四', '五', '六'],
      dialogVisible: false,
      loading: true,
      dialogData: [],
      selectOptions
    }
  },
  computed: {
    dateList () {
      const length = Math.ceil((this.firstDay + this.days) / 7)
      let result = []
      for (let weekIndex = 0; weekIndex < length; weekIndex++) {
        let week = []
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
          let day = 7 * weekIndex + dayIndex - this.firstDay + 1
          if (day < 1) {
            day = ''
          } else if (day > this.days) {
            day = ''
          } else if (day > 0 && day < 10) {
            day = '0' + day
          } else {
            day += ''
          }
          week[dayIndex] = { num: day, cost: '13' }
        }
        result[weekIndex] = week
      }
      return result
    },
    activeDate () {
      return `${this.year}年${this.month}月${this.day}日`
    }
  },
  watch: {
    year () {
      this.setCalendar()
    },
    month () {
      this.setCalendar()
    }
  },
  methods: {
    async getDetail (day) {
      this.loading = true
      this.day = day
      this.dialogVisible = true

      let result = await API.getDetailData(String(this.year), String(this.month), day)
      this.dialogData = result
      this.loading = false
    },
    changeDate (type, method) {
      if (method === 'plus') {
        this[type] = this[type] + 1
      } else {
        this[type] = this[type] - 1
      }
    },
    initDate () {
      this.now = new Date()
      this.year = this.now.getFullYear()
      this.month = this.now.getMonth() + 1
    },
    setCalendar () {
      this.now = new Date(this.year, this.month - 1, 1)
      this.days = this.$getMonthDays(this.year, this.month)
      this.firstDay = this.$getMonthFirstDay(this.year, this.month - 1)
    },
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
    },
    async save () {
      const loading = this.$loading({
        lock: true,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const data = {
        detail: this.dialogData,
        year: String(this.year),
        month: String(this.month),
        day: String(this.day),
        total: () => {
          let result = 0
          this.dialogData.forEach(item => {
            result += Number(item.cost)
          })
          return result
        }
      }
      let flag = await API.setDetailData(data)
      if (flag) {
        this.dialogVisible = false
        loading.close()
      }
    }
  },
  created () {
    this.initDate()
  }
}
</script>

<style lang="less" scoped>
.calendar-wrap {
  width: 100%;
  height: 100%;
}
.calendar {
  width: 100%;
  height: 100%;
  padding: 10px;
  .item {
    margin: 0 1vw;
  }
  .main {
    margin-top: 10px;
    width: 100%;
  }
  .table-header {
    .table-item {
      text-align: center;
    }
  }
  .body {
    margin: 1.5vh 0;
    text-align: center;
  }
  .table-item {
    position: relative;
    margin: 0 1%;
    font-size: 5vw;
    text-align: left;
    &:first-child,
    &:last-child {
      color: #c00;
    }
    &.empty {
      padding: 14px 22px;
    }
    .cost {
      position: absolute;
      right: 4%;
      bottom: 4%;
      font-size: 1.5vw;
      color: #c00;
    }
  }
}
.dialog {
  /deep/ .el-dialog__header {
    background: #409eff;
    .el-dialog__title,
    .el-dialog__close {
      color: #fff;
    }
  }
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
