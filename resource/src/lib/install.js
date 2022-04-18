/* eslint-disable */
import JSEncrypt from 'jsencrypt';
import { isAndroid } from './isMobile';
const pubkey = //公鑰（當初不知道是誰給的????）
  'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvjQox5Om5gNOmynn8WaSv/s8dyWTSVvLCmdiV+W9r1iUs/wHhBg6EVYCQn9pBJPfdXsCjln+EStlDow6JJtcoYekM0O0yhKsbH7Y6a54N50lTqGzSYUPRDg4W6PrERn6udLAqeVELy6s+giFYIUeoAkYCLESPnTno/mQb5IDlc8kcq63hbNEOzMfCd/tp7217WpuKR4Lve0rI4ooQhdO/GbxDrzfsrGLlpJT8inhQd7mzjdwiCAOXV/H/UKkvkmIvL1R+qrIr14ZDjX28NRKSkNXtZxl6ZoaqN5wlJHj8/Qxb+ME6d1yRU6I3k/dS4uH08fKAol34nvDmrzD8i3VH2ShXjmqcmMzRWQHSMTle3gchAnUeVeCpdYLVQtGU2DqQSGmQFkyETMxqH4AEnI/6+IlDClMj2/PixGbU9wybK5BnCZETjf1D/V9jW/l4RxFn4mk7+z9s7cOKvlYdpPIORkhCTJRHfkC04JBYnEj+f7uMz6Zuj6H6nX9Ve9ldCnBXb9Tp6CS39/P7XcGR0PIbAeFJU14RCzusA0Z80TFzVraK6NE8Y768jcM/sWs1+wL8I5KnQ1E7Mfu39GQgxoHNJX/JZ9/1hSLoDwUBmHiFXLuYeGOcx7rcE4CcIXULKxNT5AQawnlo3h2KoTu5ou73xhKXdvS4RYJMw1C5o+c4pECAwEAAQ==';
const isDev = process.env.NODE_ENV === 'development';
let gpuVendor = '';
export const InitClipboardInfo = (data) => {
  localStorage.removeItem('addr');

  const info = JSON.stringify({
    ...data, //text: '极速版下载',type: 'downloadPWA',platform: 'pwa',
    timestamp: new Date().toGMTString(),
  });

  // console.log('paste: ', info);

  let base64Info = Buffer.from(info).toString('base64');
  //var a = buffer.from(x) 將字串編碼為預設ascii(請查表)並放進buffer陣列中(Buffer['48','6c'...]) 以16進制表示('H'-> 48)("l" -> 6c)
  //若a.length為1 means 1 byte(00000000) 範圍00-ff對應到 00000000-11111111
  //a.toString('2') 將buffer的值，編譯為2進制  ('48'->0100_1000->01001000)
  //這邊為轉base64//ex. console.log(Buffer.from("Hello World").toString('base64'));//#SGVsbG8gV29ybGQ=
  localStorage.setItem('b', base64Info);

  if (isDev) {
    console.log(info, base64Info);
  }

  if (isAndroid()) {
    getUserIP(function (ip) {
      localStorage.setItem('addr', ip || '');
    });

    let container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.pointerEvents = 'none';
    container.style.opacity = '0';
    container.removeAttribute('readonly');
    container.setAttribute('id', 'ddd');

    container.innerHTML = `<a value='${base64Info}'>&nbsp;</a>`;
    document.body.appendChild(container);

    execCopy(container);
  } else {
    let container;
    container = document.createElement('img');
    container.setAttribute('src', `data:image/png;base64,${base64Info}`);

    container.setAttribute('contentEditable', 'true');
    container.removeAttribute('readonly');

    container.style.position = 'fixed';
    container.style.pointerEvents = 'none';
    container.style.opacity = '0';
    document.body.appendChild(container);
    execCopy(container); //把container選起來複製，然後刪掉 剪貼板????
  }

  const setDonwloadInfo = {
    appkey: data.appkey,
    channelId: data.channelid,
    uuid: data.uuid,
    isDownload: 1,
  };

  console.log(setDonwloadInfo);

  //取得以公鑰加密的資料，對downloadInfo轉成的json加密(後端在用私鑰打開????)
  const jsonString = JSON.stringify(setDonwloadInfo);
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(pubkey);
  const encrypted = encrypt.encrypt(jsonString);

  return encrypted;
};

function getUserIP(onNewIP) {
  try {
    let myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

    if (!myPeerConnection) {
      onNewIP('');
      return;
    }

    let pc = new myPeerConnection({
        iceServers: [],
      }),
      noop = function () {},
      localIPs = {},
      ipRegex = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/g,
      key;

    function iterateIP(ip) {
      if (!localIPs[ip]) onNewIP(ip);
      localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel('rtc');

    // create offer and set local description
    pc.createOffer(function (sdp) {
      sdp.sdp.split('\n').forEach(function (line) {
        if (line.indexOf('candidate') < 0) return;
        line.match(ipRegex).forEach(iterateIP);
      });

      pc.setLocalDescription(sdp, noop, noop);
    }, noop);

    //listen for candidate events
    pc.onicecandidate = function (ice) {
      /* console.log(ice) */
      if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
  } catch (e) {
    onNewIP('');
    console.log(e);
  }
}

export const EncryptInfo = (domain, site) => {
  getGPUInfo();

  if (typeof DeviceInfo === 'undefined') {
    return;
  }

  const info = DeviceInfo.getDeviceInfo();

  // appkey: 'string', // Hall ID
  // channelId: 0,
  // gr: 'string', // GPU Model
  // gv: 'string', // GPU Vendor
  // imei: 'string', // UUID
  // ip_nat: 'string', // internal ip
  // os: 'string', // Android / iOS
  // osver: 'string', // OS Version
  // promotionCode: 'string',
  // sh: 0, // Screen Heigh
  // sp: 'string', // Scaled Pixels
  // sw: 0, // Screen Width
  // uuid: 'string', // Server Generate
  // ver: 'string', // SDK Version
  const devInfo = {
    appkey: domain,
    channelid: Number(localStorage.getItem('channelid')) || 0,
    gr: isAndroid() ? getContext().renderer : gpuVendor,
    gv: getContext().vendor,
    imei: '',
    ip_nat: isAndroid() ? localStorage.getItem('addr') || '' : '',
    os: info.OS,
    osver: info.OSVersion,
    code: localStorage.getItem('code') || '',
    sh: Math.max(+window.screen.height, +window.screen.width),
    sp: String(window.devicePixelRatio),
    sw: Math.min(+window.screen.height, +window.screen.width),
    uuid: localStorage.getItem('uuid') || '',
    ver: '1.0.0',
    // useragent: info.userAgent,
    // date: info.date,
    // browserInfo: info.browserInfo,
  };

  localStorage.setItem('hw', JSON.stringify(devInfo));

  // setTimeout(() => {
  //   document.getElementsByClassName('donwload-tip')[0].innerHTML = JSON.stringify(devInfo);
  // }, 1000);

  if (isDev) {
    console.log(getContext());
    console.log('hw:', devInfo);
  }

  const jsonString = JSON.stringify(devInfo);
  const encrypt = new JSEncrypt();

  encrypt.setPublicKey(pubkey);
  const encrypted = encrypt.encrypt(jsonString);

  return encrypted;

  // const decrypt = new JSEncrypt();
  // decrypt.setPrivateKey(pubkey);
  // const uncrypted = decrypt.decrypt(encrypted);
};

function execCopy(el) {
  try {
    window.getSelection().removeAllRanges(); //得到一個selection對象，並且如果有光標選取範圍，則取消

    let range = document.createRange(); //創一個range(範圍對象)
    range.selectNode(el); //選取整個節點（ex.按下極速版產生的<img>）
    window.getSelection().addRange(range); //指定selection的範圍為range

    const result = document.execCommand('copy'); //複製選取的部分
    console.log('result:', result);
    window.getSelection().removeAllRanges();

    setTimeout(() => {
      document.body.removeChild(el);
    }, 50);
  } catch (e) {
    alert(e);
  }
}

function getGPUInfo() {
  if (typeof getRenderer === 'undefined') {
    return;
  }

  // Get the Apple graphics renderer and display the value.
  getRenderer((value) => {
    if (value == 'Unknown') {
      // Result from function is unknown. This probably means
      // it's not an Apple device.
      // Get the renderer using WebGL instead.
      let canvas = document.createElement('canvas');
      if (canvas != null) {
        let context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (context) {
          let info = context.getExtension('WEBGL_debug_renderer_info');
          if (info) {
            value = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
          }
        }
      }
    }
    gpuVendor = value;
    return;
  }, 'tak.min.js');
}

function getContext() {
  let cvs = document.createElement('canvas');
  if (cvs && 'function' == typeof cvs.getContext) {
    let strArr = ['webgl', 'webgl2', 'experimental-webgl2', 'experimental-webgl'];
    for (let ii = 0; ii < strArr.length; ii++) {
      let str = strArr[ii];
      let ctx = cvs.getContext(str);
      if (ctx) {
        let obj = {};
        obj.context = str;
        obj.version = ctx.getParameter(ctx.VERSION);
        obj.vendor = ctx.getParameter(ctx.VENDOR);
        obj.sl_version = ctx.getParameter(ctx.SHADING_LANGUAGE_VERSION);
        obj.max_texture_size = ctx.getParameter(ctx.MAX_TEXTURE_SIZE);
        let ext = ctx.getExtension('WEBGL_debug_renderer_info');
        if (ext) {
          obj.vendor = ctx.getParameter(ext.UNMASKED_VENDOR_WEBGL);
          obj.renderer = ctx.getParameter(ext.UNMASKED_RENDERER_WEBGL);
        }
        return obj;
      }
    }
  }
  return {};
}
