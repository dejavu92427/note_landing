/* eslint-disable */

export interface AplusQueueItem {
  visit: { action: string; arguments: [string, string, { category: string; action: string; label: string }] };
  downloadPWA: { action: string; arguments: [string, string, { category: string; action: string; label: string }] };
  downloadIOS: { action: string; arguments: [string, string, { category: string; action: string; label: string }] };
  downloadANDROID: { action: string; arguments: [string, string, { category: string; action: string; label: string }] };
}
export interface AplusQueueList {
  porn1: AplusQueueItem;
  sg1: AplusQueueItem;
}

export const gtagList: AplusQueueList = {
  porn1: {
    visit: { action: 'aplus.record', arguments: ['104', 'CLK', { category: '落地页', action: '点击', label: 'PWA下载' }] },
    downloadPWA: { action: 'aplus.record', arguments: ['104', 'CLK', { category: '落地页', action: '点击', label: 'PWA下载' }] },
    downloadIOS: { action: 'aplus.record', arguments: ['103', 'CLK', { category: '落地页', action: '点击', label: 'iOS下载' }] },
    downloadANDROID: { action: 'aplus.record', arguments: ['102', 'CLK', { category: '落地页', action: '点击', label: 'Android下载' }] },
  },
  sg1: {
    visit: { action: 'aplus.record', arguments: ['104', 'CLK', { category: '落地页', action: '点击', label: 'PWA下载' }] },
    downloadPWA: { action: 'aplus.record', arguments: ['104', 'CLK', { category: '落地页', action: '点击', label: 'PWA下载' }] },
    downloadIOS: { action: 'aplus.record', arguments: ['103', 'CLK', { category: '落地页', action: '点击', label: 'iOS下载' }] },
    downloadANDROID: { action: 'aplus.record', arguments: ['102', 'CLK', { category: '落地页', action: '点击', label: 'Android下载' }] },
  },
};
