/*
 * @Description:
 * @Version:
 * @Autor: ljw
 * @Date: 2022-03-03 21:40:19
 * @LastEditors: ljw
 * @LastEditTime: 2022-03-03 22:14:52
 */
// 同步
module.exports = function (content, map, meta) {
  const options = this.getOptions()
  console.log(options, 222)
  return content
}

// 提前执行
module.exports.pitch = function () {
  console.log(222)
}
