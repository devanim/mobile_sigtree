import React, { useContext, useState } from "react";
import { Text } from "react-native";

import Container from "../../components/container";
import { Button } from "@ui-kitten/components";

import { homeScreenStyles } from "./home-screen-styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../routing/route-screens";
import RealmContainer from "./realm-handler/realm-container";
import TermsOfService from "../../components/terms-of-service";
import LocalizationContext from "../../localization/localization-context";

const HomeScreen = (): JSX.Element => {
  const [showTOS, setShowTOS] = useState(false);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const { t, handleChange } = useContext(LocalizationContext);

  const onTOSCancel = () => {
    setShowTOS(false);
  };

  const toggleTOS = () => {
    if (showTOS) {
      return <TermsOfService buildingId={undefined} onCancel={onTOSCancel} />;
    }

    return <RealmContainer />;
  };

  return (
    <Container style={homeScreenStyles.container}>
      <Text>{t('BTN_TEST')}</Text>
      <Button
        style={homeScreenStyles.button}
        children={"Go to dashboard"}
        onPress={() => {
          //TODO - after back-end is integrated we need to use language coming from user profile here
          handleChange("ro");
          navigate("DashboardNavigator", { screen: "DashboardScreen" })
        }
        }
        size={"small"}
      />
      <Button
        style={homeScreenStyles.button}
        children={"Read Tems of Services"}
        onPress={() => setShowTOS(true)}
        size={"small"}
      />
      {toggleTOS()}
    </Container>
  );
};

export default HomeScreen;
