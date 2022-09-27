import { useState } from "react";

import { View } from "react-native";
import { Button } from "@ui-kitten/components";
import TicketsList from "./tickets-list";
import TicketCard from "./ticket-card";
import { ticketContainerStyles } from "./ticket-container-styles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppStackParamList } from "src/routing/route-screens";

const TicketContainer = (): JSX.Element => {
  const [showTicketsList, setShowTicketsList] = useState(true);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const onTicketSelected = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setShowTicketsList(false);
  }

  const onTicketClosed = () => {
    setShowTicketsList(true);
  }

  const toggleTicketsList = (): JSX.Element => {
    if (showTicketsList)
      return <TicketsList onTicketSelected={onTicketSelected}/>;
    
    return <TicketCard ticketId={selectedTicketId} onTicketClosed={onTicketClosed}/>;
  }

  return (
    <View>
      <Button style={ticketContainerStyles.button} children={"Add ticket"} onPress={() => navigate("NewTicketScreen", {screen: "NewTicketScreen"})} size={'small'}/>
      {toggleTicketsList()}
    </View>
  );
};

export default TicketContainer;