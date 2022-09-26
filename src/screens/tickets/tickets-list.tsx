import { useCallback, useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";

import { TicketBrief } from "../../models/ticket/ticket-brief";
import { ResponseStatus } from "../../utils/response-status-enum";
import { ticketPaginationMock } from "./mock-tickets";
import TicketBriefCard from "./ticket-brief-card";
import { ticketListStyles } from "./ticket-list-styles";
import Text from "../../components/text";

const TicketsList = (props: TicketsListProps): JSX.Element => {
  const [tickets, setTickets] = useState<TicketBrief[] | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    setIsLoadingData(true);

    //TODO - replace with axios call to back-end
    const requestResponse = ticketPaginationMock[page];

    setIsLoadingData(false);

    if (requestResponse.status === ResponseStatus.fail) {
      alert("Could not retrieve data from back-end");
    }

    if (!tickets) {
      setTickets(requestResponse.data?.tickets);
      return;
    }

    setTickets([...tickets, ...requestResponse.data?.tickets ?? []]);
    setHasNextPage(requestResponse.data?.more ?? false);
  }, []);

  const onTicketSelected = (ticketId: string) => {
    props.onTicketSelected(ticketId);
  }

  const fetchNextPage = () => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  }

  const renderFooter = () => (
    <View style={ticketListStyles.footerText}>
        {isLoadingData && <ActivityIndicator />}    
        {!hasNextPage && <Text>No more tickets at the moment</Text>}
    </View>
  );
  
  const renderItem = useCallback(({ item }) => {
    return <TicketBriefCard key={item.id} ticketBrief={item} onTicketSelected={onTicketSelected}/>
  }, []);

  return (
    <FlatList
      data={tickets || []}
      renderItem={renderItem}
      keyExtractor={(i, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={ticketListStyles.contentContainerStyle}
      onEndReachedThreshold={0.2}
      onEndReached={fetchNextPage}
      ListFooterComponent={renderFooter}
    />
  );
};

interface TicketsListProps {
  onTicketSelected: Function;
}

export default TicketsList;