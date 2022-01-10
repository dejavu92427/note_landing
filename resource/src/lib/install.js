/* eslint-disable */
export const initDeviceInfo = () => {
  // const info = DeviceInfo.getDeviceInfo();
  // console.log(JSON.stringify(info));

  // navigator.clipboard.writeText(`${JSON.stringify(info)}`);

  const info = DeviceInfo.getDeviceInfo();
  // document.addEventListener('copy', function (e: any) {
  //   e.clipboardData.setData('text/html', e);
  //   e.preventDefault(); // default behaviour is to copy any selected text
  // });

  const container = document.createElement('img');
  container.setAttribute('id', 'hello');
  container.setAttribute('src', JSON.stringify(info));
  console.log(JSON.stringify(info));
  container.style.position = 'fixed';
  container.style.pointerEvents = 'none';
  container.style.opacity = '0';

  document.body.appendChild(container);
  window.getSelection().removeAllRanges();

  const range = document.createRange();
  range.selectNode(container);

  window.getSelection().addRange(range);
  const result = document.execCommand('copy');

  console.log(result);
  document.body.removeChild(container);

  navigator.permissions.query({ name: 'clipboard-read' }).then((result) => {
    // If permission to read the clipboard is granted or if the user will
    // be prompted to allow it, we proceed.

    if (result.state == 'granted' || result.state == 'prompt') {
      navigator.clipboard.read().then((data) => {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          data[i].getType('text/html').then((blob) => {
            console.log(blob);
          });
          // if (!data[i].types.includes('image/png')) {
          //   alert('Clipboard contains non-image data. Unable to access it.');
          // } else {
          //   data[i].getType('image/png').then((blob) => {
          //     imgElem.src = URL.createObjectURL(blob);
          //   });
          // }
        }
      });
    }
  });
};
