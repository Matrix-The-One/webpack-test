/*
 * @Description:
 * @Version:
 * @Autor: ljw
 * @Date: 2022-03-06 14:09:54
 * @LastEditors: ljw
 * @LastEditTime: 2022-03-06 15:34:45
 */
const { validate } = require('schema-utils')
const globby = require('globby')
const { isAbsolute, resolve, basename, join } = require('path')
const fs = require('fs')
const { promisify } = require('util')
const { sources } = require('webpack')

const schema = require('./schema.json')
const readFire = promisify(fs.readFile)
const { RawSource } = sources

class CopyWebpackPlugin {
  constructor(options = {}) {
    // 校验options
    validate(schema, options, {
      name: 'CopyWebpackPlugin',
    })
    this.options = options
  }
  apply(compiler) {
    // 初始化compilation
    compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', compilation => {
      debugger
      // 添加资源的hook
      compilation.hooks.additionalAssets.tapAsync(
        'CopyWebpackPlugin',
        // 读取后复制
        async cb => {
          const { from, to = '.', ignore } = this.options
          // 运行代码的目录，等于process.cwd()
          const context = compiler.options.context
          const absoluteFrom = (
            isAbsolute(from) ? from : resolve(context, from)
          ).replace(/\\/g, '/')

          // 获取文件路径
          const paths = await globby(absoluteFrom, { ignore })

          // 读取文件
          const files = await Promise.all(
            paths.map(async p => ({
              data: await readFire(p),
              filename: join(to, basename(p)),
            }))
          )

          // 生成webpack格式的资源
          const assets = files.map(f => ({
            source: new RawSource(f.data),
            filename: f.filename,
          }))

          // 添加到compilation中输出
          assets.forEach(a => compilation.emitAsset(a.filename, a.source))

          cb()
        }
      )
    })
  }
}

module.exports = CopyWebpackPlugin
