import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import { StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper';
import { WebView } from "react-native-webview";

import Error, { ErrorProps } from "../../components/error";
import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import Article from "../../models/article/article";
import ArticlePayload from "../../models/article/article-payload";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";

const ArticleCard = (props: ArticleCardProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { token, realm } = useKeycloak();
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [article, setArticle] = useState<Article | undefined>(undefined);

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    try {
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.ARTICLE_URL)}/${props.articleId}`;
      const response = await axios.get<ArticlePayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        if (response.data.data.length > 0) {
          setArticle(response.data.data[0]);
        }
      } else {
        const friendlyMessage = t("FAILED_REQUEST");
        setError({
          friendlyMessage: friendlyMessage,
          errorMessage: response.data.error ?? "",
        });
      }
    } catch (error) {
      const friendlyMessage = t("FAILED_REQUEST");
      setError({
        friendlyMessage: friendlyMessage,
        errorMessage: JSON.stringify(error),
      });
    }
  };

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  if (!article) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ flex: 0.1 }}>{article?.title}</Text>
      <Image style={styles.image} source={{ uri: `${article?.image}` }} />
      <WebView style={styles.content} source={{ html: article ? article.content : t("NO_DATA_HTML") }} />
    </View>
  );
};

type ArticleCardProps = {
  articleId: number;
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    flexGrow: 1,
    flexDirection: "column",
    marginHorizontal: '5%'
  },
  image: {
    flex: 0.2,
    alignContent: "center",
    minHeight: 200,
    width: '100%',
    resizeMode: 'contain',
  },
  content: {
    minHeight: 300,
    minWidth: 400,
    flex: 0.3
  }
})

export default ArticleCard;