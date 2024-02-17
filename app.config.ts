import type { ExpoConfig } from '@expo/config-types';

export default (config: ExpoConfig): ExpoConfig => ({
  ...config,
  name: 'YegoExpo',
  slug: 'YegoExpo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  scheme: 'YegoExpo',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {
    package: 'com.yegoexpo.app',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    versionCode: 2023021701
  },
  plugins: [
    //['expo-location', { isAndroidBackgroundLocationEnabled: false}, ],
    ['@rnmapbox/maps', {
      RNMapboxMapsDownloadToken: "pk.eyJ1IjoidG9ybWVsaW5lYW4iLCJhIjoiY2xyNmNjNmcwMjhodDJzcG41cGh1cHFhMyJ9.MuxxMkhxEHHaJdRX6nxGeA"
    }]
  ]
});
