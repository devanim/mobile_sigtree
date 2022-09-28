import React, { useContext, useEffect, useState } from "react";

import Container from "../../components/container";
import { Button } from "@ui-kitten/components";

import { homeScreenStyles } from "./home-screen-styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../routing/route-screens";
import RealmContainer from "./realm-handler/realm-container";
import TermsOfService from "../../components/terms-of-service";

const HomeScreen = (): JSX.Element => {
  const [showTOS, setShowTOS] = useState(false);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const onTOSCancel = () => {
    setShowTOS(false);
  }

  const toggleTOS = () => {
    if (showTOS) {
      return <TermsOfService buildingId={undefined} onCancel={onTOSCancel}/>
    }

    return <RealmContainer />
  }

  return (<Container style={homeScreenStyles.container}>
    <Button style={homeScreenStyles.button} children={"Go to dashboard"} onPress={() => navigate("DashboardNavigator", {screen: "DashboardScreen"})} size={'small'}/>
    <Button style={homeScreenStyles.button} children={"Read Tems of Services"} onPress={() => setShowTOS(true)} size={'small'}/>
    {toggleTOS()}
  </Container>);
};

export default HomeScreen;