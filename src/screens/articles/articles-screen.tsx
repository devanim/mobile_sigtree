import React, { useContext } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";

import { AppStackParamList } from "../../routing/route-screens";
import LocalizationContext from "../../localization/localization-context";
import NavigationAction from "../../components/navigation-action";
import Container from "../../components/container";
import ArticleContainer from "./article-container";

import { articlesScreenStyles } from "./articles-screen-styles";

const ArticlesScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (<Container style={articlesScreenStyles.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title={t("ARTICLES_TITLE")}/>
    <ArticleContainer />
  </Container>);
}

export default ArticlesScreen;