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
import { CONFIG, SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import ListFiltering from "../../components/list-filtering/list-filtering";
import { useKeycloak } from "../../keycloak/useKeycloak";

const TicketsList = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<TicketParamList>>();
  const { token, realm } = useKeycloak();
  const [tickets, setTickets] = useState<TicketBrief[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [resetList, setResetList] = useState(false);
  const [maxId, setMaxId] = useState(0);

  useEffect(() => {
    setIsLoadingData(true);

    resetState();
    getTickets();

    setIsLoadingData(false);
  }, [page, selectedStatus]);

  const resetState = () => {
    if (resetList) {
      setTickets([]);
      setMaxId(0);
      setResetList(false);
    }
  }

  const getTickets = async () => {
    try {
      const filteringStatus = selectedStatus.length > 0 ? `status=${t(selectedStatus)}&` : "";
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.TICKETS_URL)}?${filteringStatus}fromId=${maxId}&count=${CONFIG.ITEMS_PER_PAGE}`;
      console.log("reqUrl", reqUrl);
      const response = await axios.get<TicketListPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        //TODO - pagination is broken because of this
        //setTickets([...tickets, ...(response.data.data.tickets ?? [])]);
        setTickets(response.data.data.tickets ?? []);
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
    setSelectedStatus(status);
    setResetList(true);
    setMaxId(0);
  };

  const onCancelFiltering = () => {
    setResetList(true);
    setSelectedStatus("");
    setMaxId(0);
  }

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
    <>
      {selectedStatus ? <ListFiltering tag={selectedStatus} onCancel={onCancelFiltering}/> : <></>}
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
    </>
  );
};

export default TicketsList;
