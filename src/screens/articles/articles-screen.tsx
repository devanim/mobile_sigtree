import React, { useContext } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";

import { AppStackParamList } from "../../routing/route-screens";
import LocalizationContext from "../../localization/localization-context";
import NavigationAction from "../../components/navigation-action";
import Container from "../../components/container";
import ArticleContainer from "./article-container";

import { articlesScreenStyles } from "./articles-screen-styles";
import { useKeycloak } from "../../keycloak/useKeycloak";

const ArticlesScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { logout } = useKeycloak();
  const { goBack, navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const onLogout = () => {
    logout();
    navigate("HomeScreen", { screen: "HomeScreen" });
  }

  return (<Container style={articlesScreenStyles.container}>
    <TopNavigation 
      title={t("ARTICLES_TITLE")}
      accessoryLeft={() => <NavigationAction onPress={goBack} />} 
      accessoryRight={() => <NavigationAction onPress={onLogout} icon={"flag"}/>}
    />
    <ArticleContainer />
  </Container>);
}

export default ArticlesScreen;