import moment from 'moment'
import 'moment/locale/zh-cn'

export const formatPriceData = (originalData, unit) => {
  let formatedData = originalData.filter((v,i) => {
    if (i === 0) {
      return true
    }
    return moment(v[0]).format(unit)!==moment(originalData[i-1][0]).format(unit)
  }).map(value => ({
    time: moment(value[0]).format(unit),
    price: value[1]
  }))
  return formatedData
}