import nedb from './datastore'
import { Notification } from 'element-ui'

const getDetailData = (year, month, day) => {
  return new Promise((resolve, reject) => {
    nedb
      .findOne({ year, month, day })
      .projection({ detail: 1 })
      .exec(function (err, doc) {
        if (err) {
          Notification.error({
            title: '错误',
            message: '数据读取有误!'
          })
          reject(new Error(err))
        } else if (doc && doc.detail) {
          resolve(doc.detail)
        } else if (!doc) {
          resolve([])
        }
      })
  })
}

const setDetailData = data => {
  const { detail, year, month, day, total, listLength } = data

  return new Promise((resolve, reject) => {
    nedb.update(
      { year: year, month: month, day: day },
      { $set: { detail, total, listLength } },
      {},
      function (err, numAffected) {
        if (err) {
          reject(new Error(err))
        } else if (!numAffected) {
          nedb.insert(data, function (err, newDoc) {
            if (err) {
              reject(new Error(err))
            } else {
              resolve(true)
            }
          })
        } else {
          resolve(true)
        }
      }
    )
  })
}

const getTotalByMonth = (year, month) => {
  return new Promise((resolve, reject) => {
    nedb
      .find({ year, month, listLength: { $exists: true } })
      .projection({ day: 1, listLength: 1, total: 1 })
      .exec(function (err, doc) {
        if (err) {
          Notification.error({
            title: '错误',
            message: '数据读取有误!'
          })
          reject(new Error(err))
        } else if (doc) {
          resolve(doc)
        } else if (!doc) {
          resolve([])
        }
      })
  })
}

const getTotalByType = type => {
  return new Promise((resolve, reject) => {
    nedb.find({ listLength: { $exists: true } }).exec(function (err, doc) {
      if (err) {
        Notification.error({
          title: '错误',
          message: '数据读取有误!'
        })
        reject(new Error(err))
      } else if (doc) {
        resolve(doc)
      } else if (!doc) {
        resolve([])
      }
    })
  })
}

const API = {
  getDetailData,
  setDetailData,
  getTotalByMonth,
  getTotalByType
}

export { getDetailData, setDetailData, getTotalByMonth, getTotalByType }

export default API
