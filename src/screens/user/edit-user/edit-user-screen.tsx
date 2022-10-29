import EditUserContainer from "./edit-user-container";
import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Appbar } from 'react-native-paper';

import { Layout } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "src/routing/route-screens";
import LocalizationContext from "../../../localization/localization-context";

const EditUserScreen = (props: EditUserScreenProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const userProfile = props.route.params.params;

  return (
    <Layout style={styles.container} level='1'>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Content title={t("TICKETS_ADD_TICKET").toUpperCase()} />
        <Appbar.Action icon="window-close" onPress={goBack} />
      </Appbar.Header>
      <EditUserContainer userProfile={userProfile} />
    </Layout>
  );
}

type EditUserScreenProps = {
  route: any;
  navigation: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: "10%",
  }
});
export default EditUserScreen;