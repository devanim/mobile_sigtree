import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Ticket } from "../../models/ticket/ticket";
import { Button } from "@ui-kitten/components";
import { mockIndividualTicketsList } from "./mock-tickets";
import { ticketCardStyles } from "./ticket-card-styles";
import { WebView } from "react-native-webview";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppStackParamList } from "../../routing/route-screens";

const TicketCard = (props: TicketCardProps): JSX.Element => {
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  useEffect(() => {
    //TODO - replace with axios call to back-end
    const requestResponse = mockIndividualTicketsList.find((item: Ticket) => item.id === props.ticketId);

    if (!requestResponse) {
      alert(`Ticket with id ${props.ticketId} could not be found`);
    }

    setTicket(requestResponse);
  }, []);
  
  return (
    <>
      <View>
        <Button children={"Edit"} onPress={() => navigate("EditTicketScreen", {screen: "EditTicketScreen", ...ticket})}></Button>
      </View>
      <View style={ticketCardStyles.containerCard}>
        <Text style={ticketCardStyles.titleStyle}>{`${ticket?.id} - ${ticket?.name}`}</Text>
        <View style={ticketCardStyles.twoOnRow}>
          <View style={ticketCardStyles.textView}>
            <Text style={ticketCardStyles.title}>Category: </Text>
            <Text style={ticketCardStyles.text}>{ticket?.category}</Text>
          </View>
          <View style={ticketCardStyles.textView}>
            <Text style={ticketCardStyles.title}>Status: </Text>
            <Text style={ticketCardStyles.text}>{ticket?.statusKey}</Text>
          </View>
        </View>
        <View style={ticketCardStyles.twoOnRow}>
          <View style={ticketCardStyles.textView}>
            <Text style={ticketCardStyles.title}>Priority: </Text>
            <Text style={ticketCardStyles.text}>{ticket?.priorityKey}</Text>
          </View>
          <View style={ticketCardStyles.textView}>
            <Text style={ticketCardStyles.title}>Building: </Text>
            <Text style={ticketCardStyles.text}>{ticket?.building}</Text>
          </View>
        </View>
      </View>
      <WebView style={ticketCardStyles.content} source={{ html: ticket ? ticket.content : "<p>No data</p>"}}/>
    </>
  );
};

type TicketCardProps = {
  ticketId: string;
}

export default TicketCard;