/*
 * @Description:
 * @Version:
 * @Autor: ljw
 * @Date: 2022-03-03 22:51:18
 * @LastEditors: ljw
 * @LastEditTime: 2022-03-03 22:56:53
 */
class Plugin1 {
  apply(complier) {
    complier.hooks.emit.tap('Plugin1', compilation => {
      console.log('emit')
    })
    complier.hooks.afterEmit.tap('Plugin1', compilation => {
      console.log('afterEmit')
    })
    complier.hooks.done.tap('Plugin1', stats => {
      console.log('done')
    })
  }
}

module.exports = Plugin1
