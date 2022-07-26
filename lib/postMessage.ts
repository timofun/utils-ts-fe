const IFRAME_TYPE = 'EASY_DESIGN_IFRAME'
interface PostToIframe {
  iframe: HTMLIFrameElement
  methodName: string
  data: any
  fn?: (params?: any) => void
}
interface Dispatch extends Omit<PostToIframe, 'iframe'> {
  iframe?: HTMLIFrameElement
}
interface Listen {
  methodName: string
  fn: (params?: any) => void
  iframe?: HTMLIFrameElement
}
interface IframePostMessageCK {
  listen: (options: Listen) => void
  dispatch: (options: Dispatch) => void
}
const iframePostMessage = (): IframePostMessageCK => {
  const queueMap = new Map()
  let postMessageListenerFlag = false
  if (!postMessageListenerFlag) {
    window.addEventListener('message', (event) => {
      postMessageListenerFlag = true
      // 事件过滤
      if (event.data.type !== IFRAME_TYPE) return
      // 执行集合中方法
      if (queueMap.has(event.data.method)) {
        queueMap.get(event.data.method).fn(event.data.data)
      }
    })
  }

  /**
   * 给子页面传值
   * @param options
   */
  function postToIframe (options: PostToIframe) {
    const { iframe, methodName, data, fn } = options
    // 目标iframe地址 通常指子页面地址
    iframe.contentWindow?.postMessage({
      method: methodName,
      data: data,
      type: IFRAME_TYPE,
      sourceUrl: iframe.src
    }, '*')
    // 注册回调方法
    fn && listen({
      methodName, fn, iframe
    })
  }

  /**
   * 给父级页面传值
   * @param options
   */
  function postToParent (options: Omit<Dispatch, 'iframe'>) {
    const { methodName, data, fn } = options
    window.parent.postMessage({
      method: methodName,
      data: data,
      type: IFRAME_TYPE,
      sourceUrl: window.location.href
    }, '*')
    // 注册回调方法
    fn && listen({
      methodName, fn
    })
  }

  /**
   * 注册监听事件
   * @param options
   */
  function listen (options: Listen): void {
    const { methodName, fn } = options
    queueMap.set(methodName, { fn })
  }

  /**
   * 发送消息
   * @param options
   */
  function dispatch (options: Dispatch): void {
    const { iframe, methodName, data, fn } = options
    if (iframe) {
      postToIframe(<PostToIframe>{
        ...options
      })
    } else {
      postToParent({
        methodName, data, fn
      })
    }
  }
  return {
    listen,
    dispatch
  }
}

export default iframePostMessage
