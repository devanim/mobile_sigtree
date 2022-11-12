import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { DEFAULT_LANGUAGE } from "../../localization/i18n";
import { APP_LANGUAGE_KEY, APP_TRANSLATIONS_KEY } from "../../utils/constants";
import { SCREEN_URL, SigtreeConfiguration } from "../config";
import { Language } from "./language";
import { LanguageDataPayload } from "./language-data-payload";
import { LanguagesPayload } from "./languages-payload";

export class LanguagesHandler {
  constructor(private realm: string) {}

  public runLanguageUpdate = (): void => {
    const allLanguagesUrl = SigtreeConfiguration.getUrl(this.realm, SCREEN_URL.LANGUAGES_URL); 
    
    axios.get<LanguagesPayload>(allLanguagesUrl).then((response) => {
      console.log("response from all languages", response.data.data);
      const allLanguages: Language[] = response.data.data;

      this.getSelectedLanguageFromStorage().then(lang => {
        const selectedLanguageDetails = allLanguages.find(l => l.name === lang);
        console.log("Sel lang details", selectedLanguageDetails);
        this.storeLanguageData(lang);
      });
    });
  }

  private storeLanguageData = (lang: string): void => {
    const languageUrl = `${SigtreeConfiguration.getUrl(this.realm, SCREEN_URL.LANGUAGE_URL)}/${lang}`;
    console.log("language url", languageUrl);
    axios.get<LanguageDataPayload>(languageUrl).then((response) => {
      const translations = response.data.data;
      console.log("language data", response.data);
      this.saveLanguageTranslations(translations);
    });
  }

  private getSelectedLanguageFromStorage = async (): Promise<string> => {
    const storedValue = await AsyncStorage.getItem(APP_LANGUAGE_KEY);
    console.log("stored value here", storedValue);
    if (!storedValue) {
      return DEFAULT_LANGUAGE;
    }
    const lang: string = storedValue;
    console.log("lang here", lang);
    return lang;
  }

  private saveLanguageTranslations = (translations: any) => {
    AsyncStorage.setItem(APP_TRANSLATIONS_KEY, JSON.stringify(translations));
  }
}