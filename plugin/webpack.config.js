/*
 * @Description:
 * @Version:
 * @Autor: ljw
 * @Date: 2022-03-03 22:50:26
 * @LastEditors: ljw
 * @LastEditTime: 2022-03-06 15:35:02
 */
// const Plugin1 = require('./plugins/Plugin1')
const CopyWebpackPlugin = require('./plugins/CopyWebpackPlugin')

module.exports = {
  mode: 'production',
  plugins: [
    // new Plugin1(),
    new CopyWebpackPlugin({
      from: 'public',
      to: 'css',
      ignore: ['**/index.html'],
    }),
  ],
}
