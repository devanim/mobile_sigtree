import React, { useContext } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";

import NavigationAction from "../../components/navigation-action";
import Container from "../../components/container";
import { AppStackParamList } from "../../routing/route-screens";
import LocalizationContext from "../../localization/localization-context";
import TicketCard from "./ticket-card";

import { ticketsScreenStyle } from "./tickets-screen-style";

const TicketScreen = (props: ArticleScreenProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const ticketId = props.route.params.params.ticketId; 

  return (
    <Container style={ticketsScreenStyle.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title={t("TICKET_TITLE")}/>
      <TicketCard ticketId={ticketId}/>
    </Container>
  );
}

type ArticleScreenProps = {
  route: any;
  navigation: any;
}

export default TicketScreen;