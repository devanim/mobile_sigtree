import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import axios from "axios";
import React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { StyleSheet } from "react-native";

import Error, { ErrorProps } from "../../components/error";
import ListFiltering from "../../components/list-filtering/list-filtering";
import Text from "../../components/text";
import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { CONFIG, SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { TicketBrief } from "../../models/ticket/ticket-brief";
import { TicketListPayload } from "../../models/ticket/ticket-list-payload";
import { TicketParamList } from "../../routing/route-screens";
import TicketBriefCard from "./ticket-brief-card";

const TicketsList = (props: TicketListProps): JSX.Element => {
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
  const onTicketSelected = (ticketId: number, status: string) => {
    navigate("TicketScreen", {
      screen: "TicketScreen",
      params: { ticketId: ticketId, roleId: props.roleId, status: status },
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
    <View style={styles.footer}>
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
    <Layout style={{ flex: 1 }} level='1'>
      {selectedStatus ? <ListFiltering tag={selectedStatus} onCancel={onCancelFiltering} /> : <></>}
      <FlatList
        data={tickets || []}
        renderItem={renderItem}
        keyExtractor={(i, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.container}
        onEndReachedThreshold={0.2}
        onEndReached={fetchNextPage}
        ListFooterComponent={renderFooter}
      />
    </Layout>
  );
};

type TicketListProps = {
  roleId: number;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    flex: 1
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  }
});
export default TicketsList;
