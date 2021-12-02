/* eslint-disable */

export interface IGTagItem {
  id: string;
  visit: { event: string; event_category: string; event_label: string; value: string };
  downloadPWA: { event: string; event_category: string; event_label: string; value: string };
  downloadIOS: { event: string; event_category: string; event_label: string; value: string };
  downloadANDROID: { event: string; event_category: string; event_label: string; value: string };
}

export interface IGTagList {
  porn1: IGTagItem;
  sg1: IGTagItem;
  sp1: IGTagItem;
  aobo1: IGTagItem;
}

export const gTagList: IGTagList = {
  porn1: {
    id: 'UA-132265281-13',
    visit: { event: 'Visit H5 Click', event_category: 'Click', event_label: 'Visit_H5_Bifa', value: '1' },
    downloadPWA: { event: 'Download Click', event_category: 'Click', event_label: 'Download_PWA_Bifa', value: '1' },
    downloadIOS: { event: 'Download Click', event_category: 'Click', event_label: 'Download_iOS_Bifa', value: '1' },
    downloadANDROID: { event: 'Download Click', event_category: 'Click', event_label: 'Download_Android_Bifa', value: '1' },
    // downloadHIDE: { event_category: 'Click', event_label: 'Download_HIDE_Bifa', value: '1' },
  },
  sg1: {
    id: 'UA-132265281-13',
    visit: { event: 'Visit H5 Click', event_category: 'Click', event_label: 'Visit_H5_Paopao', value: '1' },
    downloadPWA: { event: 'Download Click', event_category: 'Click', event_label: 'Download_PWA_Paopao', value: '1' },
    downloadIOS: { event: 'Download Click', event_category: 'Click', event_label: 'Download_iOS_Paopao', value: '1' },
    downloadANDROID: { event: 'Download Click', event_category: 'Click', event_label: 'Download_Android_Paopao', value: '1' },
  },
  sp1: {
    id: 'UA-132265281-13',
    visit: { event: 'Visit H5 Click', event_category: 'Click', event_label: 'event_label', value: '1' },
    downloadPWA: { event: 'Download Click', event_category: 'Click', event_label: 'event_label', value: '1' },
    downloadIOS: { event: 'Download Click', event_category: 'Click', event_label: 'event_label', value: '1' },
    downloadANDROID: { event: 'Download Click', event_category: 'Click', event_label: 'event_label', value: '1' },
  },
  aobo1: {
    id: 'UA-132265281-13',
    visit: { event: 'Visit H5 Click', event_category: 'Click', event_label: 'Visit_H5_AOBO', value: '1' },
    downloadPWA: { event: 'Download Click', event_category: 'Click', event_label: 'Download_PWA_AOBO', value: '1' },
    downloadIOS: { event: 'Download Click', event_category: 'Click', event_label: 'Download_iOS_AOBO', value: '1' },
    downloadANDROID: { event: 'Download Click', event_category: 'Click', event_label: 'Download_Android_AOBO', value: '1' },
  },
};
