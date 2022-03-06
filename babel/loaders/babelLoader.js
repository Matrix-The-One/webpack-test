/*
 * @Description:
 * @Version:
 * @Autor: ljw
 * @Date: 2022-03-03 22:06:17
 * @LastEditors: ljw
 * @LastEditTime: 2022-03-03 22:16:54
 */
const { validate } = require('schema-utils')
const babel = require('@babel/core')
const util = require('util')

const babelSchema = require('./babelSchema.json')

// 将babel.transform转为promise方式
const transform = util.promisify(babel.transform)

module.exports = function (content, map, meta) {
  const options = this.getOptions()
  validate(babelSchema, options, {
    name: 'Babel Loader',
  })

  const callback = this.async()
  transform(content, options)
    .then(({ code, map }) => callback(null, code, map))
    .catch(err => callback(err))
}
