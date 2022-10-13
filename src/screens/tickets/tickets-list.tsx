import { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import axios from "axios";

import { TicketBrief } from "../../models/ticket/ticket-brief";
import TicketBriefCard from "./ticket-brief-card";
import { ticketListStyles } from "./ticket-list-styles";
import Text from "../../components/text";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TicketParamList } from "../../routing/route-screens";
import LocalizationContext from "../../localization/localization-context";
import Error, { ErrorProps } from "../../components/error";
import { TicketListPayload } from "../../models/ticket/ticket-list-payload";
import { AUTH_MOCK, CONFIG, SCREEN_URL } from "../../models/mock-auth";

const TicketsList = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<TicketParamList>>();
  const [tickets, setTickets] = useState<TicketBrief[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [maxId, setMaxId] = useState(0);

  useEffect(() => {
    setIsLoadingData(true);

    getTickets();

    setIsLoadingData(false);
  }, [page]);

  const getTickets = async () => {
    try {
      const reqUrl = `${SCREEN_URL.TICKETS_URL}?fromId=${maxId}&count=${CONFIG.ITEMS_PER_PAGE}`;
      const response = await axios.get<TicketListPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${AUTH_MOCK.TOKEN}` },
      });

      if (response.status == 200) {
        setTickets([...tickets, ...(response.data.data.tickets ?? [])]);
        setMaxId(getMaximumIdFromCurrentState());
        setHasNextPage(response.data.data.more ?? false);
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

  const onTicketSelected = (ticketId: number) => {
    navigate("TicketScreen", {
      screen: "TicketScreen",
      params: { ticketId: ticketId },
    });
  };

  const onSelectedStatus = (status: string) => {
    alert(`selected status ${status}`);
  };

  const fetchNextPage = () => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  };

  const getMaximumIdFromCurrentState = () => {
    if (tickets.length === 0) {
      return 0;
    }

    return Math.max(...tickets.map((ticket) => ticket.row_num));
  };

  const renderFooter = () => (
    <View style={ticketListStyles.footerText}>
      {isLoadingData && <ActivityIndicator />}
      {!hasNextPage && <Text>No more tickets at the moment</Text>}
    </View>
  );

  const renderItem = useCallback(({ item }) => {
    return (
      <TicketBriefCard
        key={item.id}
        ticketBrief={item}
        onTicketSelected={onTicketSelected}
        onSelectedStatus={onSelectedStatus}
      />
    );
  }, []);

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  if (!tickets || tickets.length == 0) {
    return <ActivityIndicator />;
  }

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

export default TicketsList;
