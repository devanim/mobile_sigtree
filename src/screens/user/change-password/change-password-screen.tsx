import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components/ui";
import React from "react";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import AppBar from "../../../components/appbar/appbar";
import { NavigationType } from "../../../models/dashboard/navigation-enum";
import BottomNavigation from "../../../components/bottom-navigation";

import LocalizationContext from "../../../localization/localization-context";
import { AppStackParamList } from "../../../routing/route-screens";
import UserScreenContainer from "./change-password-container";
import { CapitalizeFirstLowercaseRest } from "../../../utils/text";

const ChangePasswordScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);

  return (
    <Layout style={styles.container} level='1'>
      <AppBar title={CapitalizeFirstLowercaseRest(t("USER_PROFILE_CHANGE_PASSWORD"))} />
      <UserScreenContainer />
      <BottomNavigation type={NavigationType.USER}/>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});
export default ChangePasswordScreen;
