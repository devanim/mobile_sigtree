import { useState } from "react";

import { View } from "react-native";
import TicketsList from "./tickets-list";
import TicketCard from "./ticket-card";

const TicketContainer = (): JSX.Element => {
  const [showTicketsList, setShowTicketsList] = useState(true);
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
      {toggleTicketsList()}
    </View>
  );
};

export default TicketContainer;