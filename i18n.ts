import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json'
import zh_hk from './locales/zh_hk.json'
import zh_cn from './locales/zh_cn.json'
import { getLocales } from 'expo-localization'

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', // To enforce old behaviour
    resources: {
      en: { translation: en },
      zh: { translation: zh_hk },
      'zh_cn': { translation: zh_cn },
    },
    // lng: 'zh_hk',
    lng: getLocales()[0].languageCode,
    fallbackLng: 'en'
  });

export default i18n;