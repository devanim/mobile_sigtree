import { createContext } from "react";

const localizationContext = createContext<LocalizationModel | null>(null);

type LocalizationModel = {
  t: (scope: any, options: any) => any; 
  locale: string; 
  setLocale: React.Dispatch<React.SetStateAction<string>>; 
}

export default localizationContext;