export interface IDownloadConfig {
  android: { show: boolean; uri: string; bundleID: string };
  hide: { show: boolean; uri: string; bundleID: string };
  ios: { show: boolean; uri: string; bundleID: string };
  pwa: { show: boolean; uri: string; bundleID: string };
}
