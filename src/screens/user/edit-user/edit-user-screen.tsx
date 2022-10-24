import EditUserContainer from "./edit-user-container";
import { StyleSheet} from "react-native";
import React, { useContext } from "react";

import { TopNavigation, Layout } from "@ui-kitten/components";
import NavigationAction from "../../../components/navigation-action";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "src/routing/route-screens";
import LocalizationContext from "../../../localization/localization-context";

const EditUserScreen = (props: EditUserScreenProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const userProfile = props.route.params.params;

  return (
    <Layout style={styles.container} level='1'>
      <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title={t("USER_PROFILE_EDIT_TITLE").toUpperCase()} />
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