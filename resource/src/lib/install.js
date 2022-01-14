/* eslint-disable */
import JSEncrypt from 'jsencrypt';
import { isAndroid } from './isMobile';
const pubkey =
  'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvjQox5Om5gNOmynn8WaSv/s8dyWTSVvLCmdiV+W9r1iUs/wHhBg6EVYCQn9pBJPfdXsCjln+EStlDow6JJtcoYekM0O0yhKsbH7Y6a54N50lTqGzSYUPRDg4W6PrERn6udLAqeVELy6s+giFYIUeoAkYCLESPnTno/mQb5IDlc8kcq63hbNEOzMfCd/tp7217WpuKR4Lve0rI4ooQhdO/GbxDrzfsrGLlpJT8inhQd7mzjdwiCAOXV/H/UKkvkmIvL1R+qrIr14ZDjX28NRKSkNXtZxl6ZoaqN5wlJHj8/Qxb+ME6d1yRU6I3k/dS4uH08fKAol34nvDmrzD8i3VH2ShXjmqcmMzRWQHSMTle3gchAnUeVeCpdYLVQtGU2DqQSGmQFkyETMxqH4AEnI/6+IlDClMj2/PixGbU9wybK5BnCZETjf1D/V9jW/l4RxFn4mk7+z9s7cOKvlYdpPIORkhCTJRHfkC04JBYnEj+f7uMz6Zuj6H6nX9Ve9ldCnBXb9Tp6CS39/P7XcGR0PIbAeFJU14RCzusA0Z80TFzVraK6NE8Y768jcM/sWs1+wL8I5KnQ1E7Mfu39GQgxoHNJX/JZ9/1hSLoDwUBmHiFXLuYeGOcx7rcE4CcIXULKxNT5AQawnlo3h2KoTu5ou73xhKXdvS4RYJMw1C5o+c4pECAwEAAQ==';

export const InitInstallInfo = (data) => {
  // 無渠道ID時不執行
  if (!localStorage.getItem('channelid') || localStorage.getItem('channelid') === '') {
    return;
  }

  GetLocalIP();

  try {
    const info = JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
    });

    console.log(info);
    let base64Info = Buffer.from(info).toString('base64');

    localStorage.setItem('b', base64Info);

    if (isAndroid()) {
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

      container.style = null;
      container.style.position = 'fixed';
      container.style.pointerEvents = 'none';
      container.style.opacity = '0';
      document.body.appendChild(container);

      execCopy(container);

      setTimeout(() => {
        document.body.removeChild(container);
      }, 50);
    }
  } catch (e) {
    console.log(e);
  }
};

function GetLocalIP() {
  try {
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for firefox and chrome
    var pc = new RTCPeerConnection({ iceServers: [] }),
      noop = function () {};
    pc.createDataChannel(''); //create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
    pc.onicecandidate = function (ice) {
      //listen for candidate events
      if (!ice || !ice.candidate || !ice.candidate.candidate) return;
      var myIP = /([0-9]{1,3}(.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
      localStorage.setItem('addr', myIP);
      pc.onicecandidate = noop;
    };
  } catch (e) {
    console.log(e);
  }
}

export const EncryptInfo = (domain) => {
  // 無渠道ID時不執行
  if (!localStorage.getItem('channelid') || localStorage.getItem('channelid') === '') {
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
    channelid: localStorage.getItem('channelid') || '',
    gr: info.gpu,
    gv: info.gpu,
    imei: '',
    ip_nat: localStorage.getItem('addr') || '',
    os: info.OS,
    osver: info.OSVersion,
    code: localStorage.getItem('code') || '',
    sh: +info.screenHeight,
    sp: window.devicePixelRatio,
    sw: +info.screenWidth,
    // uuid: '',
    ver: '',
    // useragent: info.userAgent,
    // date: info.date,
    // browserInfo: info.browserInfo,
  };

  localStorage.setItem('hw', JSON.stringify(devInfo));

  const jsonString = JSON.stringify(devInfo);
  console.log(jsonString);

  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(pubkey);
  const encrypted = encrypt.encrypt(jsonString);

  return encrypted;

  // const decrypt = new JSEncrypt();
  // decrypt.setPrivateKey(pubkey);
  // const uncrypted = decrypt.decrypt(encrypted);
};

function execCopy(el) {
  window.getSelection().removeAllRanges();

  let range = document.createRange();
  range.selectNode(el);
  window.getSelection().addRange(range);

  const result = document.execCommand('Copy');
  console.log('copy result:', result);
  window.getSelection().removeAllRanges();
}
