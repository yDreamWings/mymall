module.exports = {
  publicPath:'./',
  configureWebpack:{
      resolve: {
          alias: {
            'assets': '@/assets',
            'common': '@/common',
            'components': '@/components',
            'network': '@/network',
            'views': '@/views',
            'plugins': '@/plugins',
          }
        }
  },
  css : {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            viewportWidth : 375,
            viewportHeight : 667,
            unitPrecision : 5,  //保留小数位数
            viewportUnit : 'vw',
            minPixelValue : 1, //  小于等于1px不转换
            mediaQuery : false //是否允许使用媒体查询
          })
        ]
      }
    }
  }
}