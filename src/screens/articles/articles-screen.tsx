import { Layout } from "@ui-kitten/components";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import AppBar from "../../components/appbar/appbar";
import LocalizationContext from "../../localization/localization-context";
import ArticleContainer from "./article-container";

const ArticlesScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);


  return (
    <Layout style={styles.container} level='1'>
      <AppBar title={t("ARTICLES_TITLE").toUpperCase()} />
      <ArticleContainer />
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ArticlesScreen;