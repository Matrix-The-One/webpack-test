/*
 * @Description:
 * @Version:
 * @Autor: ljw
 * @Date: 2022-03-03 22:30:15
 * @LastEditors: ljw
 * @LastEditTime: 2022-03-03 22:46:13
 */
const {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook,
} = require('tapable')

class Lesson {
  constructor() {
    // 初始化hooks容器
    this.hooks = {
      // go: new SyncHook(['address']),
      go: new SyncBailHook(['address']), // 有返回值会终止同步hooks

      // leave: new AsyncParallelHook(['name', 'age']), // 异步并行
      leave: new AsyncSeriesHook(['name', 'age']), // 异步串行
    }
  }

  tap() {
    // 忘hooks中注册事件
    this.hooks.go.tap('go1', address => {
      console.log('go1', address)
      return 'go1'
    })
    this.hooks.go.tap('go2', address => {
      console.log('go2', address)
    })

    this.hooks.leave.tapAsync('leave1', (name, age, cb) => {
      setTimeout(() => {
        console.log('leave1', name, age)
        cb()
      }, 2000)
    })
    this.hooks.leave.tapPromise('leave2', (name, age) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('leave2', name, age)
          resolve()
        }, 1000)
      })
    })
  }

  start() {
    // 触发hooks
    this.hooks.go.call('start')
    this.hooks.leave.callAsync('pony', 17, () => {
      // 容器中的所有leave hook触发完成
      console.log('leave end')
    })
  }
}

const l = new Lesson()

l.tap()
l.start()
