import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import NavigationAction from "components/NavigationAction";
import React from "react";
import { AppStackParamList } from "src/routing/route-screens";

import Container from "../../../src/components/Container";
import ArticlesList from "./articles-list";
import { articlesScreenStyles } from "./articles-screen-styles";

const ArticlesScreen = (): JSX.Element => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  return (<Container style={articlesScreenStyles.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title="Articles"/>
    <ArticlesList />
  </Container>);
}

export default ArticlesScreen;