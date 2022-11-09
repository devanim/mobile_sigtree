import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React from "react";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import AppBar from "../../components/appbar/appbar";
import { NavigationType } from "../../models/dashboard/navigation-enum";
import BottomNavigation from "../../components/bottom-navigation";
import { CapitalizeFirstLowercaseRest } from "../../utils/text";

import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import ArticleCard from "./article-card";

const ArticleScreen = (props: ArticleScreenProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const articleId = props.route.params.params.articleId;

  return (
    <Layout style={styles.container} level='1'>
      <AppBar title={CapitalizeFirstLowercaseRest(t("ARTICLE_TITLE"))} />
      <ArticleCard articleId={articleId} />
      <BottomNavigation type={NavigationType.ARTICLES}/>
    </Layout>
  );
}

type ArticleScreenProps = {
  route: any;
  navigation: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});
export default ArticleScreen;