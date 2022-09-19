import {  Pressable, View } from "react-native";
import { TicketBrief } from "../../models/ticket/ticket-brief";
import Text from "../../components/Text";

const TicketBriefCard = (props: TicketBriefCardProps): JSX.Element => {
  const onTicketPress = (articleId: number) => {
    //alert(`Pressed article with value ${articleId}`);
    props.onTicketSelected(articleId);
  }
  
  return (
    <Pressable onPress={() => onTicketPress(props.ticketBrief.id)}>
      <View>
        <Text marginTop={48} category="title1">
          {`Name: ${props.ticketBrief?.name}`}
        </Text>
        <Text marginTop={8} category="call-out" status="placeholder">
          {`Id: ${props.ticketBrief?.id}`}
        </Text>
        <Text marginTop={8} category="call-out" status="placeholder">
          {`Category: ${props.ticketBrief?.category}`}
        </Text>
        <Text marginTop={8} category="call-out" status="placeholder">
          {`Status: ${props.ticketBrief?.statusKey}`}
        </Text>
        <Text marginTop={8} category="call-out" status="placeholder">
          {`Priority: ${props.ticketBrief?.priorityKey}`}
        </Text>
        <Text marginTop={8} category="call-out" status="placeholder">
          {`Project: ${props.ticketBrief?.project}`}
        </Text>
      </View>
    </Pressable>
  );
};

interface TicketBriefCardProps {
  ticketBrief: TicketBrief;
  onTicketSelected: Function;
}

export default TicketBriefCard;