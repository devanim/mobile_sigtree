import { useState } from "react";

import { View } from "react-native";
import { Button } from "@ui-kitten/components";
import TicketsList from "./tickets-list";
import TicketCard from "./ticket-card";
import { ticketContainerStyles } from "./ticket-container-styles";

const TicketContainer = (): JSX.Element => {
  const [showTicketsList, setShowTicketsList] = useState(true);
  const [showAddTicket, setShowAddTicket] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(-1);

  const onTicketSelected = (ticketId: number) => {
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
      <Button style={ticketContainerStyles.button} children={"Add ticket"} onPress={() => setShowAddTicket(true)} size={'small'}/>
      {toggleTicketsList()}
    </View>
  );
};

export default TicketContainer;