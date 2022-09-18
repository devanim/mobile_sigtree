import { useEffect, useState } from "react";
import { TicketBrief } from "../../models/ticket/ticket-brief";
import { ResponseStatus } from "../../utils/response-status-enum";
import { mockTickets } from "./mock-tickets";
import { ScrollView } from "react-native-gesture-handler";
import TicketBriefCard from "./ticket-brief-card";

const TicketsList = (props: TicketsListProps): JSX.Element => {
  const [tickets, setTickets] = useState<TicketBrief[] | undefined>(undefined);

  useEffect(() => {
    //TODO - replace with axios call to back-end
    const requestResponse = mockTickets;

    if (requestResponse.status === ResponseStatus.fail) {
      alert("Could not retrieve data from back-end");
    }

    setTickets(requestResponse.data?.tickets);
  }, []);

  const onTicketSelected = (articleId: number) => {
    props.onTicketSelected(articleId);
  }

  const mapArticles = () => {
    return tickets?.map(ticket => {
      return <TicketBriefCard key={ticket.id} ticketBrief={ticket} onTicketSelected={onTicketSelected}/>
    });
  }

  return (
    <ScrollView>
      {mapArticles()}
    </ScrollView>
  );
};

interface TicketsListProps {
  onTicketSelected: Function;
}

export default TicketsList;