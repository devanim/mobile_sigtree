import { useEffect, useState } from "react";
import { View } from "react-native";
import { Ticket } from "src/models/ticket/ticket";
import Text from "../../components/Text";
import { Button } from "@ui-kitten/components";
import { mockIndividualTicketsList } from "./mock-tickets";
import { ticketCardStyles } from "./ticket-card-styles";
import { WebView } from "react-native-webview";

const TicketCard = (props: TicketCardProps): JSX.Element => {
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);

  useEffect(() => {
    //TODO - replace with axios call to back-end
    const requestResponse = mockIndividualTicketsList.find((item: Ticket) => item.id === props.ticketId);

    if (!requestResponse) {
      alert(`Ticket with id ${props.ticketId} could not be found`);
    }

    setTicket(requestResponse);
  }, []);
  
  return (
    <View style={ticketCardStyles.containerCard}>
      <Button children={"Close"} onPress={() => props.onTicketClosed()}></Button>
      <Text style={ticketCardStyles.textStyle} category="title1">{`${ticket?.id} - ${ticket?.name}`}</Text>
      <View style={ticketCardStyles.threeOnRow}>
        <Text style={ticketCardStyles.textStyle} category="call-out" status="placeholder">{ticket?.category}</Text>
        <Text style={ticketCardStyles.textStyle} category="call-out" status="placeholder">{ticket?.statusKey}</Text>
        <Text style={ticketCardStyles.textStyle} category="call-out" status="placeholder">{ticket?.priorityKey}</Text>
      </View>
      <Text style={ticketCardStyles.textStyle} category="call-out" status="placeholder">{ticket?.building}</Text>
      <Text style={ticketCardStyles.textStyle} category="call-out" status="placeholder">{ticket?.floor}</Text>
      <WebView style={ticketCardStyles.content} source={{ html: ticket ? ticket.content : "<p>No data</p>"}}/>
    </View>
  );
};

interface TicketCardProps {
  ticketId: string;
  onTicketClosed: Function;
}

export default TicketCard;