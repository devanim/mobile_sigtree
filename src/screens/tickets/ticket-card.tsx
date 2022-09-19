import { useEffect, useState } from "react";
import { View } from "react-native";
import { Ticket } from "src/models/ticket/ticket";
import Text from "../../components/Text";
import { Button } from "@ui-kitten/components";
import { mockIndividualTicketsList } from "./mock-tickets";

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
    <View>
      <Button children={"Close"} onPress={() => props.onTicketClosed()}></Button>
      <Text marginTop={48} category="title1">
        {`Name: ${ticket?.name}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Id: ${ticket?.id}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Tags: ${ticket?.tags}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Category: ${ticket?.category}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Status: ${ticket?.statusKey}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Priority: ${ticket?.priorityKey}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`User: ${ticket?.user}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Project: ${ticket?.project}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Building: ${ticket?.building}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Supplier: ${ticket?.supplier}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Floor: ${ticket?.floor}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Tenant: ${ticket?.tenant}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Content: ${ticket?.content}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Timestamp: ${ticket?.timestamp}`}
      </Text>
    </View>
  );
};

interface TicketCardProps {
  ticketId: string;
  onTicketClosed: Function;
}

export default TicketCard;