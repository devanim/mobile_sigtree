import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import NavigationAction from "../../components/navigation-action";
import React from "react";
import { AppStackParamList } from "src/routing/route-screens";

import Container from "../../components/container";
import ArticleContainer from "./article-container";
import { articlesScreenStyles } from "./articles-screen-styles";

const ArticleScreen = (): JSX.Element => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (<Container style={articlesScreenStyles.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title="Article"/>
    <ArticleContainer />
  </Container>);
}

export default ArticleScreen;