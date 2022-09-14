import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import NavigationAction from "components/NavigationAction";
import React from "react";
import { Text } from "react-native";
import { AppStackParamList } from "src/routing/route-screens";

import Container from "../../../src/components/Container";

import { ticketsScreenStyle } from "./tickets-screen-style";

const TicketsScreen = (): JSX.Element => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (<Container style={ticketsScreenStyle.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title="Tickets"/>
    <Text>
      {"Tickets list placeholder here"}
    </Text>
  </Container>);
};

export default TicketsScreen;