import React, { useContext } from "react";

import Container from "../../components/container";
import { Button } from "@ui-kitten/components";

import { homeScreenStyles } from "./home-screen-styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../routing/route-screens";
import RealmContainer from "./realm-handler/realm-container";
import LocalizationContext from "../../localization/localization-context";

const HomeScreen = (): JSX.Element => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const { t, handleChange } = useContext(LocalizationContext);

  return (
    <Container style={homeScreenStyles.container}>
      <Button
        style={homeScreenStyles.button}
        children={t("NAVIGATE_TO_DASHBOARD")}
        onPress={() => {
          //TODO - after back-end is integrated we need to use language coming from user profile here
          handleChange("ro");
          navigate("DashboardNavigator", { screen: "DashboardScreen" })
        }
        }
        size={"small"}
      />
      <RealmContainer />
    </Container>
  );
};

export default HomeScreen;
