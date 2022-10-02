import { createContext } from "react";

const defaultModel: LocalizationModel = {
  t: () => {return;}
}
const localizationContext = createContext<LocalizationModel>(defaultModel);

type LocalizationModel = {
  t: (scope: any, options?: any) => any; 
  locale?: string; 
  setLocale?: React.Dispatch<React.SetStateAction<string>>; 
}

export default localizationContext;