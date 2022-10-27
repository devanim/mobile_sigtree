import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from 'react-native-paper';

import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import TicketCard from "./ticket-card";

const TicketScreen = (props: ArticleScreenProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { logout } = useKeycloak();
  const { goBack, navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const ticketId = props.route.params.params.ticketId;
  const onLogout = () => {
    logout();
    navigate("HomeScreen", { screen: "HomeScreen" });
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