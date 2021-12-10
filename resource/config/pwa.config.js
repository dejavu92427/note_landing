module.exports = {
  // name: 'rd7 test',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'black',

  manifestOptions: {
    start_url: '/iframe.html',
    display: 'standalone',
    theme_color: '#FFFFFF',
  },
  // iconPaths: {
  // faviconSVG: 'img/icons/favicon.svg',
  // favicon32: 'img/icons/favicon-32x32.png',
  // favicon16: 'img/icons/favicon-16x16.png',
  // appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
  // maskIcon: 'img/icons/safari-pinned-tab.svg',
  // msTileImage: 'img/icons/msapplication-icon-144x144.png',
  // },
  // manifestCrossorigin: true,

  // configure the workbox plugin
  // workboxPluginMode: "InjectManifest",
  // workboxOptions: {
  //   // swSrc is required in InjectManifest mode.
  //   swSrc: "dev/sw.js",
  //   // ...other Workbox options...
  // },
};
