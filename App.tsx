import * as eva from "@eva-design/eva";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import AssetIconsPack from "assets/AssetIconsPack";
import * as Localization from 'expo-localization';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { patchFlatListProps } from "react-native-web-refresh-control";

import RealmContext from "./src/context/RealmContext";
import ThemeContext from "./src/context/ThemeContext";
import useCachedResources from "./src/hooks/useCachedResources";
import { KeycloakProvider } from "./src/keycloak/KeycloakProvider";
import { setI18nConfig } from './src/localization/i18n';
import LocalizationContext from './src/localization/localization-context';
import RealmDetails from "./src/models/realm-details";
import RoutingContainer from "./src/routing/routing-container";
import { default as customTheme } from "./src/theme/appTheme.json";
import { default as darkTheme } from "./src/theme/dark.json";
import { default as lightTheme } from "./src/theme/light.json";
import { default as customMapping } from "./src/theme/mapping.json";

patchFlatListProps();

const App = (): JSX.Element => {
  const keycloakConfiguration = {
    clientId: "sigtree-mobile",
    realm: "customer1",
    url: "https://sso.sigtree.com/auth",
    nativeRedirectPath: "192.168.119.106:19000",
    scheme: "app.myapp.com",
    extraParams: {
      grant_type: "password"
    }
  };

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedRealm, setSelectedRealm] = useState<RealmDetails | null>(null);
  const [locale, setLocale] = React.useState(Localization.locale);

  let i18n = setI18nConfig(Localization.locale);
  const localizationCtx = React.useMemo(
    () => ({
      t: (scope: any, options: any) => i18n.t(scope, { ...options }),
      locale,
      setLocale,
      handleChange: (language: string) => {
        i18n = setI18nConfig(language);
      }
    }), []);

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
  };

  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return <></>;
  } else {
    return (
      <KeycloakProvider {...keycloakConfiguration}>
        <LocalizationContext.Provider value={localizationCtx}  >
          <SafeAreaProvider>
            <RealmContext.Provider value={{ realmData: selectedRealm, setRealm }}>
              <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
                <ApplicationProvider
                  {...eva}
                  theme={
                    theme === "light"
                      ? { ...eva.light, ...customTheme, ...lightTheme }
                      : { ...eva.dark, ...customTheme, ...darkTheme }
                  }
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  /* @ts-ignore */
                  customMapping={customMapping}
                >
                  <SafeAreaProvider>
                    <StatusBar
                      style={theme === "light" ? "dark" : "light"}
                      translucent={true}
                      backgroundColor={"#00000000"}
                    />
                    <RoutingContainer />
                  </SafeAreaProvider>
                </ApplicationProvider>
              </ThemeContext.Provider>
            </RealmContext.Provider>
          </SafeAreaProvider>
        </LocalizationContext.Provider>
      </KeycloakProvider>
    );
  }
};

export default App;