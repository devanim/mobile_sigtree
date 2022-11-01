import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import React from "react";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from 'react-native-paper';

import LocalizationContext from "../../localization/localization-context";
import { AppStackParamList } from "../../routing/route-screens";
import ArticleCard from "./article-card";

const ArticleScreen = (props: ArticleScreenProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const articleId = props.route.params.params.articleId;

  return (
    <Layout style={styles.container} level='1'>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title={t("ARTICLE_TITLE").toUpperCase()} />
        <Appbar.Action icon="window-close" onPress={goBack} />
      </Appbar.Header>
      <ArticleCard articleId={articleId} />
    </Layout>);
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