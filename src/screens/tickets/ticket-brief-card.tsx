import { TicketBrief } from "../../models/ticket/ticket-brief";
import Text from "../../components/Text";

const TicketBriefCard = (props: TicketBriefCardProps): JSX.Element => {
  return (
    <Text marginTop={48} category="title1">
      {props.ticketBrief.category}
    </Text>
  );
};

interface TicketBriefCardProps {
  ticketBrief: TicketBrief;
  onTicketSelected: Function;
}

export default TicketBriefCard;