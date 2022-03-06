/*
 * @Description:
 * @Version:
 * @Autor: ljw
 * @Date: 2022-03-03 21:32:29
 * @LastEditors: ljw
 * @LastEditTime: 2022-03-03 22:18:55
 */
const path = require('path')

module.exports = {
  mode: 'production',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'loader2',
      //       options: {
      //         name: 'pony',
      //       },
      //     },
      //     'loader1',
      //   ],
      // },
      {
        loader: 'babelLoader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },

  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')],
  },
}
