/**
 * @Description 生成随机id
 * @Author QINGYU FAN
 * @Version
 * @date 2021/2/20 5:53 下午
 */
export const generatorId = (): string => {
  let quotient = new Date().getTime() - new Date('2020-01-01').getTime()
  quotient += Math.ceil(Math.random() * 1000) // 防止重複
  const chars = '0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz'
  const charArr = chars.split('')
  const radix = chars.length
  const res = []
  do {
    const mod = quotient % radix
    quotient = (quotient - mod) / radix
    res.push(charArr[mod])
  } while (quotient)
  return res.join('')
}

/**
 * @Description 生成随机UUID
 * @Author QINGYU FAN
 * @Version
 * @date 2021/2/20 5:53 下午
 */
export const generatorUUID = (length = 10): string => {
  const s: string[] = []
  const hexDigits = '0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz'
  for (let i = 0; i < length; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * hexDigits.length), 1)
  }
  return s.join('')
}
