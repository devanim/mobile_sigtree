
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import AppBar from "../../components/appbar/appbar";

import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import TicketNotes from "./ticket-notes";
import BottomNavigation from "../../components/bottom-navigation";
import { NavigationType } from "../../models/dashboard/navigation-enum";
import { CapitalizeFirstLowercaseRest } from "../../utils/text";

const TicketNotesScreen = (props: any): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { realm, logout, token } = useKeycloak();
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const ticketId = props.route.params.params.ticketId;
  const status = props.route.params.params.status;
  const role = props.route.params.params.roleId;

  const onLogout = () => {
    logout();
    navigate("HomeScreen", { screen: "HomeScreen" });
  }

  return (
    <Layout style={styles.container} level='1'>
      <AppBar title={CapitalizeFirstLowercaseRest(t("TICKET_TITLE"))} />
        <TicketNotes
          count={0}
          ticketId={ticketId}
          roleId={role}
        />
      <BottomNavigation type={NavigationType.TICKETS}/>
    </Layout>
  );
}

type NoteScreenProps = {
  route: any;
  navigation: any;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default TicketNotesScreen;
