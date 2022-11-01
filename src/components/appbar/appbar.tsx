import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { StyleSheet } from "react-native";
import { Appbar } from 'react-native-paper';

import { useKeycloak } from "../../keycloak/useKeycloak";
import { AppStackParamList } from "../../routing/route-screens";

const AppBar = (props: AppBarProps): React.ReactElement => {
  const { logout } = useKeycloak();

  const { goBack, navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const onLogout = () => {
    logout();
    navigate("HomeScreen", { screen: "HomeScreen" });
  }

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={goBack} />
      <Appbar.Content title={props.title} />
      <Appbar.Action icon="logout" onPress={onLogout} />
    </Appbar.Header>
  );
}

type AppBarProps = {
  title: string;
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default AppBar;