import nedb from './datastore'
import { Notification } from 'element-ui'

const getDetailData = (year, month, day) => {
  return new Promise((resolve, reject) => {
    nedb
      .findOne({ year: year, month: month, day: day })
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
  const { detail, year, month, day } = data

  return new Promise((resolve, reject) => {
    nedb.update({ year: year, month: month, day: day }, { $set: { detail } }, {}, function (
      err,
      numAffected
    ) {
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
    })
  })
}

const getTotalByMonth = (year, month) => {
  // todo
}

const API = {
  getDetailData,
  setDetailData,
  getTotalByMonth
}

export { getDetailData, setDetailData, getTotalByMonth }

export default API
