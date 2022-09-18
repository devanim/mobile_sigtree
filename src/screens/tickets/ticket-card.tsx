import Text from "../../components/Text";

const TicketCard = (props: TicketCardProps): JSX.Element => {
  return (
    <Text marginTop={48} category="title1">
      {props.ticketId}
    </Text>
  );
};

interface TicketCardProps {
  ticketId: number;
  onTicketClosed: Function;
}

export default TicketCard;