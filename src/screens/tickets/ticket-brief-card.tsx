import { useContext } from "react";
import { Pressable, View, Text } from "react-native";
import LocalizationContext from "../../localization/localization-context";
import { TicketBrief } from "../../models/ticket/ticket-brief";
import { briefStyles } from "./ticket-brief-card-styles";

const TicketBriefCard = (props: TicketBriefCardProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const localizedDate = new Date(props.ticketBrief.timestamp).toLocaleDateString();

  const onTicketPress = (ticketId: number) => {
    props.onTicketSelected(ticketId);
  };

  const onSelectedStatus = (status: string) => {
    props.onSelectedStatus(status);
  }

  return (
    <>
      <Pressable onPress={() => onTicketPress(props.ticketBrief.id)}>
        <View style={briefStyles.containerCard}>
          <View>
            <Text style={[briefStyles.title, briefStyles.titleView]}>{props.ticketBrief?.name}</Text>
          </View>
          <View style={briefStyles.twoRow}>
            <View style={briefStyles.textView}>
              <Text style={briefStyles.title}>{t("TICKET_BRIEF_CARD_TICKETID")}</Text>
              <Text style={briefStyles.text}>{props.ticketBrief?.id}</Text>
            </View>
            <View style={briefStyles.textView}>
              <Text style={briefStyles.title}>{t("TICKET_BRIEF_CARD_PRIORITY")}</Text>
              <Text style={briefStyles.text}>{props.ticketBrief?.priorityKey}</Text>
            </View>
          </View>
          <View style={briefStyles.twoRow}>
            <View style={briefStyles.textView}>
              <Text style={briefStyles.title}>{t("TICKET_BRIEF_CARD_BUILDING")}</Text>
              <Text style={briefStyles.text}>{props.ticketBrief?.building}</Text>
            </View>
            <View style={briefStyles.textView}>
              <Text style={briefStyles.title}>{t("TICKET_BRIEF_CARD_DATE")}</Text>
              <Text style={briefStyles.text}>{localizedDate}</Text>
            </View>
          </View>
          <View style={briefStyles.twoRow}>
            <View style={briefStyles.textView}>
              <Text style={briefStyles.title}>{t("TICKET_BRIEF_CARD_USER")}</Text>
              <Text style={briefStyles.text}>{props.ticketBrief?.user}</Text>
            </View>
            <View style={briefStyles.textView}>
              <Text style={briefStyles.title}>{t("TICKET_BRIEF_CARD_SUPPLIER")}</Text>
              <Text style={briefStyles.text}>{props.ticketBrief?.supplier}</Text>
            </View>
          </View>
          <View style={briefStyles.twoRow}>
            <View style={briefStyles.textView}>
              <Text style={briefStyles.title}>{t("TICKET_BRIEF_CARD_CATEGORY")}</Text>
              <Text style={briefStyles.text}>{props.ticketBrief?.category}</Text>
            </View>
          </View>
        </View>
      </Pressable>
      <Pressable style={briefStyles.statusView} onPress={() => onSelectedStatus(props.ticketBrief.statusKey)}>
        <Text style={briefStyles.title}>{t("TICKET_BRIEF_CARD_STATUS")}</Text>
        <Text style={briefStyles.text}>{props.ticketBrief?.statusKey}</Text>
      </Pressable>
    </>
  );
};

type TicketBriefCardProps = {
  ticketBrief: TicketBrief;
  onTicketSelected: (ticketId: number) => void;
  onSelectedStatus: (status: string) => void;
}

export default TicketBriefCard;
