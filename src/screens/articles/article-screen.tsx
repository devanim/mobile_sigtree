import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import NavigationAction from "../../components/navigation-action";
import React from "react";
import { AppStackParamList } from "../../routing/route-screens";

import Container from "../../components/container";
import { articlesScreenStyles } from "./articles-screen-styles";
import ArticleCard from "./article-card";

const ArticleScreen = (props: ArticleScreenProps): JSX.Element => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const articleId = props.route.params.params.articleId; 

  return (<Container style={articlesScreenStyles.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title="Article"/>
    <ArticleCard articleId={articleId}/>
  </Container>);
}

type ArticleScreenProps = {
  route: any;
  navigation: any;
}

export default ArticleScreen;