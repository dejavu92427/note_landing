/* eslint-disable */
import JSEncrypt from 'jsencrypt';

const pubkey =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArBE0IS/CagjTMVo4xRpZ86/zDPJpvEicB3Q2Kntd+n/oR2BeitffEvF/BcKyLq5cksqFk+0twJcNO0nSVdJK5MlwtBF83Xkugf0vtz9Bf8tB3l2dpRTqrRzeFbggd9uldaiptbmzKRkwMmG9/pBXY/NVdvan2DhO66ND3ArPa+lzZHmnU6HYu/cgM6kHvQObhDpMTFgW4UvBP8uLhc0i8hvh/80AABztFuq8/0ZdEBRIXL2cG8KGjm5xuIRZBlefEbHpNo3S2pZQGz1vYHCl4eAF8D+cxtG+myJ72f21UIKGLy3WuAyysxJNYyPBT4pXXI2znHKDJGpZpSa6ODP18QIDAQAB';
export const InitInstallInfo = (data) => {
  // if (!localStorage.getItem('channelid')) {
  //   return;
  // }
  try {
    // 測試用
    const info = JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
    });

    console.log(info);

    let base64Info = Buffer.from(info).toString('base64');

    const container = document.createElement('img');
    container.setAttribute('id', 'hello');
    container.contentEditable = true;
    container.setAttribute('src', `${base64Info}`);
    container.setAttribute('data', `${base64Info}`);
    // container.innerHTML = JSON.stringify(info);

    container.readOnly = false;
    container.style = null;
    container.style.position = 'fixed';
    container.style.pointerEvents = 'none';
    container.style.opacity = '0';
    document.body.appendChild(container);

    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(container);
    window.getSelection().addRange(range);

    const result = document.execCommand('copy');
    console.log('copy result:', result);
    // const infoBlob = new Blob([container], { type: 'text/html' });
    // const clipboardItem = new ClipboardItem({
    //   'text/html': infoBlob,
    // });

    // console.log(clipboardItem);
    // async () => {
    //   await navigator.clipboard.write([clipboardItem]);
    // };

    document.body.removeChild(container);
    window.getSelection().removeAllRanges();
  } catch (e) {
    console.log(e);
  }
};

export const EncryptInfo = (domain) => {
  const info = DeviceInfo.getDeviceInfo();
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
    sh: info.screenHeight.toString(),
    sp: window.devicePixelRatio.toString(),
    sw: info.screenWidth.toString(),
    uudi: '',
    ver: '',
    useragent: info.userAgent,
    date: info.date,
    deviceType: info.deviceType,
    browserInfo: info.browserInfo,
  };

  console.log(devInfo);

  // "appkey": "string", // Hall ID
  // "channelid": 0,
  // "gr": "string", // GPU Model
  // "gv": "string", // GPU Vendor
  // "imei": "string", // UUID
  // "ip_nat": "string", // internal ip
  // "os": "string", // Android / iOS
  // "osver": "string", // OS Version
  // "promotionCode": "string",
  // "sh": 0, // Screen Heigh
  // "sp": "string", // Scaled Pixels
  // "sw": 0, // Screen Width
  // "uuid": "string", // Server Generate
  // "ver": "string" // SDK Version

  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(pubkey);
  const encrypted = encrypt.encrypt(devInfo);

  return encrypted;

  // const decrypt = new JSEncrypt();
  // decrypt.setPrivateKey(pubkey);
  // const uncrypted = decrypt.decrypt(encrypted);
};
