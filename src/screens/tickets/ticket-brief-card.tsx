import { Pressable, View } from "react-native";
import { TicketBrief } from "../../models/ticket/ticket-brief";
import Text from "../../components/text";
import { briefStyles } from "./ticket-brief-card-styles";

const TicketBriefCard = (props: TicketBriefCardProps): JSX.Element => {
  const onTicketPress = (ticketId: string) => {
    props.onTicketSelected(ticketId);
  };

  return (
    <Pressable onPress={() => onTicketPress(props.ticketBrief.id)}>
      <View style={briefStyles.containerCard}>
        <View style={briefStyles.idRow}>
          <Text
            style={[briefStyles.ticketId, briefStyles.default]}
            category="call-out"
            status="placeholder"
          >
            {props.ticketBrief?.id}
          </Text>
          <Text
            style={[briefStyles.priority, briefStyles.default]}
            category="call-out"
            status="placeholder"
          >
            {props.ticketBrief?.priorityKey}
          </Text>
        </View>
        <View>
          <Text
            style={[briefStyles.ticketName, briefStyles.default]}
            category="title1"
          >
            {props.ticketBrief?.name}
          </Text>
        </View>
        <View style={[briefStyles.floorRow]}>
          <Text marginTop={8} category="call-out" status="placeholder">
            This ticket is part of
          </Text>
          <Text style={[briefStyles.default]}>
            {props.ticketBrief?.building}
          </Text>
        </View>
        <View style={[briefStyles.userSupplierRow]}>
          <Text marginTop={8} category="call-out" status="placeholder">
            User:
          </Text>
          <Text
            style={[briefStyles.default]}
            category="call-out"
            status="placeholder"
          >
            {props.ticketBrief?.user}
          </Text>
          <Text marginTop={8} category="call-out" status="placeholder">
            Supplier:
          </Text>
          <Text
            style={[briefStyles.default]}
            category="call-out"
            status="placeholder"
          >
            {props.ticketBrief?.supplier}
          </Text>
        </View>
        <View style={[briefStyles.statusRow]}>
          <Text marginTop={8} category="call-out" status="placeholder">
            {props.ticketBrief?.statusKey}
          </Text>
          <Text marginTop={8} category="call-out" status="placeholder">
            {props.ticketBrief?.category}
          </Text>
        </View>
        <Text marginTop={8} category="call-out" status="placeholder">
          {props.ticketBrief?.timestamp}
        </Text>
      </View>
    </Pressable>
  );
};

type TicketBriefCardProps = {
  ticketBrief: TicketBrief;
  onTicketSelected: (ticketId: string) => void;
}

export default TicketBriefCard;
