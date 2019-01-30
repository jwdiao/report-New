const webpack = require('webpack')
module.exports = {
    // 基本路径
    baseUrl: './', //测试线上地址
    // baseUrl: process.env.NODE_ENV === 'production' ? 'http://10.19.7.69:8080/checkoutsys' : './', //测试线上地址
    // baseUrl: process.env.NODE_ENV === 'production' ? 'http://10.19.7.70:8080/checkoutsys' : './', //生产线上地址
    // baseUrl: process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:8080/checkoutsys' : './', //本地测试


    // 输出文件目录
    outputDir: 'sanyreport',
    // 不支持eslint
    // lintOnSave: false,
    // 支持jquery
    configureWebpack: {
      plugins: [
          new webpack.ProvidePlugin({
              jQuery: 'jquery',
              $: 'jquery'
          })
      ]
    }
  }
