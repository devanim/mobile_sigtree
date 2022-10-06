import { Pressable, View, Text } from "react-native";
import { TicketBrief } from "../../models/ticket/ticket-brief";
import { briefStyles } from "./ticket-brief-card-styles";

const TicketBriefCard = (props: TicketBriefCardProps): JSX.Element => {
  const localizedDate = new Date(props.ticketBrief.timestamp).toLocaleDateString();

  const onTicketPress = (ticketId: string) => {
    props.onTicketSelected(ticketId);
  };

  return (
    <Pressable onPress={() => onTicketPress(props.ticketBrief.id)}>
      <View style={briefStyles.containerCard}>
        <View>
          <Text style={[briefStyles.title, briefStyles.titleView]}>{props.ticketBrief?.name}</Text>
        </View>
        <View style={briefStyles.twoRow}>
          <View style={briefStyles.textView}>
            <Text style={briefStyles.title}>TicketId: </Text>
            <Text style={briefStyles.text}>{props.ticketBrief?.id}</Text>
          </View>
          <View style={briefStyles.textView}>
            <Text style={briefStyles.title}>Priority: </Text>
            <Text style={briefStyles.text}>{props.ticketBrief?.priorityKey}</Text>
          </View>
        </View>
        <View style={briefStyles.twoRow}>
          <View style={briefStyles.textView}>
            <Text style={briefStyles.title}>Building: </Text>
            <Text style={briefStyles.text}>{props.ticketBrief?.building}</Text>
          </View>
          <View style={briefStyles.textView}>
            <Text style={briefStyles.title}>Date: </Text>
            <Text style={briefStyles.text}>{localizedDate}</Text>
          </View>
        </View>
        <View style={briefStyles.twoRow}>
          <View style={briefStyles.textView}>
            <Text style={briefStyles.title}>User: </Text>
            <Text style={briefStyles.text}>{props.ticketBrief?.user}</Text>
          </View>
          <View style={briefStyles.textView}>
            <Text style={briefStyles.title}>Supplier: </Text>
            <Text style={briefStyles.text}>{props.ticketBrief?.supplier}</Text>
          </View>
        </View>
        <View style={briefStyles.twoRow}>
          <View style={briefStyles.textView}>
            <Text style={briefStyles.title}>Category: </Text>
            <Text style={briefStyles.text}>{props.ticketBrief?.category}</Text>
          </View>
          <View style={briefStyles.textView}>
            <Text style={briefStyles.title}>Status: </Text>
            <Text style={briefStyles.text}>{props.ticketBrief?.statusKey}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

type TicketBriefCardProps = {
  ticketBrief: TicketBrief;
  onTicketSelected: (ticketId: string) => void;
}

export default TicketBriefCard;
