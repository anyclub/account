<!-- Created by anyc on 2018-06-21. 日历组件 -->
<template>
  <div class="calendar" flex="dir:top box:first cross:stretch">
    <div class="header" flex="main:justify cross:top">
      <el-button flex-box="1" class="item" icon="el-icon-d-arrow-left" plain size="small"></el-button>
      <el-button flex-box="1" class="item" icon="el-icon-arrow-left" plain size="small"></el-button>
      <el-date-picker flex-box="3" class="item" v-model="month" type="month" size="small" />
      <el-button flex-box="1" class="item" icon="el-icon-arrow-right" plain size="small"></el-button>
      <el-button flex-box="1" class="item" icon="el-icon-d-arrow-right" plain size="small"></el-button>
    </div>
    <main class="main" flex="dir:top box:first">
      <div class="header" flex="box:mean">
        <span class="table-item" v-for="(day,index) in week" :key="index">{{day}}</span>
      </div>
      <div class="body" flex="box:mean" v-for="(week,index) in dateList" :key="index">
        <el-button v-if="day" class="table-item" v-for="(day,index) in week" @click="getDetail(day)">
          <div class="day">{{day}}</div>
          <div class="cast">￥123</div>
        </el-button>
        <span v-else class="table-item empty"></span>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  data () {
    return {
      year: null,
      month: null,
      now: new Date(),
      days: null,
      firstDay: null,
      week: ['日', '一', '二', '三', '四', '五', '六']
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
    }
  },
  created () {
    this.year = this.now.getFullYear()
    this.month = this.now.getMonth() + 1
    this.days = this.$getMonthDays(this.year, this.month)
    this.firstDay = this.$getMonthFirstDay(this.year, this.month - 1)

    // console.log(this.dateList)
  },
  methods: {
    getDetail (day) {
      console.log(day)
    }
  }
}
</script>

<style lang="less" scoped>
.calendar,
.wrapBody {
  width: 100%;
  padding: 10px;
  .item {
    margin: 0 10px;
  }
  .main {
    margin-top: 10px;
    width: 100%;
  }
  .header {
    height: 50px;
    .table-item {
      text-align: center;
    }
  }
  .body {
    margin: 30px 0;
  }
  .table-item {
    position: relative;
    margin: 0 1%;
    font-size: 5vh;
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
      font-size: 1.6vh;
      color: #c00;
    }
  }
}
</style>
