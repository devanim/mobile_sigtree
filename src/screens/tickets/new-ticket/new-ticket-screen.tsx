import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { Appbar } from 'react-native-paper';
import { NavigationType } from "../../../models/dashboard/navigation-enum";
import BottomNavigation from "../../../components/bottom-navigation";

import LocalizationContext from "../../../localization/localization-context";
import { AppStackParamList } from "../../../routing/route-screens";
import { CapitalizeFirstLowercaseRest } from "../../../utils/text";
import NewTicket from "./new-ticket";
import AppBar from "../../../components/appbar/appbar";

const NewTicketScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);

  return (
    <Layout style={styles.container} level='1'>
      <AppBar title={CapitalizeFirstLowercaseRest(t("TICKETS_ADD_TICKET"))} />
      <NewTicket />
      <BottomNavigation type={NavigationType.ADD_TICKET}/>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default NewTicketScreen;
