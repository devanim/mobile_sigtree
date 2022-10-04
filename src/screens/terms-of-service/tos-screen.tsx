import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import NavigationAction from "../../components/navigation-action";
import React from "react";
import { AppStackParamList } from "src/routing/route-screens";

import Container from "../../components/container";
import { tosScreenStyles } from "./tos-screen-styles";
import TermsOfService from "../../components/terms-of-service";

const TOSScreen = (): JSX.Element => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
  <Container style={tosScreenStyles.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title="Terms of service"/>
    <TermsOfService buildingId={undefined}/>
  </Container>
  );
};

export default TOSScreen;