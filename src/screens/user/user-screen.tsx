import { Layout } from "@ui-kitten/components";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import AppBar from "../../components/appbar/appbar";
import LocalizationContext from "../../localization/localization-context";
import UserContainer from "./user-container";
import { CapitalizeFirstLowercaseRest } from "../../utils/text";

const UserScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);

  return (
    <Layout style={styles.container} level='1'>
      <AppBar title={CapitalizeFirstLowercaseRest(t("USER_PROFILE_TITLE"))} />
      <UserContainer />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default UserScreen;