import { Notification } from 'element-ui'

const getMonthDays = (year, month) => {
  const bigMonth = [1, 3, 5, 7, 8, 10, 12]
  const smallMonth = [4, 6, 9, 11]
  month = Number(month)
  if (bigMonth.includes(month)) {
    return 31
  } else if (smallMonth.includes(month)) {
    return 30
  } else {
    if ((year % 100 === 0 && year % 400 === 0) || year % 4 === 0) {
      return 29
    } else {
      return 28
    }
  }
}

const getMonthFirstDay = (year, month) => {
  return new Date(year, month, 1).getDay()
}

const copyObject = obj => {
  return JSON.parse(JSON.stringify(obj))
}

const getTotal = (arr, key = 'cost') => {
  let result = 0
  arr.forEach(item => {
    result += Number(item[key])
  })
  return result
}

const codingMsg = () => {
  Notification({
    message: '此功能开发中......',
    type: 'error',
    duration: '1000'
  })
}

const deleteArrByIndex = (indexArr, arr) => {
  for (let index = arr.length - 1; index >= 0; index--) {
    if (indexArr.includes(index)) {
      arr.splice(index, 1)
    }
  }
  return arr
}

export default {
  install (Vue) {
    Vue.prototype.$getMonthDays = getMonthDays
    Vue.prototype.$getMonthFirstDay = getMonthFirstDay
    Vue.prototype.$copyObject = copyObject
    Vue.prototype.$getTotal = getTotal
    Vue.prototype.$codingMsg = codingMsg
    Vue.prototype.$deleteArrByIndex = deleteArrByIndex
  }
}

export {
  getMonthDays,
  getMonthFirstDay,
  copyObject,
  getTotal,
  codingMsg,
  deleteArrByIndex
}
