import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import React, { useContext } from "react";

import NavigationAction from "../../components/navigation-action";
import Container from "../../components/container";
import { AppStackParamList } from "../../routing/route-screens";
import LocalizationContext from "../../localization/localization-context";
import TicketContainer from "./ticket-container";

import { ticketsScreenStyle } from "./tickets-screen-style";

const TicketsScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (<Container style={ticketsScreenStyle.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title={t("TICKETS_TITLE")}/>
    <TicketContainer />
  </Container>);
};

export default TicketsScreen;