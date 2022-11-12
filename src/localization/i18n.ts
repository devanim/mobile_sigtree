import {I18nManager} from 'react-native';
import { I18n } from 'i18n-js';
import { memoize } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_TRANSLATIONS_KEY } from '../utils/constants';

//TODO - move to conviguration file
export const DEFAULT_LANGUAGE = 'en';

const translationGetters: {[key: string]: () => string} = {
  en: (): string => require('../../assets/locales/en.json'),
  ro: (): string => require('../../assets/locales/ro.json'),
};

const setGetterMethod = (languageTag: string) => {
  let languageGetterMethod = translationGetters[languageTag];

  if (!languageGetterMethod) {
    languageGetterMethod = translationGetters[DEFAULT_LANGUAGE];
  }
  return languageGetterMethod;
}

const getLanguageDef = (codeLang: string | null): LanguageDef => {
  const fallback = {languageTag: DEFAULT_LANGUAGE, isRTL: false};
  const lang = codeLang ? {languageTag: codeLang, isRTL: false} : null;
  const {languageTag, isRTL} = lang ? lang : fallback;

  return {tag: languageTag, isRTL};
}

export const getStoredTranslations = (): any => {
  AsyncStorage.getItem(APP_TRANSLATIONS_KEY).then(data => {
    console.log("translations", JSON.parse(data ?? "{}"));
  });
}

export const setI18nConfig = (codeLang: string | null = null): I18n => {
  const languageDef: LanguageDef = getLanguageDef(codeLang);
  const i18nInstance = new I18n();
  const translate = memoize(
    (key, config) => i18nInstance.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );

  if (translate && translate.cache && translate.cache.clear) {
    translate.cache.clear();
  }
  
  I18nManager.forceRTL(languageDef.isRTL);

  const languageGetterMethod = setGetterMethod(languageDef.tag);

  i18nInstance.translations = {[languageDef.tag]: languageGetterMethod()};
  i18nInstance.locale = languageDef.tag;

  return i18nInstance;
};

type LanguageDef = {
  tag: string;
  isRTL: boolean;
}
