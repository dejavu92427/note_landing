/* eslint-disable */
import JSEncrypt from 'jsencrypt';
import { isAndroid } from './isMobile';
const pubkey =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArBE0IS/CagjTMVo4xRpZ86/zDPJpvEicB3Q2Kntd+n/oR2BeitffEvF/BcKyLq5cksqFk+0twJcNO0nSVdJK5MlwtBF83Xkugf0vtz9Bf8tB3l2dpRTqrRzeFbggd9uldaiptbmzKRkwMmG9/pBXY/NVdvan2DhO66ND3ArPa+lzZHmnU6HYu/cgM6kHvQObhDpMTFgW4UvBP8uLhc0i8hvh/80AABztFuq8/0ZdEBRIXL2cG8KGjm5xuIRZBlefEbHpNo3S2pZQGz1vYHCl4eAF8D+cxtG+myJ72f21UIKGLy3WuAyysxJNYyPBT4pXXI2znHKDJGpZpSa6ODP18QIDAQAB';
export const InitInstallInfo = (data) => {
  // 無渠道ID時不執行
  if (!localStorage.getItem('channelid') || localStorage.getItem('channelid') === '') {
    return;
  }
  try {
    const info = JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
    });

    console.log(info);
    let base64Info = Buffer.from(info).toString('base64');

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
    }
  } catch (e) {
    console.log(e);
  }
};

export const EncryptInfo = (domain) => {
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
    ip_nat: '',
    os: info.OS,
    osver: info.OSVersion,
    code: localStorage.getItem('code') || '',
    sh: +info.screenHeight,
    sp: window.devicePixelRatio.toString(),
    sw: +info.screenWidth,
    // uuid: '',
    ver: '',
    // useragent: info.userAgent,
    // date: info.date,
    // browserInfo: info.browserInfo,
  };

  localStorage.setItem('hw', JSON.stringify(devInfo));

  const jsonString = JSON.stringify(devInfo);
  console.log(devInfo);

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
