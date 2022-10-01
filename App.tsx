import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import { KeycloakProvider } from "expo-keycloak-auth";
import * as AuthSession from "expo-auth-session";

import * as eva from "@eva-design/eva";
import { default as darkTheme } from "./src/theme/dark.json";
import { default as lightTheme } from "./src/theme/light.json";
import { default as customTheme } from "./src/theme/appTheme.json";
import { default as customMapping } from "./src/theme/mapping.json";
import AssetIconsPack from "assets/AssetIconsPack";
import ThemeContext from "./src/context/ThemeContext";
import { patchFlatListProps } from "react-native-web-refresh-control";
import RealmContext from "./src/context/RealmContext";
import RealmDetails from "./src/models/realm-details";
import RoutingContainer from "./src/routing/routing-container";

patchFlatListProps();

export default App = () => {
  const redirectUrl = AuthSession.makeRedirectUri({ useProxy: false });
  //nativeRedirectPath: 182.168.119.106:1900
  //alert(`redirectUrl ${redirectUrl}`);
  const keycloakConfiguration = {
    clientId: "sigtree-app",
    realm: "test",
    url: "http://localhost:8080/auth",
    nativeRedirectPath: "192.168.119.106:19000",
    scheme: "exp"
  };

  const [theme, setTheme] = useState<"light" | "dark">("light");
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
  };

  return (
    <KeycloakProvider {...keycloakConfiguration}>
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
    </KeycloakProvider>
  );
};
