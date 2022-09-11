import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import AppContainer from "./navigation/AppContainer";
import * as eva from "@eva-design/eva";
import { default as darkTheme } from "constants/theme/dark.json";
import { default as lightTheme } from "constants/theme/light.json";
import { default as customTheme } from "constants/theme/appTheme.json";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as customMapping } from "./constants/theme/mapping.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import AssetIconsPack from "assets/AssetIconsPack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeContext from "./src/context/ThemeContext";
import { patchFlatListProps } from "react-native-web-refresh-control";
import RealmContext from "./src/context/RealmContext";
import RealmDetails from "./src/models/realm-details";

patchFlatListProps();

export default App = () =>  {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedRealm, setSelectedRealm] = useState<RealmDetails | null>(null);

  React.useEffect(() => {
    AsyncStorage.getItem("theme").then((value) => {
      if (value === "light" || value === "dark") setTheme(value);
    });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    AsyncStorage.setItem("theme", nextTheme).then(() => {
      setTheme(nextTheme);
    });
  };

  const setRealm = (realm: RealmDetails | null) => {
    setSelectedRealm(realm);
  }

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <RealmContext.Provider value={{realmData: selectedRealm, setRealm}}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
          <ApplicationProvider
            {...eva}
            theme={
              theme === "light"
                ? { ...eva.light, ...customTheme, ...lightTheme }
                : { ...eva.dark, ...customTheme, ...darkTheme }
            }
            /* @ts-ignore */
            customMapping={customMapping}
          > 
            <SafeAreaProvider>
              <StatusBar
                style={theme === "light" ? "dark" : "light"}
                translucent={true}
                backgroundColor={"#00000000"}
              />
              <AppContainer />
            </SafeAreaProvider>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </RealmContext.Provider>
    </SafeAreaProvider>
  );
}
