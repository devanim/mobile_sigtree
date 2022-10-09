import { useContext } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";

import { AppStackParamList } from "../../routing/route-screens";
import LocalizationContext from "src/localization/localization-context";
import NavigationAction from "../../components/navigation-action";
import Container from "../../components/container";
import ArticleCard from "./article-card";

import { articlesScreenStyles } from "./articles-screen-styles";

const ArticleScreen = (props: ArticleScreenProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const articleId = props.route.params.params.articleId; 

  return (<Container style={articlesScreenStyles.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title={t("ARTICLES_TITLE")}/>
    <ArticleCard articleId={articleId}/>
  </Container>);
}

type ArticleScreenProps = {
  route: any;
  navigation: any;
}

export default ArticleScreen;