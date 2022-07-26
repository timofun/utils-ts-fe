/**
 * @Author QINGYU FAN
 * @Version
 * @Description 文件及JSON下载处理
 * @date 2022/7/1 15:24
 */

export const fileDownLoad = (data: any, isLink: boolean, {type, fileName}: {type: string, fileName: string}) => {
  if (isLink) {
    window.open(data, '_self')
  } else {
    // 创建一个类文件对象：Blob对象表示一个不可变的、原始数据的类文件对象
    const blob = new Blob([data], { type: type || 'application/octet-stream;charset=utf-8' })
    // 设置文件名称,decodeURI：可以对后端使用encodeURI() 函数编码过的 URI 进行解码。encodeURI() 是后端为了解决中文乱码问题
    const eLink = document.createElement('a') // 创建一个a标签
    eLink.download = fileName // 设置a标签的下载属性
    eLink.style.display = 'none' // 将a标签设置为隐藏
    eLink.href = URL.createObjectURL(blob) // 把之前处理好的地址赋给a标签的href
    document.body.appendChild(eLink) // 将a标签添加到body中
    eLink.click() // 执行a标签的点击方法
    URL.revokeObjectURL(eLink.href) // 下载完成释放URL 对象
    document.body.removeChild(eLink) // 移除a标签
  }
}

/*
* 将已转为blob类型的数据转回Json对象
* */
export const blobToJson = (data: any) => {
  return new Promise((resolve) => {
    const fileReader: any = new FileReader()
    fileReader.onloadend = () => {
      try {
        resolve(JSON.parse(fileReader.result))
      } catch (err) {
        resolve(data)
      }
    }
    fileReader.readAsText(data)
  })
}
