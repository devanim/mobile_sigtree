import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import NavigationAction from "components/NavigationAction";
import React from "react";
import { AppStackParamList } from "src/routing/route-screens";

import Container from "../../../src/components/Container";
import TicketContainer from "./ticket-container";

import { ticketsScreenStyle } from "./tickets-screen-style";

const TicketsScreen = (): JSX.Element => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (<Container style={ticketsScreenStyle.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title="Tickets"/>
    <TicketContainer />
  </Container>);
};

export default TicketsScreen;