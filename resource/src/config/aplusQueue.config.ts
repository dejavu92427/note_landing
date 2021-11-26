/* eslint-disable */

export interface IAplusQueueItem {
  id: string;
  visit: { action: string; arguments: [string, string, { category: string; action: string; label: string }] };
  downloadPWA: { action: string; arguments: [string, string, { category: string; action: string; label: string }] };
  downloadIOS: { action: string; arguments: [string, string, { category: string; action: string; label: string }] };
  downloadANDROID: { action: string; arguments: [string, string, { category: string; action: string; label: string }] };
}
export interface IAplusQueueList {
  porn1: IAplusQueueItem;
  sg1: IAplusQueueItem;
}

export const AplusQueueList: IAplusQueueList = {
  porn1: {
    id: '61833ac7e0f9bb492b4be074',
    visit: { action: 'aplus.record', arguments: ['104', 'CLK', { category: '落地页', action: '点击', label: 'PWA下载' }] },
    downloadPWA: { action: 'aplus.record', arguments: ['104', 'CLK', { category: '落地页', action: '点击', label: 'PWA下载' }] },
    downloadIOS: { action: 'aplus.record', arguments: ['103', 'CLK', { category: '落地页', action: '点击', label: 'iOS下载' }] },
    downloadANDROID: { action: 'aplus.record', arguments: ['102', 'CLK', { category: '落地页', action: '点击', label: 'Android下载' }] },
  },
  sg1: {
    id: '61833ac7e0f9bb492b4be074',
    visit: { action: 'aplus.record', arguments: ['104', 'CLK', { category: '落地页', action: '点击', label: 'PWA下载' }] },
    downloadPWA: { action: 'aplus.record', arguments: ['104', 'CLK', { category: '落地页', action: '点击', label: 'PWA下载' }] },
    downloadIOS: { action: 'aplus.record', arguments: ['103', 'CLK', { category: '落地页', action: '点击', label: 'iOS下载' }] },
    downloadANDROID: { action: 'aplus.record', arguments: ['102', 'CLK', { category: '落地页', action: '点击', label: 'Android下载' }] },
  },
};
