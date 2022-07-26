/**
 * 格式化时间
 * 调用formatDate(strDate, 'yyyy-MM-dd HH:mm:ss');
 * @param value（中国标准时间、时间戳等）
 * @param format（返回格式）
 */
export const formatDate = (value: any, format?: any) => {
  if (!format) format = 'yyyy-MM-dd'
  if (!value) {
    return ''
  }
  switch (typeof value) {
    case 'string':
      value = new Date(value.replace(/-/, '/'))
      break
    case 'number':
      value = new Date(value)
      break
  }
  if (value instanceof Date) {
    const dict: any = {
      yyyy: value.getFullYear(),
      M: value.getMonth() + 1,
      d: value.getDate(),
      H: value.getHours(),
      m: value.getMinutes(),
      s: value.getSeconds(),
      MM: ('' + (value.getMonth() + 101)).substr(1),
      dd: ('' + (value.getDate() + 100)).substr(1),
      HH: ('' + (value.getHours() + 100)).substr(1),
      mm: ('' + (value.getMinutes() + 100)).substr(1),
      ss: ('' + (value.getSeconds() + 100)).substr(1)
    }
    return format.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function () {
      return dict[arguments[0]]
    })
  }
}

/**
 * 处理时间戳
 * @param value 时间戳
 * @param split 分割符
 * @param hasTime 是否要时间
 */
export const dateFilter = (
  value: string | number,
  split = '-',
  hasTime = false
): string => {
  if (value) {
    if (typeof value === 'string') {
      value = parseInt(value)
    }
    const d = new Date(value)
    const date = {
      Y: d.getFullYear(),
      M: d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1),
      D: d.getDate() > 9 ? d.getDate() : '0' + d.getDate(),
      h: d.getHours() > 9 ? d.getHours() : '0' + d.getHours(),
      m: d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes(),
      s: d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds()
    }
    const day = `${date.Y}${split}${date.M}${split}${date.D}`
    if (hasTime) {
      return `${day} ${date.h}:${date.m}:${date.s}`
    } else {
      return day
    }
  }
  return ''
}

// 返回中文日期描述
export const returnDiyDate = (date: number): string => {
  const tTime = new Date().setHours(0, 0, 0, 0) // 当前凌晨时间(long)
  const eTime = 24 * 60 * 60 * 1000 // 一天时间(long)
  const yTime = tTime - eTime // 昨天凌晨时间(long)
  const byTime = tTime - 2 * eTime // 前天凌晨时间(long)
  let result
  if (date >= tTime) {
    // 今天
    // eslint-disable-next-line no-var
    result = '今天'
  } else if (date < tTime && date >= yTime) {
    // 昨天
    result = '昨天'
  } else if (date < yTime && date >= byTime) {
    // 前天
    result = '前天'
  } else {
    // 前天之前
    result = dateFilter(date, '.', false)
  }
  return result
}

// 小数转百分比
export const formatNumber = (str: string | number): string => {
  return (Number(str) * 100).toFixed(2)
}

/**
 * 一维转二维数组
 * @param array 一维数组
 * @param key 需要根据转的key
 */
export function translateArray<T extends { [key: string]: any }>(
  array: T[],
  key: string
): T[][] {
  const mapData: {
    [key: string]: T[]
  } = {}
  if (array && array.length) {
    array.forEach((item) => {
      mapData[item[key]] = mapData[item[key]] || []
      mapData[item[key]].push(item)
    })
    return Object.keys(mapData).map((k) => mapData[k])
  }
  return []
}
