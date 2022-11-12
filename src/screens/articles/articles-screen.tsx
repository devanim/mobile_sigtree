import { Layout } from "@ui-kitten/components";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import BottomNavigation from "../../components/bottom-navigation";

import AppBar from "../../components/appbar/appbar";
import LocalizationContext from "../../localization/localization-context";
import ArticleContainer from "./article-container";
import { NavigationType } from "../../models/dashboard/navigation-enum";
import { CapitalizeFirstLowercaseRest } from "../../utils/text";

const ArticlesScreen = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);


  return (
    <Layout style={styles.container} level='1'>
      <AppBar title={CapitalizeFirstLowercaseRest(t("ARTICLES_TITLE"))} noBack={true} />
      <ArticleContainer />
      <BottomNavigation type={NavigationType.ARTICLES}/>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ArticlesScreen;