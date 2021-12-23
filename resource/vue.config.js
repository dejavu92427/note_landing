/* global __webpack_public_path__:writable */
/* eslint-disable */

const proxy = require('./config/proxy.index');
const path = require('path');
const version = require('./src/config/version.json');
const siteConfig = require('./src/config/site.config.json');

// debugg gcp 觸發條件
// process.argv = [
//   '/usr/local/bin/node',
//   '/workspace/resource/node_modules/.bin/vue-cli-service',
//   'build',
//   '--mode',
//   'production',
//   'porn1'
// ]

console.info(`=> ${'process.argv:'}`, process.argv, '\n');
// let assetsVariablePath = `@import "@/assets/css/variable.scss";`;
// let buildSite = '';
// try {
//   process.argv.map((a) => {
//     if (a.startsWith('--SITE=') || a.startsWith('--site=')) {
//       buildSite = a.split('=')[1];
//       assetsVariablePath = `@import "@/assets/css/${buildSite}/variable.scss";`;
//       console.info('=> build target site:', buildSite);
//       console.info('=> import variable scss:', assetsVariablePath);
//       return;
//     }
//   });
// } catch (e) {
//   console.info('=> error:', e);
// }

module.exports = {
  // outputDir: '../www/static/', // defaut:'dist'
  // // assetsDir: '', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // indexPath: '../index.html', // www/index.html
  // publicPath: process.env.NODE_ENV === 'production' ? './static' : '/',

  outputDir: '../www', // defaut:'dist'

  productionSourceMap: false,
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    // 端口號
    port: 8880, // process.env.port

    // dev-server在服務器啟動後打開默認瀏覽器
    open: true,

    // 出現編譯器錯誤或警告時，在瀏覽器中顯示全屏覆蓋。
    overlay: {
      // 不顯示警告
      warnings: false,

      // 顯示錯誤
      errors: true,
    },

    // 如果你的前端應用和後端 API 服務器沒有運行在同一個主機上，
    // 你需要在開發環境下將 API 請求代理到 API 服務器。
    proxy: {
      // RD5 API
      '/api': {
        target: proxy.client, // 要代理的API地址
        changeOrigin: true, // 允許跨域,
        ws: true,
        secure: false,
        // pathRewrite: {
        //   // 這裡理解成用'/api'代替target裡面的地址，後面組件中我們掉接口時直接用api代替
        //   // 比如我要調用'http://www.abc.com/user/add'，直接寫'/api/user/add'即可'
        //   '^/api': '',
        // },
        onProxyRes(proxyRes, req, res) {
          // API LOG
          // console.log(req, res);
        },
      },
      // 前端網站配置
      '/tpl': {
        target: proxy.client,
        changeOrigin: true,
        ws: true,
        secure: false,
      },
      // 體育直播
      '/exsport': {
        target: proxy.client,
        changeOrigin: true,
        ws: true,
        secure: false,
      },
      // nginx 客端配置
      '/conf': {
        target: proxy.client,
        changeOrigin: true,
        ws: true,
        secure: false,
      },
    },
  },

  css: {
    loaderOptions: {
      // 向所有 Sass 樣式傳入共享的全局變量
      scss: {
        // prependData: `@import "@/assets/css/variable.scss";`,
        // prependData: assetsVariablePath,
      },
    },
  },

  // pwa: {
  //   appleMobileWebAppCapable: 'yes',
  //   appleMobileWebAppStatusBarStyle: 'black',
  //   manifestOptions: {
  //     name: `${siteConfig.find((i) => i.ROUTER_TPL === buildSite).SITE_NAME}`,
  //     short_name: siteConfig.find((i) => i.ROUTER_TPL === buildSite).SITE_NAME,
  //     id: '/',
  //     start_url: '/',
  //     display: 'standalone',
  //     theme_color: '#FFFFFF',
  //   },
  //   iconPaths: {
  //     faviconSVG: `img/${siteConfig.find((i) => i.ROUTER_TPL === buildSite).ROUTER_TPL}/favicon.svg`,
  //     favicon32: null,
  //     favicon16: null,
  //     appleTouchIcon: `img/${siteConfig.find((i) => i.ROUTER_TPL === buildSite).ROUTER_TPL}/icon-192x192.png`,
  //     maskIcon: null,
  //     msTileImage: null,
  //   },
  //   assetsVersion: version.VERSION || '',
  // },

  lintOnSave: process.env.NODE_ENV !== 'production',

  pages: {
    index: {
      // page 的入口
      // entry: 'src/main.ts',
      entry: '/src/cdn-entry-index.js',
      // 模板来源
      template: 'public/index.html',
      filename: 'index.html',
      title: ``,
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },

  // settings: {
  //   'vetur.useWorkspaceDependencies': true,
  //   'vetur.experimental.templateInterpolationService': true,
  // },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
  },
  chainWebpack: (config) => {
    // config.plugin('copy').tap((args) => {
    // if (process.env.CDN_HOST && outputDirName) {
    //   args[0].push({
    //     from: path.resolve(__dirname, '../www/'),
    //     to: path.resolve(__dirname, `../${outputDirName}/static/src`),
    //     toType: 'dir',
    //   });
    // }
    // return args;
    // });
    // // image-webpack-loader : compress image
    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     disable: process.env.NODE_ENV === 'production' ? false : true,
    //   });
    // // 更改路徑名為 img/(各資料夾名稱)/(資料夾底下圖片)
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .tap(options => {
    // options.fallback.options.name = 'img/[name]/[hash:8].[ext]';
    // 'https://ya.jingliangjiu.cn/static/image/porn1/common/logo.png?v=36612412.1';
    // options.publicPath = process.env.NODE_ENV === 'production' ? __webpack_public_path__ : '';
    //   return options;
    // });
  },
};
