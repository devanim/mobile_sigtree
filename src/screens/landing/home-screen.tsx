import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect } from "react";
import { APP_LANGUAGE_KEY } from "../../utils/constants";

import Container from "../../components/container";

import { homeScreenStyles } from "./home-screen-styles";
import RealmContainer from "./realm-handler/realm-container";
import LocalizationContext from "../../localization/localization-context";

const HomeScreen = (): JSX.Element => {
  const { handleChange } = useContext(LocalizationContext);
  useEffect(() => {
    getStoredLanguage();
  });

  const getStoredLanguage = async () => {
    const storedLanguage = await AsyncStorage.getItem(APP_LANGUAGE_KEY);

    if (storedLanguage != null) {
      handleChange(storedLanguage);
    }
  }

  return (
    <Container style={homeScreenStyles.container}>
      <RealmContainer />
    </Container>
  );
};

export default HomeScreen;
