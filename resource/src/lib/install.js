/* eslint-disable */
import ClipboardJS from 'clipboard';
import { isIOS } from './isMobile';

export const initDeviceInfo = () => {
  try {
    // let devInfo = DeviceInfo.getDeviceInfo();
    // const info = JSON.stringify(DeviceInfo.getDeviceInfo());

    // 測試用
    const info = JSON.stringify({
      channelid: localStorage.getItem('channelid') || '8888',
      code: localStorage.getItem('code') || 'testcode',
      t: Date.now(),
    });

    // "appkey": "string", // Hall ID
    // "channelId": 0,
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

    let base64Info = Buffer.from(info).toString('base64');
    console.log(base64Info);
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
    console.log('result:', result);

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
