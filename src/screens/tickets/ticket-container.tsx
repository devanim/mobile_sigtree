import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from 'react-native-paper';
import { FAB } from 'react-native-paper';

import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import TicketsList from "./tickets-list";

const TicketContainer = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <>
      <TicketsList />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigate("NewTicketScreen", { screen: "NewTicketScreen" })}
        variant='primary'

      />
    </>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
    backgroundColor: '#bbb',
    borderWidth: 1,
    borderColor: '#ccc'

  },
})
export default TicketContainer;