/*
 * @Description:
 * @Version:
 * @Autor: ljw
 * @Date: 2022-03-03 21:33:41
 * @LastEditors: ljw
 * @LastEditTime: 2022-03-03 22:14:35
 */
// 同步
// module.exports = function (content, map, meta) {
//   console.log(content, 111)
//   return content
// }

// 同步
// module.exports = function (content, map, meta) {
//   console.log(111)
//   this.callback(null, content, map, meta)
// }

// 异步
module.exports = function (content, map, meta) {
  const callback = this.async()
  console.log(111)
  setTimeout(() => {
    callback(null, content)
  }, 1000)
}

// 提前执行
module.exports.pitch = function () {
  console.log(111)
}
