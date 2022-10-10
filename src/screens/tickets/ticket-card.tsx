import { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Ticket } from "../../models/ticket/ticket";
import { Button } from "@ui-kitten/components";
import axios from "axios";

import { ticketCardStyles } from "./ticket-card-styles";
import { WebView } from "react-native-webview";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppStackParamList } from "../../routing/route-screens";
import LocalizationContext from "../../localization/localization-context";
import Error, { ErrorProps } from "../../components/error";
import { AUTH_MOCK, SCREEN_URL } from "../../models/mock-auth";
import { TicketPayload } from "../../models/ticket/ticket-payload";

const TicketCard = (props: TicketCardProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  useEffect(() => {
    getTicket();
  }, []);

  const getTicket = async () => {
    try {
      const reqUrl = `${SCREEN_URL.TICKET_URL}/${props.ticketId}`;
      const response = await axios.get<TicketPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${AUTH_MOCK.TOKEN}` },
      });

      if (response.status == 200) {
        if (response.data.data.tickets.length > 0) {
          setTicket(response.data.data.tickets[0]);
        }
      } else {
        const friendlyMessage = t("FAILED_REQUEST");
        setError({
          friendlyMessage: friendlyMessage,
          errorMessage: response.data.error ?? "",
        });
      }
    } catch (error) {
      const friendlyMessage = t("FAILED_REQUEST");
      setError({
        friendlyMessage: friendlyMessage,
        errorMessage: JSON.stringify(error),
      });
    }
  };

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  if (!ticket) {
    return <ActivityIndicator />;
  }
  
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