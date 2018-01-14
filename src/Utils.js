import moment from 'moment';

export const formatPriceData = (originalData) => {
  let formatedData = originalData.filter((v,i) => {
    if (i === 0) {
      return true
    }
    return moment(v[0]).format('ddd')!==moment(originalData[i-1][0]).format('ddd')
  }).map(value => ({
    time: moment(value[0]).format('ddd'),
    price: value[1]
  }))
  return formatedData
}