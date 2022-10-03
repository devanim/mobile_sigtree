import {I18nManager} from 'react-native';
import { I18n } from 'i18n-js';
import { memoize } from 'lodash';

//TODO - move to conviguration file
export const DEFAULT_LANGUAGE = 'en';
const translationGetters: {[key: string]: () => string} = {
  en: (): string => require('../../assets/locales/en.json'),
  ro: (): string => require('../../assets/locales/ro.json'),
};

export const setI18nConfig = (codeLang: string | null = null): I18n => {
  const fallback = {languageTag: DEFAULT_LANGUAGE, isRTL: false};
  const lang = codeLang ? {languageTag: codeLang, isRTL: false} : null;
  const i18nInstance = new I18n();
  const {languageTag, isRTL} = lang ? lang : fallback;
  const translate = memoize(
    (key, config) => i18nInstance.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );

  if (translate && translate.cache && translate.cache.clear) {
    translate.cache.clear();
  }
  
  I18nManager.forceRTL(isRTL);

  i18nInstance.translations = {[languageTag]: translationGetters[languageTag]()};
  i18nInstance.locale = languageTag;

  return i18nInstance;
};
