import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import NavigationAction from "../../components/navigation-action";
import React from "react";
import { AppStackParamList } from "../../routing/route-screens";

import Container from "../../components/container";
import TicketCard from "./ticket-card";
import { ticketsScreenStyle } from "./tickets-screen-style";

const TicketScreen = (props: ArticleScreenProps): JSX.Element => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const ticketId = props.route.params.params.ticketId; 

  return (<Container style={ticketsScreenStyle.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title="Ticket"/>
    <TicketCard ticketId={ticketId}/>
  </Container>);
}

type ArticleScreenProps = {
  route: any;
  navigation: any;
}

export default TicketScreen;