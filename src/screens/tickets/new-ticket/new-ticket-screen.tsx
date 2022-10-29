import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from 'react-native-paper';

import LocalizationContext from "../../../localization/localization-context";
import { AppStackParamList } from "../../../routing/route-screens";
import NewTicket from "./new-ticket";

const NewTicketScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);

  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <Layout style={styles.container} level='1'>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Content title={t("TICKETS_ADD_TICKET").toUpperCase()} />
        <Appbar.Action icon="window-close" onPress={goBack} />
      </Appbar.Header>
      <NewTicket />
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default NewTicketScreen;
