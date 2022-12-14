import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { FAB } from 'react-native-paper';

import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import TicketsList from "./tickets-list";

const TicketContainer = (props: TicketContainerProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <>
      <TicketsList roleId={props.roleId} />
      {/* <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigate("NewTicketScreen", { screen: "NewTicketScreen" })}
        variant='primary'
        color='#fff'
      /> */}
    </>
  );
};

type TicketContainerProps = {
  roleId: number;
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: "10%",
    backgroundColor: '#383E42',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
  },
})
export default TicketContainer;