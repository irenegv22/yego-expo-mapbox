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
    supportsTablet: true,
    bundleIdentifier: "com.yegoexpo.app"
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
    ['expo-location', { isAndroidBackgroundLocationEnabled: false}, ],
    // ['@rnmapbox/maps', {
    //   RNMapboxMapsDownloadToken: "sk.eyJ1IjoiaXJlbmUyMiIsImEiOiJjbHNxZm5pNDYwd2gxMnFvNGthNmNjc211In0.mnxD56rnhVo3bDxSTMAJ7A"
    // }]
  ],
  // extra: {
  //   eas: {
  //     projectId: '9d5610f8-148b-4eeb-82b8-bb11b1e93073'
  //   }
  // },
});
