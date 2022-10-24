import { NavigationProp, useNavigation, } from "@react-navigation/native";
import { TopNavigation, Layout } from "@ui-kitten/components";
import React, { useContext } from "react";
import { StyleSheet} from "react-native";
import NavigationAction from "../../components/navigation-action";
import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import UserContainer from "./user-container";

const UserScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <Layout style={styles.container} level='1'>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title={t("USER_PROFILE_TITLE").toUpperCase()}/>
    <UserContainer/>
  </Layout>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: "10%",    
  }
});
export default UserScreen;