import { createContext } from "react";

const defaultModel: LocalizationModel = {
  t: () => {return;},
  handleChange: () => {return;}
}
const LocalizationContext = createContext<LocalizationModel>(defaultModel);

type LocalizationModel = {
  t: (scope: any, options?: any) => any; 
  locale?: string; 
  setLocale?: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (language: string) => void;
}

export default LocalizationContext;