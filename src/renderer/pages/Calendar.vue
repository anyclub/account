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
          <el-button class="table-item" v-for="(day,index) in week" v-if="day" :key="index" @click="getDetail(day)">
            <div class="day">{{day}}</div>
            <div v-if="getValue(costList,day)" class="list">{{getValue(costList,day)}}项</div>
            <div v-if="getValue(costList,day,'total')" class="cost">￥{{getValue(costList,day,'total')}}</div>
          </el-button>
          <span v-else class="table-item empty"></span>
        </div>
      </main>
    </div>

    <MoveDialog :title="activeDate" :visible.sync="dialogVisible" width="80%">
      <CostTable :data="dialogData" :loading="loading"></CostTable>
      <div class="footer" slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </MoveDialog>
  </div>
</template>

<script>
import API from '@/global/Api'

export default {
  name: 'calendar',
  data () {
    return {
      year: null,
      month: null,
      day: null,
      // now: new Date(),
      days: null,
      firstDay: null,
      week: ['日', '一', '二', '三', '四', '五', '六'],
      dialogVisible: false,
      loading: true,
      dialogData: [],
      costList: []
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
          week[dayIndex] = day
        }
        result[weekIndex] = week
      }
      return result
    },
    activeDate () {
      return `${this.year}年${this.month}月${this.day}日`
    },
    now () {
      return new Date(this.year, this.month - 1, 1)
    }
  },
  watch: {
    now () {
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
      const now = new Date()
      this.year = now.getFullYear()
      this.month = now.getMonth() + 1
    },
    async setCalendar () {
      const loading = this.$loading({
        lock: true,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.days = this.$getMonthDays(this.year, this.month)
      this.firstDay = this.$getMonthFirstDay(this.year, this.month - 1)
      const data = await API.getTotalByMonth(String(this.year), String(this.month))

      this.costList = data
      this.$nextTick(() => {
        loading.close()
      })
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
        total: this.$getTotal(this.dialogData),
        listLength: this.dialogData.length
      }

      let flag = await API.setDetailData(data)
      if (flag) {
        this.setCalendar()
        this.dialogVisible = false
        loading.close()
      }
    },
    getValue (list, value, valueKey = 'listLength', key = 'day', defaultValue = false) {
      for (let index = 0; index < list.length; index++) {
        const element = list[index]
        if (element[key] === value) {
          return element[valueKey]
        }
      }
      return defaultValue
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
      color: #f56c6c;
    }
    &.empty {
      padding: 14px 22px;
    }
    .list,
    .cost {
      position: absolute;
      right: 4%;
      font-size: 1.5vw;
    }
    .cost {
      bottom: 4%;
      color: #f56c6c;
    }
    .list {
      top: 5%;
      color: #303133;
    }
  }
}
</style>
