import {I18nManager} from 'react-native';
import { I18n } from 'i18n-js';
import { memoize } from 'lodash';

export const DEFAULT_LANGUAGE = 'en';
export const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: (): any => require('../../assets/locales/en.json'),
  ro: (): any => require('../../assets/locales/ro.json'),
};
export const i18nInstance = new I18n();

export const translate = memoize(
  (key, config) => i18nInstance.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const t = translate;

export const setI18nConfig = (codeLang = null) => {
  // fallback if no available language fits
  const fallback = {languageTag: DEFAULT_LANGUAGE, isRTL: false};
  const lang = codeLang ? {languageTag: codeLang, isRTL: false} : null;
  const {languageTag, isRTL} = lang ? lang : fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18nInstance.translations = {[languageTag]: translationGetters[languageTag]()};
  i18nInstance.locale = languageTag;

  return languageTag;
};