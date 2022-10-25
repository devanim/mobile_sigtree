import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { TopNavigation, Layout } from "@ui-kitten/components";

import { NavigationProp, useNavigation } from "@react-navigation/native";

import { AppStackParamList } from "../../routing/route-screens";
import LocalizationContext from "../../localization/localization-context";
import NavigationAction from "../../components/navigation-action";
import ArticleContainer from "./article-container";

import { useKeycloak } from "../../keycloak/useKeycloak";

const ArticlesScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { logout } = useKeycloak();
  const { goBack, navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const onLogout = () => {
    logout();
    navigate("HomeScreen", { screen: "HomeScreen" });
  }

  return (
    <Layout style={styles.container} level='1'>
      <TopNavigation
        accessoryLeft={() => <NavigationAction onPress={goBack} />}
        accessoryRight={() => <NavigationAction onPress={onLogout} icon={"logout"} />}
        title={t("ARTICLES_TITLE").toUpperCase()}
      />
      <ArticleContainer />
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: "10%",
  }
});

export default ArticlesScreen;