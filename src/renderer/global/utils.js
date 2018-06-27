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

export default {
  install (Vue) {
    Vue.prototype.$getMonthDays = getMonthDays
    Vue.prototype.$getMonthFirstDay = getMonthFirstDay
    Vue.prototype.$copyObject = copyObject
    Vue.prototype.$getTotal = getTotal
  }
}

export { getMonthDays, getMonthFirstDay, copyObject, getTotal }
