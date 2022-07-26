/**
 * @Author QINGYU FAN
 * @Version
 * @Description 判断运行环境
 * @date 2020/7/8 10:03
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

export function isWeixin() {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}

export function isDingtalk() {
  return navigator.userAgent.toLowerCase().indexOf('dingtalk') !== -1
}

/**
 * 检测浏览器类型
 */
export const isBrowser = () => {
  // 取得浏览器的userAgent字符串
  const userAgent = navigator.userAgent
  // 判断是否Opera浏览器
  const isOpera = userAgent.indexOf('Opera') > -1
  if (isOpera) {
    return 'Opera'
  }
  // 判断是否Firefox浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  }
  // 判断是否Chrome浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  // 判断是否Safari浏览器
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  }
  // 判断是否IE浏览器
  if (
      (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) ||
      userAgent.indexOf('rv:11.0) like Gecko') > -1
  ) {
    return 'IE'
  }
}

