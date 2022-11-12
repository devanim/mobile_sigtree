import axios from "axios";
import { SCREEN_URL, SigtreeConfiguration } from "../config";
import { LanguageDataPayload } from "./language-data-payload";
import { LanguagesPayload } from "./languages-payload";

export class LanguagesHandler {
  public getAvailableLanguages = (realm: string): void => {
    const allLanguagesUrl = SigtreeConfiguration.getUrl(realm, SCREEN_URL.LANGUAGES_URL); 
    
    axios.get<LanguagesPayload>(allLanguagesUrl).then((response) => {
      console.log("response from all languages", response.data.data);
    });
  }

  public getLanguageData = (realm: string, lang: string): void => {
    const languageUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.LANGUAGE_URL)}/${lang}`;

    axios.get<LanguageDataPayload>(languageUrl).then((response) => {
      console.log("language data", response.data.data);
    });
  }
}