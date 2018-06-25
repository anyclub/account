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

export { getDetailData }
