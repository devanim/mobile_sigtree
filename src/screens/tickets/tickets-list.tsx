import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import axios from "axios";
import React from "react";
import { useCallback, useContext, useState } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator } from "react-native-paper"; 
import { StyleSheet } from "react-native";

import Error, { ErrorProps } from "../../components/error";
import ListFilteringChip from "../../components/list-filtering/list-filtering-chip";
import Text from "../../components/text";
import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { CONFIG, SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { TicketBrief } from "../../models/ticket/ticket-brief";
import { TicketListPayload } from "../../models/ticket/ticket-list-payload";
import { TicketParamList } from "../../routing/route-screens";
import TicketBriefCard from "./ticket-brief-card";
import { FilterElement } from "../../models/ticket/filter-element";
import { FilteringOptions } from "../../models/ticket/filtering-options-enum";

const TicketsList = (props: TicketListProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<TicketParamList>>();
  const { token, realm } = useKeycloak();
  const [tickets, setTickets] = useState<TicketBrief[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTenant, setSelectedTenant] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<FilterElement[]>([]);
  const [maxId, setMaxId] = useState(0);

  useFocusEffect(useCallback(() => {
    resetState();
    getTickets();
    console.log("called this method");
  }, [selectedStatus, selectedBuilding, selectedProject, selectedTenant]));

  const resetState = () => {
    setIsLoadingData(true);
    setTickets([]);
    setMaxId(0);
    setHasNextPage(true);
  }

  const getTickets = async () => {
    if (!hasNextPage) return
    try {
      const filteringStatus = selectedStatus.length > 0 ? `status=${t(selectedStatus)}&` : "";
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.TICKETS_URL)}?${filteringStatus}fromId=${maxId}&count=${CONFIG.ITEMS_PER_PAGE}`;
      const response = await axios.get<TicketListPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        setTickets(tickets => [...tickets, ...(response.data.data.tickets ?? [])]);
        setMaxId(Math.max(...(response.data.data.tickets ?? []).map((ticket) => ticket.row_num)));
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
    } finally {
      setIsLoadingData(false);
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
    resetState()
  };

  const onSelectedBuilding = (building: string) => {
    setSelectedBuilding(building);
    resetState();
  }

  const onSelectedProject = (project: string) => {
    setSelectedProject(project);
    resetState();
  }

  const onSelectedTenant = (tenant: string) => {
    setSelectedTenant(tenant);
    resetState();
  }

  const onCancelFiltering = () => {
    setSelectedStatus("");
    resetState()
  }

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
        onSelectedBuilding={onSelectedBuilding}
        onSelectedProject={onSelectedProject}
        onSelectedTenant={onSelectedTenant}
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

  if (isLoadingData) {
    return <ActivityIndicator />
  }

  if (!tickets || tickets.length == 0) {
    return  (
      <Layout style={{  flex: 1 }} level='1'>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, textAlign: 'center', paddingTop: 25 }} category='body' >{t("NO_DATA")}</Text>
        </View>
      </Layout>
    )

  }



  return (
    <Layout style={{ flex: 1 }} level='1'>
        <FlatList
          data={tickets || []}
          renderItem={renderItem}
          keyExtractor={(i, index) => index.toString()}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
          scrollEnabled={true}
          contentContainerStyle={styles.container}
          onEndReachedThreshold={1}
          onEndReached={getTickets}
          ListHeaderComponent={selectedStatus ? <ListFilteringChip tag={selectedStatus} onCancel={onCancelFiltering} filteringType={FilteringOptions.STATUS}/> : <></>}
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
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  }
});
export default TicketsList;
