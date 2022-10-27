import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from 'react-native-paper';

import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import UserContainer from "./user-container";

const UserScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { logout } = useKeycloak();
  const { goBack, navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const onLogout = () => {
    logout();
    navigate("HomeScreen", { screen: "HomeScreen" });
  }
  return (
    <Layout style={styles.container} level='1'>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={t("USER_PROFILE_TITLE").toUpperCase()} />
        <Appbar.Action icon="logout" onPress={onLogout} />
      </Appbar.Header>
      <UserContainer />
    </Layout>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default UserScreen;