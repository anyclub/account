<!-- Created by anyc on 2018-06-21. 日历组件 -->
<template>
  <div class="calendar-wrap">
    <div class="calendar" flex="dir:top box:first cross:stretch">
      <header flex="main:justify cross:top">
        <el-button flex-box="1" class="item" icon="el-icon-d-arrow-left" plain size="small"></el-button>
        <el-button flex-box="1" class="item" icon="el-icon-arrow-left" plain size="small"></el-button>
        <el-date-picker flex-box="3" class="item" v-model="month" type="month" size="small" />
        <el-button flex-box="1" class="item" icon="el-icon-arrow-right" plain size="small"></el-button>
        <el-button flex-box="1" class="item" icon="el-icon-d-arrow-right" plain size="small"></el-button>
      </header>
      <main class="main" flex="dir:top box:first">
        <div class="table-header" flex="box:mean">
          <span class="table-item" v-for="(day,index) in week" :key="index">{{day}}</span>
        </div>
        <div class="body" flex="box:mean" v-for="(week,index) in dateList" :key="index">
          <el-button v-if="day" class="table-item" v-for="(day,index) in week" :key="index" @click="getDetail(day)">
            <div class="day">{{day}}</div>
            <div class="cast">￥123</div>
          </el-button>
          <span v-else class="table-item empty"></span>
        </div>
      </main>
    </div>
    <el-dialog class="dialog" :title="activeDate" :visible.sync="dialogVisible" width="80%">
      <el-table fit v-loading="loading">
        <el-table-column prop="date" label="日期" min-width="180" />
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import { getDetailData } from '@/global/Api'

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
      dialogData: []
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
    }
  },
  created () {
    this.year = this.now.getFullYear()
    this.month = this.now.getMonth() + 1
    this.days = this.$getMonthDays(this.year, this.month)
    this.firstDay = this.$getMonthFirstDay(this.year, this.month - 1)
  },
  methods: {
    async getDetail (day) {
      this.loading = true
      this.day = day
      this.dialogVisible = true

      let result = await getDetailData(String(this.year), String(this.month), day)

      this.dialogData = result
      this.loading = false
    }
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
    margin: 0 10px;
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
    .cast {
      position: absolute;
      right: 4%;
      bottom: 4%;
      font-size: 1.5vw;
      color: #c00;
    }
  }
}
</style>
