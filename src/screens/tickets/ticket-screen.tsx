import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Appbar } from 'react-native-paper';
import axios from "axios";

import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { EditUserPayload } from "../../models/user-profile/edit-user-payload";
import TicketCard from "./ticket-card";

const TicketScreen = (props: ArticleScreenProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { realm, logout, token } = useKeycloak();
  const { goBack, navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const [isLoading, setIsLoading] = useState(true);
  const ticketId = props.route.params.params.ticketId;
  const status = props.route.params.params.status;
  const role = props.route.params.params.roleId;

  useEffect(() => {
    setIsLoading(true);
    if (status === "TICKET_NEW" && role === 6) {
      updateTicketStatusToRead();
    }
    setIsLoading(false);
  }, []);

  const updateTicketStatusToRead = async () => {
    const vals = { idstatus: 1 }
    const reqUrl = `${SigtreeConfiguration.getUrl(realm, `${SCREEN_URL.TICKET_URL}/${ticketId}`)}`;

    try {
      const response = await axios.put<EditUserPayload>(reqUrl, vals, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  const onLogout = () => {
    logout();
    navigate("HomeScreen", { screen: "HomeScreen" });
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  return (
    <Layout style={styles.container} level='1'>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={t("TICKET_TITLE").toUpperCase()} />
        <Appbar.Action icon="logout" onPress={onLogout} />
      </Appbar.Header>
      <TicketCard ticketId={ticketId} />
    </Layout>
  );
}

type ArticleScreenProps = {
  route: any;
  navigation: any;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default TicketScreen;