import moment from 'moment'
import 'moment/locale/zh-cn'

export const formatPriceData = (originalData, unit) => {
  let formatedData = originalData.filter((v,i) => {
    if (i === 0) {
      return true
    }
    return moment.unix(v.time).format(unit)!==moment.unix(originalData[i-1].time).format(unit)
  }).map(value => ({
    time: moment.unix(value.time).format(unit),
    '价格': value.close,
  }))
  return formatedData
}

export const isSymbol = (symbol, crypto) => crypto.symbol === symbol || crypto.Symbol === symbol

export const store = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => JSON.parse(localStorage.getItem(key)),
}